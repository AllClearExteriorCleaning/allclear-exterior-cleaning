export async function onRequestPost(context) {
    try {
        const { request } = context;
        const bod = await request.json();

        // 1. Process your SumUp API call here
        // (Ensure you have your API key/headers set up inside this function)
        
        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sup_sk_qZorUbMrpcuYKZ1enrr4bIs0Jl8Q49viv',
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

        // 2. Return the result back to your form
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
