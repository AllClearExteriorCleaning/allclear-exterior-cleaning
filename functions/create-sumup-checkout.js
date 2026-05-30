export async function onRequestPost(context) {
    try {
        const input = await context.request.json();
        const sumupApiKey = context.env.SUMUP_API_KEY; 
        const merchantCode = context.env.SUMUP_MERCHANT_CODE;

        if (!sumupApiKey || !merchantCode) {
            return new Response(JSON.stringify({ error: "Cloudflare ERROR: Missing API Key or Merchant Code in Environment Variables" }), { status: 500 });
        }

        const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sumupApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                checkout_reference: `clean-${Date.now()}`,
                amount: parseFloat(input.amount),
                currency: "GBP",
                merchant_code: merchantCode,
                description: input.description || "Exterior Cleaning Services"
            })
        });

        const data = await sumupResponse.json();

        if (!sumupResponse.ok) {
            return new Response(JSON.stringify({ error: "SUMUP API REJECTED: " + JSON.stringify(data) }), { status: 400 });
        }

        return new Response(JSON.stringify({ checkout_id: data.id }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "SERVER EXCEPTION: " + error.message }), { status: 500 });
    }
}
