export async function onRequestPost(context) {
    const { request, env } = context;
    const token = env.SUMUP_ACCESS_TOKEN;
    const merchantCode = env.SUMUP_MERCHANT_CODE;

    try {
        const body = await request.json();
        
        // We will try an even simpler reference format
        const cleanRef = "ORD" + Date.now().toString().slice(-8);

        const payload = {
            amount: parseFloat(body.amount),
            currency: 'GBP',
            checkout_reference: cleanRef,
            merchant_code: merchantCode
        };

        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const raw = await response.text();
        
        return new Response(JSON.stringify({
            status: response.status,
            raw: raw,
            sent_payload: payload
        }), { 
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: "Catch", details: err.message }), { status: 500 });
    }
}
