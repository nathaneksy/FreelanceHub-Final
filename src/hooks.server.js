export async function handle({ event, resolve }) {
  // Populate this only after a real authentication provider verifies a request.
  // Preview identities must never be assigned to locals.user.
  event.locals.user = null;
  const response = await resolve(event);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "same-origin");
  return response;
}
