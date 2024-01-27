
const handleYTRequests = async ({request}) => {
    let url = new URL(request.url);

    let blob = url.searchParams.has('__blob');

    if (blob) {
        url = new URL(url.searchParams.get('__blob'));
    }
    else {
        url.host = url.searchParams.get('__host');
        url.pathname = url.searchParams.get('__path');
        url.protocol = 'https';
        url.port = '443';
        url.searchParams.delete('__host');
        url.searchParams.delete('__path');
    }

    const fetchRes = await fetch(url, {
        method: request.method,
        headers: new Headers(),
        body: request.body,
    });


    let body;
    if (blob) {
        body = await fetchRes.blob();
    }
    else {
        body = fetchRes.body;
    }

    return new Response(body, {
        status: fetchRes.status,
    });
}



const handleUrlConvertRequests = async ({request}) => {
    let url = new URL(request.url);
    const new_url = new URL(url.searchParams.get('__convertUrl'));

    const headers = url.searchParams.get('__headers');

    const fetchRes = await fetch(new_url, {
        method: request.method,
        headers: new Headers(JSON.parse(headers)),
        body: request.body,
    });

    if (fetchRes.ok) {
        const body = await fetchRes.json();
        return new Response(JSON.stringify(body), {
            status: fetchRes.status,
        });
    } else {
        return new Response(null, {
            status: fetchRes.status,
        });
    }
}


export const GET = handleYTRequests;

export const POST = async (args) => {
    const request = args.request;

    if (request.url.includes('__convertUrl')) {
        return handleUrlConvertRequests(args);
    } else {
        return handleYTRequests(args);
    }
};

