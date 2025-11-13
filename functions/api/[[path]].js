export async function onRequest(context) {
  const { request, env } = context;

  const worker = env.API_WORKER;

  if (!worker || typeof worker.fetch !== "function") {
    return new Response("Service binding saknas eller är felkonfigurerad.", {
      status: 500
    });
  }

  // Skicka vidare requesten internt till workern
  return worker.fetch(request);
}

