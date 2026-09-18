export default async (request: Request, context: any) => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return response;

  const html = await response.text();
  const scripts = [
    '<script src="/elder-preach-my-gospel-vocab.js"></script>',
    '<script src="/save-to-device-001.js"></script>'
  ];
  const missing = scripts.filter((tag)=>!html.includes(tag));
  if (!missing.length) return new Response(html, response);

  const patched = html.replace("</body>", missing.join("") + "</body>");
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