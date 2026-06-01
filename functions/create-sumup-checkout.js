export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        const token = env.SUMUP_ACCESS_TOKEN;
        if (!token) {
            return new Response(JSON.stringify({ error: "SUMUP_ACCESS_TOKEN missing." }), { status: 500 });
        }

        const contentType = request.headers.get("content-type") || "";
        let amount = 0;

        if (contentType.includes("application/json")) {
            const body = await request.json();
            amount = body.amount;
        } else {
            const formData = await request.formData();
            amount = formData.get("amount");
        }

        const cleanAmount = parseFloat(amount);
        if (isNaN(cleanAmount) || cleanAmount <= 0) {
            return new Response(JSON.stringify({ error: `Invalid amount: ${amount}` }), { status: 400 });
        }

        const amountInPence = Math.round(cleanAmount * 100);

        const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amountInPence, 
                currency: 'GBP',
                checkout_reference: 'ORDER-' + Date.now().toString(),
                merchant_code: env.SUMUP_MERCHANT_CODE,
                description: 'Exterior Cleaning Service'
            })
        });

        const data = await response.json();

        // 5. MODIFIED: Return the specific error from SumUp if it fails
        if (!response.ok) {
            return new Response(JSON.stringify({ 
                error: "SumUp Rejected Request", 
                details: data 
            }), { 
                status: response.status,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
        }

        return new Response(JSON.stringify(data), {
            status: response.status,
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
