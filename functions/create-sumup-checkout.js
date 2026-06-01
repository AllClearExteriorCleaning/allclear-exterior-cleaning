export async function onRequestPost(context) {
    const { request, env } = context;
    const token = env.SUMUP_ACCESS_TOKEN;
    const merchantCode = env.SUMUP_MERCHANT_CODE;

    try {
        const body = await request.json();
        
        const payload = {
            amount: parseFloat(body.amount),
            currency: 'GBP',
            checkout_reference: 'ORD-' + Date.now().toString(),
            merchant_code: merchantCode,
            description: 'Exterior Cleaning Service'
        };

        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Get the raw text response first to ensure we don't miss anything
        const rawResponse = await response.text();
        
        return new Response(JSON.stringify({
            status: response.status,
            raw: rawResponse,
            sent_payload: payload // This will help us verify exactly what we sent
        }), { 
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: "Catch Block Error", details: err.message }), { status: 500 });
    }
}
