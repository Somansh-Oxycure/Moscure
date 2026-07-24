// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "Moscure Orders <orders@moscure.com>"

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const payload = await req.json()
    console.log("Received webhook payload:", JSON.stringify(payload))

    const eventType = payload.type || "INSERT"
    const order = payload.record
    const oldOrder = payload.old_record

    if (!order) {
      return new Response(JSON.stringify({ error: "No order record found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // On UPDATE events, verify if status actually changed
    if (eventType === "UPDATE") {
      if (oldOrder && oldOrder.status === order.status) {
        console.log(`[Status Unchanged] Status is still '${order.status}'. Skipping email.`)
        return new Response(JSON.stringify({ message: "Status unchanged. No email sent." }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }
    }

    const { id: orderId, address, items, amount_paise, status, vendor_order_id, estimated_delivery } = order
    const customerEmail = address?.email
    const customerName = address?.name || "Customer"
    const totalAmount = (amount_paise / 100).toFixed(2)

    if (!customerEmail) {
      return new Response(JSON.stringify({ error: "Customer email is missing in the order address" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Build status-specific subjects & titles
    let emailSubject = `Order Update: #${orderId.substring(0, 8).toUpperCase()}`
    let headerTitle = "Order Update"
    let statusBannerText = status ? status.toUpperCase() : "CONFIRMED"
    let statusMessage = "Here is the latest status update for your order."

    switch (status) {
      case "pending":
      case "confirmed":
        emailSubject = `Order Confirmed: #${orderId.substring(0, 8).toUpperCase()}`
        headerTitle = "Order Confirmation"
        statusBannerText = "PAID & CONFIRMED"
        statusMessage = "We have received your payment and are getting your package ready."
        break
      case "packed":
        emailSubject = `Order Packed: #${orderId.substring(0, 8).toUpperCase()}`
        headerTitle = "Your Order is Packed!"
        statusBannerText = "PACKED & READY"
        statusMessage = "Great news! Your Moscure order has been packed and prepared for shipment."
        break
      case "dispatched":
        emailSubject = `Order Dispatched: #${orderId.substring(0, 8).toUpperCase()} — On Its Way!`
        headerTitle = "Your Order is on the way!"
        statusBannerText = "OUT FOR DELIVERY"
        statusMessage = "Exciting news! Your package has been handed over to our courier partner and is on its way to you."
        break
      case "delivered":
        emailSubject = `Order Delivered: #${orderId.substring(0, 8).toUpperCase()}`
        headerTitle = "Order Delivered!"
        statusBannerText = "DELIVERED"
        statusMessage = "Your Moscure package has been successfully delivered. We hope you enjoy your product!"
        break
    }

    // Build the order items HTML list
    let itemsHtml = ""
    if (Array.isArray(items)) {
      items.forEach((item: any) => {
        itemsHtml += `
          <tr>
            <td style="padding: 12px 0; color: #ffffff; border-bottom: 1px solid #2d2d2d;">
              <span style="font-weight: 600;">${item.name}</span> <span style="color: #888888; font-size: 13px;">x${item.qty}</span>
            </td>
            <td style="padding: 12px 0; text-align: right; color: #ffffff; border-bottom: 1px solid #2d2d2d; font-weight: 600;">
              ₹${(item.price * item.qty).toFixed(2)}
            </td>
          </tr>
        `
      })
    }

    // Format estimated delivery date if available
    const deliveryNote = estimated_delivery
      ? `<p style="margin: 10px 0 0 0; color: #00F5D4; font-size: 14px; font-weight: 600;">Estimated Delivery: ${estimated_delivery}</p>`
      : ""

    const trackingNote = vendor_order_id
      ? `<p style="margin: 5px 0 0 0; color: #a1a1aa; font-size: 13px; font-family: monospace;">Tracking Ref: ${vendor_order_id}</p>`
      : ""

    // Responsive HTML template matching Moscure's dark aesthetic
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${headerTitle} — Moscure</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0b0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4e4e7;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #12121a; border-radius: 16px; border: 1px solid #22222e; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; color: #00F5D4; text-transform: uppercase;">
                MOSCURE
              </h1>
              <p style="margin: 8px 0 0 0; color: #a1a1aa; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                ${headerTitle}
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 20px 40px 10px 40px;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff;">
                Hello, ${customerName}!
              </h2>
              <p style="margin: 10px 0 20px 0; color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                ${statusMessage}
              </p>
            </td>
          </tr>

          <!-- Order details / summary -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #181824; border-radius: 12px; padding: 20px;">
                <tr>
                  <td style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">
                    Order Number
                  </td>
                  <td style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; padding-bottom: 4px;">
                    Status
                  </td>
                </tr>
                <tr>
                  <td style="color: #ffffff; font-weight: bold; font-size: 15px; font-family: monospace;">
                    #${orderId.substring(0, 8).toUpperCase()}
                  </td>
                  <td style="color: #00F5D4; font-weight: bold; font-size: 14px; text-align: right; text-transform: uppercase;">
                    ${statusBannerText}
                  </td>
                </tr>
                ${(deliveryNote || trackingNote) ? `
                  <tr>
                    <td colspan="2" style="border-top: 1px solid #2d2d2d; margin-top: 10px; padding-top: 10px;">
                      ${deliveryNote}
                      ${trackingNote}
                    </td>
                  </tr>
                ` : ""}
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 10px 40px 20px 40px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr>
                    <th align="left" style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 8px; border-bottom: 1px solid #2d2d2d;">Item</th>
                    <th align="right" style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 8px; border-bottom: 1px solid #2d2d2d;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr>
                    <td style="padding: 20px 0 10px 0; color: #ffffff; font-size: 16px; font-weight: bold;">
                      Grand Total
                    </td>
                    <td style="padding: 20px 0 10px 0; text-align: right; color: #00F5D4; font-size: 20px; font-weight: 800;">
                      ₹${totalAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Shipping Details -->
          <tr>
            <td style="padding: 20px 40px 40px 40px;">
              <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
                Shipping Address
              </h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #a1a1aa;">
                <strong>${address.name}</strong><br>
                ${address.line1}${address.line2 ? `, ${address.line2}` : ""}<br>
                ${address.city}, ${address.state} - ${address.pincode}<br>
                Phone: ${address.phone}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #0e0e14; text-align: center; border-top: 1px solid #22222e;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Moscure. All rights reserved.
              </p>
              <p style="margin: 6px 0 0 0; color: #666666; font-size: 12px;">
                For any questions or support, reply directly to this email or reach us at <a href="mailto:support@moscure.com" style="color: #00F5D4; text-decoration: none;">support@moscure.com</a>.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Call Resend REST API
    const resendUrl = "https://api.resend.com/emails"
    const response = await fetch(resendUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [customerEmail],
        subject: emailSubject,
        html: htmlContent,
      }),
    })

    const responseData = await response.json()
    console.log("Resend API Response:", JSON.stringify(responseData))

    if (!response.ok) {
      throw new Error(`Resend API error: ${responseData.message || "Unknown error"}`)
    }

    return new Response(JSON.stringify({ success: true, id: responseData.id }), {
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
