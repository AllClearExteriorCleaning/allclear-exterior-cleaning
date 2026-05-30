export async function onRequestPost(context) {
    // This securely grabs the data sent from your frontend form
    const input = await context.request.json();
    
    // Your secure SumUp API Key stored in Cloudflare
    const sumupApiKey = context.env.SUMUP_API_KEY; 
    const merchantCode = context.env.SUMUP_MERCHANT_CODE;

    try {
        // Ask SumUp to create a checkout session
        const sumupResponse = await fetch("https://api.sumup.com/v0.1/checkouts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sumupApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                checkout_reference: `clean-${Date.now()}`, // Generates a unique ID
                amount: input.amount,
                currency: "GBP",
                merchant_code: merchantCode,
                description: input.description || "Exterior Cleaning Services"
            })
        });

        const data = await sumupResponse.json();

        if (!sumupResponse.ok) {
            return new Response(JSON.stringify({ error: data }), { status: 400 });
        }

        // Send the secure checkout_id back to your website
        return new Response(JSON.stringify({ checkout_id: data.id }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
