export async function onRequestPost(context) {
    try {
        const input = await context.request.json();
        const sumupApiKey = context.env.SUMUP_API_KEY; 
        const merchantCode = context.env.SUMUP_MERCHANT_CODE;

        // DEBUG: Check if keys are present (Remove this after testing)
        if (!sumupApiKey || !merchantCode) {
            return new Response(JSON.stringify({ error: "Missing API Key or Merchant Code in Cloudflare" }), { status: 500 });
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
            // This now returns the ACTUAL error from SumUp to your screen
            return new Response(JSON.stringify({ error: "SumUp Rejected: " + JSON.stringify(data) }), { status: 400 });
        }

        return new Response(JSON.stringify({ checkout_id: data.id }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "System error: " + error.message }), { status: 500 });
    }
}
