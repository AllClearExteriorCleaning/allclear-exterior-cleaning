export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Intercept the payment request
    if (url.pathname === '/create-sumup-checkout') {
      try {
        const token = env.SUMUP_ACCESS_TOKEN;
        if (!token) {
          return new Response(JSON.stringify({ error: "Missing SUMUP_ACCESS_TOKEN secret." }), { status: 500 });
        }

        // Parse content sent from the form
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

        // Send request to SumUp API
        const response = await fetch('https://api.sumup.com/v1.0/checkouts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: cleanAmount,
            currency: 'GBP',
            checkout_reference: 'Order-' + Date.now(),
            pay_to_email: 'info@allclearexteriorcleaning.co.uk'
          })
        });

        const data = await response.json();
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

    // 2. Otherwise, serve your normal static website pages (index.html, style.css, etc.)
    return env.ASSETS.fetch(request);
  }
};
