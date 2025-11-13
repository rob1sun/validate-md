export async function onRequest(context) {
  const { request, env } = context;


  const worker = env.API_WORKER;

  if (!worker || typeof worker.fetch !== "function") {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Service binding API_WORKER saknas eller är felkonfigurerad."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // Skicka bara vidare requesten rakt av.
  // Path och query behålls, men trafiken går till workern internt i Cloudflare.
  return worker.fetch(request);
}
