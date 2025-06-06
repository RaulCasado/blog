// This file prevents Chrome DevTools requests from matching dynamic routes
// and generating warnings in the console

export async function GET() {
  return new Response(null, {
    status: 404,
    statusText: 'Not Found'
  });
}
