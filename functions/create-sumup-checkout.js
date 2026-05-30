export async function onRequestPost(context) {
    try {
        const input = await context.request.json();
        const apiKey = context.env.SUMUP_API_KEY;
        const merchant = context.env.SUMUP_MERCHANT_CODE;

        if (!apiKey || !merchant) {
            return new Response("Error: API Keys not set in Cloudflare Settings", { status: 500 });
        }

        const response = await fetch("https://api.sumup.com/v0.1/checkouts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                checkout_reference: `clean-${Date.now()}`,
                amount: Math.round(parseFloat(input.amount) * 100),
                currency: "GBP",
                merchant_code: merchant,
                description: input.description || "Cleaning Service"
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response("SumUp Error: " + JSON.stringify(data), { status: 400 });
        }

        return new Response(JSON.stringify({ checkout_id: data.id }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response("System Error: " + e.message, { status: 500 });
    }
}
