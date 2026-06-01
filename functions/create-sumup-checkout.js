export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        const token = env.SUMUP_ACCESS_TOKEN;
        const merchantCode = env.SUMUP_MERCHANT_CODE;

        const body = await request.json();
        const amountInPence = Math.round(parseFloat(body.amount) * 100);

        // We are using v1.0, which is the current stable API version
        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Merchant-Id': merchantCode // Some accounts require this header instead of body field
            },
            body: JSON.stringify({
                amount: amountInPence,
                currency: 'GBP',
                checkout_reference: 'ORD-' + Date.now().toString(),
                description: 'Exterior Cleaning Service'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ 
                error: "SumUp API Rejected Request", 
                status: response.status,
                details: data 
            }), { status: response.status });
        }

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}
