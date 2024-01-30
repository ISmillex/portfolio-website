import fs from 'fs';
import os from 'os';
import path from 'path';
import {API_KEY} from '$env/static/private';


const ALLOWED_ORIGINS = ['http://localhost:5173','http://localhost:5174','http://localhost:3000'];

const ALLOWED_PATHS = {
    "darwin": "/Users/archyn/Programming/JavaScript/Svelte/porfolio-website/src/etumobile/",
    'linux': '/home/ubuntu/Programming/portfolio-website/src/etumobile/'
}

export const OPTIONS = async ({ request }) => {
    const response = new Response(null);
    const origin = request.headers.get('origin');
    setCorsHeaders(response, origin);
    return response;
};

export const GET = async ({ request, url }) => {
    const file_path = url.searchParams.get('file_path');
    const apiKeyHeader = request.headers.get('x-api-key');
    const origin = request.headers.get('origin');

    if (!isAuthorized(apiKeyHeader)) {
        return unauthorizedResponse();
    }

    try {
        const sanitized_path = sanitizePath(file_path);
        const data = fs.readFileSync(sanitized_path);
        let response = new Response(data, { status: 200 });
        response.headers.set('Content-Type', 'application/octet-stream');
        response.headers.set('Content-Disposition', `attachment; filename=${path.basename(sanitized_path)}`);
        setCorsHeaders(response, origin);
        return response;
    } catch (error) {
        return errorResponse(error);
    }
};

function sanitizePath(file_path) {
    let absolute_path = path.resolve(ALLOWED_PATHS[os.platform()], file_path);
    if (absolute_path.startsWith(ALLOWED_PATHS[os.platform()])) {
        return absolute_path;
    } else {
        throw new Error('Invalid file path');
    }
}

function setCorsHeaders(response, origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
}

function isAuthorized(apiKeyHeader) {
    return apiKeyHeader && apiKeyHeader === API_KEY;
}

function jsonResponse(body, status) {
    return new Response(JSON.stringify(body), { status });
}

function unauthorizedResponse() {
    return jsonResponse({ message: 'Unauthorized' }, 401);
}

function successResponse(data) {
    return jsonResponse({ message: 'Sql query executed successfully', data }, 200);
}

function errorResponse(error) {
    return jsonResponse({ message: 'An error occurred while executing sql query', error }, 500);
}
