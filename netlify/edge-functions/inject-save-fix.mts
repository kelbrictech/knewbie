export default async (request: Request, context: any) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes("/save-to-device-001.js")) return new Response(html, response);

  const patched = html.replace(
    "</body>",
    '<script src="/save-to-device-001.js"></script></body>'
  );

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(patched, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: ["/", "/index.html"]
};