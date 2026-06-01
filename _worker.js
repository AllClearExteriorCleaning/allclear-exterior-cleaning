export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/create-sumup-checkout') {
      try {
        const token = env.SUMUP_ACCESS_TOKEN;
        const merchantCode = env.SUMUP_MERCHANT_CODE;

        if (!token || !merchantCode) {
          return new Response(JSON.stringify({ error: "Missing SumUp secrets in Cloudflare." }), { status: 500 });
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

        // Request checkout session from SumUp v0.1 API
        const response = await fetch('https://api.sumup.com/v0.1/checkouts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: cleanAmount,
            currency: 'GBP',
            checkout_reference: 'Order-' + Date.now(),
            merchant_code: merchantCode,
            description: 'Initial Clean / One-off Service Payment'
          })
        });

        const data = await response.json();

        // Pass exact errors back to the screen if SumUp still rejects it
        if (!response.ok) {
           return new Response(JSON.stringify({ error: data.message || data.error_code || "Payment rejected by SumUp" }), { 
             status: 400,
             headers: { 
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*'
             }
           });
        }

        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
