export async function onRequest() {
  const response = await fetch("https://sellerforge-ai.onrender.com/sitemap.xml");

  return new Response(await response.text(), {
    status: response.status,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
