// supabase/functions/send-whatsapp/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const META_ACCESS_TOKEN = Deno.env.get("META_ACCESS_TOKEN")
const META_PHONE_NUMBER_ID = Deno.env.get("META_PHONE_NUMBER_ID")

serve(async (req) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const payload = await req.json()
    console.log("Received webhook payload:", JSON.stringify(payload))

    // Webhooks send payload wrapped inside database event details:
    // payload.record represents the newly inserted order row
    const order = payload.record

    if (!order) {
      return new Response(JSON.stringify({ error: "No order record found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { id: orderId, address, amount_paise } = order
    const name = address?.name || "Customer"
    let rawPhone = address?.phone || ""
    const amountRupees = `₹${(amount_paise / 100).toFixed(2)}`

    // Clean phone number: WhatsApp API needs the format: CountryCode + Number (no spaces, dashes, or + symbol)
    // E.g., +91 98765 43210 -> 919876543210
    let cleanPhone = rawPhone.replace(/\D/g, "")
    
    // Add default country code if missing (assumes India +91 if length is 10 digits)
    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone
    }

    if (!cleanPhone) {
      return new Response(JSON.stringify({ error: "Missing recipient phone number" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Call Meta WhatsApp Cloud API
    const metaUrl = `https://graph.facebook.com/v17.0/${META_PHONE_NUMBER_ID}/messages`
    
    const response = await fetch(metaUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "template",
        template: {
          name: "order_confirmation",
          language: {
            code: "en_US"
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: name }, // {{1}} - Name
                { type: "text", text: orderId.substring(0, 8).toUpperCase() }, // {{2}} - Short Order ID
                { type: "text", text: amountRupees } // {{3}} - Amount
              ]
            }
          ]
        }
      })
    })

    const responseData = await response.json()
    console.log("Meta API Response:", JSON.stringify(responseData))

    if (!response.ok) {
      throw new Error(`Meta API error: ${responseData.error?.message || "Unknown error"}`)
    }

    return new Response(JSON.stringify({ success: true, messageId: responseData.messages?.[0]?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

  } catch (error) {
    console.error("Function error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
