const PROXY_PATH = '/grovio';


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

        // if (event.url.pathname.startsWith(PROXY_PATH)) {
        //     return await handleApiProxy({ event, resolve });
        // }
    }
    const response = await resolve(event);
    if (paths.some(path => event.url.pathname.startsWith(path))) {
        response.headers.append('Access-Control-Allow-Origin', `*`);
    }
    return response;
}


//
// /** @type {import('@sveltejs/kit').Handle} */
// async function handleApiProxy({event}) {
//     const origin = event.request.headers.get("Origin");
//
//     if (!origin || new URL(origin).origin !== event.url.origin) {
//         throw error(403, "Request Forbidden.");
//     }
//
//     const urlPath = event.request.url.replace(PROXY_PATH, '/grovio/api/v1/');
//     const proxiedUrl = new URL(urlPath);
//
//     event.request.headers.delete("connection");
//
//     return fetch(proxiedUrl.toString(), {
//         // propagate the request method and body
//         body: event.request.body,
//         method: event.request.method,
//         headers: event.request.headers,
//     }).catch((err) => {
//         console.log("Could not proxy API request: ", err);
//         throw err;
//     });
// }