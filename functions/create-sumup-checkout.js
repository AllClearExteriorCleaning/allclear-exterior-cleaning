export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const token = env.SUMUP_ACCESS_TOKEN;
        const merchantCode = env.SUMUP_MERCHANT_CODE;

        const body = await request.json();
        
        // Use the value as-is (e.g., 10.50), NOT multiplied by 100
        const amount = parseFloat(body.amount);

        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount, 
                currency: 'GBP',
                checkout_reference: 'ORD-' + Date.now().toString(),
                merchant_code: merchantCode,
                description: 'Exterior Cleaning Service'
            })
        });

        const data = await response.json();

        // If the request fails, return the full data object so we can see the exact cause
        if (!response.ok) {
            return new Response(JSON.stringify({ 
                error: "SumUp API Validation Failure", 
                status: response.status,
                apiResponse: data 
            }), { status: response.status, headers: { 'Content-Type': 'application/json' } });
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
