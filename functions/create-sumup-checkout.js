expor async function onRequestPost(context) {
    try {
        const { request } = context;
        // Access your stored secret directly from the context environment
        const token = context.env.SUMUP_ACCESS_TOKEN;
        
        const body = await request.json();

        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                // Use the variable holding your secret
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: body.amount,
                currency: 'GBP',
                checkout_reference: 'Order-' + Date.now(),
                pay_to_email: 'info@allclearexteriorcleaning.co.uk'
            })
        });

        const data = await response.json();

        // Check if SumUp returned an error (even if the fetch call succeeded)
        if (!response.ok) {
            return new Response(JSON.stringify(data), { 
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
