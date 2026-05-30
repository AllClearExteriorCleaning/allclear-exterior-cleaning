export async function onRequestPost(context) {
    try {
        const input = await context.request.json();
        const sumupApiKey = context.env.SUMUP_API_KEY; 
        const merchantCode = context.env.SUMUP_MERCHANT_CODE;

        // Check if variables exist
        if (!sumupApiKey || !merchantCode) {
            return new Response(JSON.stringify({ error: "Missing Keys: Check Cloudflare Pages Settings" }), { status: 500 });
        }

        // Prepare the request
        // Note: SumUp often requires amount in pence (multiply by 100)
        const amountInPence = Math.round(parseFloat(input.amount) * 100);

        const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sumupApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                checkout_reference: `clean-${Date.now()}`,
                amount: amountInPence,
                currency: "GBP",
                merchant_code: merchantCode,
                description: input.description || "Exterior Cleaning Services"
            })
        });

        const data = await sumupResponse.json();

        if (!sumupResponse.ok) {
            // This returns the exact error from SumUp to your screen
            return new Response(JSON.stringify({ error: "SumUp Rejected: " + JSON.stringify(data) }), { status: 400 });
        }

        return new Response(JSON.stringify({ checkout_id: data.id }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Code Error: " + error.message }), { status: 500 });
    }
}
