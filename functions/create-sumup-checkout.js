export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // 1. Verify the secret token exists
        const token = env.SUMUP_ACCESS_TOKEN;
        if (!token) {
            return new Response(JSON.stringify({ error: "SUMUP_ACCESS_TOKEN is missing in Cloudflare settings." }), { status: 500 });
        }

        // 2. Flexible parsing to handle JSON, FormData, or URL-encoded data from mobile
        const contentType = request.headers.get("content-type") || "";
        let amount = 0;

        if (contentType.includes("application/json")) {
            const body = await request.json();
            amount = body.amount;
        } else {
            const formData = await request.formData();
            amount = formData.get("amount");
        }

        // 3. Clean and validate the amount (ensure it's a valid number for SumUp)
        const cleanAmount = parseFloat(amount);
        if (isNaN(cleanAmount) || cleanAmount <= 0) {
            return new Response(JSON.stringify({ error: `Invalid amount received: ${amount}` }), { status: 400 });
        }

        // 4. Send the request to SumUp
        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: cleanAmount,
                currency: 'GBP',
                checkout_reference: 'Order-' + Date.now(),
                pay_to_email: 'info@allclearexteriorcleaning.co.uk'
            })
        });

        const data = await response.json();

        // 5. Return the exact response back to the website
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Prevents mobile CORS blocking
            }
        });

    } catch (err) {
        // Catch any unexpected edge-case crashes
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Handle preflight requests safely (common on mobile browsers)
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}
