<?php
// contact.php
// Minimal, secure endpoint to accept contact form JSON and upsert contacts in HubSpot.

// Load environment variables from .env file if present
function loadEnv($dir) {
    $paths = [
        $dir . '/.env',
        dirname($dir) . '/.env'
    ];
    foreach ($paths as $path) {
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) {
                    continue;
                }
                if (strpos($line, '=') !== false) {
                    list($name, $value) = explode('=', $line, 2);
                    $name = trim($name);
                    $value = trim($value);
                    // Strip quotes if present
                    if (preg_match('/^([\'"])(.*)\1$/', $value, $matches)) {
                        $value = $matches[2];
                    }
                    putenv(sprintf('%s=%s', $name, $value));
                    $_ENV[$name] = $value;
                    $_SERVER[$name] = $value;
                }
            }
            break;
        }
    }
}
loadEnv(__DIR__);

$HUBSPOT_TOKEN = getenv('HUBSPOT_API_KEY');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Require JSON
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Expected application/json']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Basic validation
$errors = [];
if (empty($data['name']) || trim($data['name']) === '')
    $errors[] = 'name';
if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL))
    $errors[] = 'email';
if (empty($data['subject']))
    $errors[] = 'subject';
if (empty($data['message']) || strlen(trim($data['message'])) < 10)
    $errors[] = 'message';
if (!empty($errors)) {
    http_response_code(422);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Validation failed', 'fields' => $errors]);
    exit;
}

// Prepare HubSpot contact properties
$nameParts = preg_split('/\s+/', trim($data['name']), 2);
$firstname = $nameParts[0] ?? '';
$lastname = $nameParts[1] ?? '';
$properties = [
    'email' => $data['email'],
    'firstname' => $firstname,
    'lastname' => $lastname,
    'phone' => $data['phone'] ?? '',
    'city' => $data['city'] ?? '',
    // Use the built-in 'description' property to store subject + message.
    'description' => "Subject: " . ($data['subject'] ?? '') . "\n\n" . ($data['message'] ?? ''),
];

// Shared cURL headers
$headers = [
    "Authorization: Bearer {$HUBSPOT_TOKEN}",
    'Content-Type: application/json',
    'Accept: application/json',
];

// 1) Search for existing contact by email
$searchUrl = 'https://api.hubapi.com/crm/v3/objects/contacts/search';
$searchBody = json_encode([
    'filterGroups' => [['filters' => [['propertyName' => 'email', 'operator' => 'EQ', 'value' => $data['email']]]]],
    'properties' => ['email'],
    'limit' => 1,
]);

$ch = curl_init($searchUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $searchBody);
$searchResp = curl_exec($ch);
$searchCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
header('Content-Type: application/json');
echo json_encode([
    "search_status" => $searchCode,
    "search_response" => json_decode($searchResp, true)
]);
exit;
if ($searchResp === false) {
    curl_close($ch);
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Internal server error']);
    exit;
}
$searchData = json_decode($searchResp, true);
curl_close($ch);

// 2) Update existing contact if found
if ($searchCode >= 200 && $searchCode < 300 && !empty($searchData['results'])) {
    $contactId = $searchData['results'][0]['id'];
    $updateUrl = "https://api.hubapi.com/crm/v3/objects/contacts/{$contactId}";
    $updateBody = json_encode(['properties' => $properties]);

    $ch2 = curl_init($updateUrl);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch2, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch2, CURLOPT_POSTFIELDS, $updateBody);
    $updateResp = curl_exec($ch2);
    $updateCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
    curl_close($ch2);

    if ($updateResp === false || $updateCode >= 400) {

        http_response_code(502);

        echo json_encode([
            "error" => "Failed to update contact",
            "hubspot_status" => $updateCode,
            "hubspot_response" => json_decode($updateResp, true),
            "curl_error" => curl_error($ch2)
        ]);

        exit;

    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'action' => 'updated', 'id' => $contactId]);
    exit;
}

// 3) Create a new contact
$createUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
$createBody = json_encode(['properties' => $properties]);

$ch3 = curl_init($createUrl);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch3, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch3, CURLOPT_POST, true);
curl_setopt($ch3, CURLOPT_POSTFIELDS, $createBody);
$createResp = curl_exec($ch3);
$createCode = curl_getinfo($ch3, CURLINFO_HTTP_CODE);
curl_close($ch3);

if ($createResp === false || $createCode >= 400) {
    http_response_code(502);

    echo json_encode([
        "error" => "Failed to create contact",
        "hubspot_status" => $createCode,
        "hubspot_response" => json_decode($createResp, true),
        "curl_error" => curl_error($ch3)
    ]);

    exit;
}

$createData = json_decode($createResp, true);
$id = $createData['id'] ?? null;
http_response_code(201);
header('Content-Type: application/json');
echo json_encode(['success' => true, 'action' => 'created', 'id' => $id]);
exit;

?>