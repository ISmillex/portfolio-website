// export const GET = async ({ request }) => {
//     try {
//         const response = await fetch(`https://www.youtube.com${request.path}`, {
//             headers: request.headers
//         });
//         const data = await response.json();
//         return new Response(JSON.stringify({
//             message: 'successful youtube api call',
//             data: data
//         }),{ status: 200});
//     } catch (error) {
//         return new Response(JSON.stringify({
//             message: 'An error occurred while requesting the youtube api',
//             error: error
//         }), { status: 500 });
//     }
// }

//
// export async function get(request) {
//     const { slug } = request.params;
//     const apiURL = `https://www.youtube.com/${slug.join('/')}`;
//
//     const response = await fetch(apiURL, {
//         method: request.method,
//         headers: request.headers,
//         body: request.rawBody
//     });
//
//     return {
//         status: response.status,
//         headers: response.headers,
//         body: await response.text()
//     };
// }
