export async function onRequestPost(context) {
    try {
        const input = await context.request.json();

        return new Response(JSON.stringify({
            apiKeyExists: !!context.env.SUMUP_API_KEY,
            merchantExists: !!context.env.SUMUP_MERCHANT_CODE,
            amountReceived: input.amount
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}
