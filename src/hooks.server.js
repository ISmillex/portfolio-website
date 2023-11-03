/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const paths = ['/grovio/api/v1', '/etumobil/api/'];

    if (paths.some(path => event.url.pathname.startsWith(path))) {

        // Required for CORS to work
        if(event.request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }
            });
        }
    }
    const response = await resolve(event);
    if (paths.some(path => event.url.pathname.startsWith(path))) {
        response.headers.append('Access-Control-Allow-Origin', `*`);
    }
    return response;
}
