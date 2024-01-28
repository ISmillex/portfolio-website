import os from 'os';
import Database from 'better-sqlite3';
import {API_KEY} from '$env/static/private';

const DB_PATHS = {
    'darwin': '/Users/archyn/Programming/JavaScript/Svelte/porfolio-website/src/etumobile/database/',
    'linux': '/home/ubuntu/Programming/portfolio-website/src/etumobile/database/'
};

const ALLOWED_ORIGINS = ['http://localhost:5173','http://localhost:5174','http://localhost:3000'];

export const OPTIONS = async ({ request }) => {
    const response = new Response(null);
    const origin = request.headers.get('origin');

    if (ALLOWED_ORIGINS.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    return response;
};

export const GET = async ({ request, url }) => {
    const { query, params ,database_name} = getQueryParams(url);
    const apiKeyHeader = request.headers.get('x-api-key');
    const origin = request.headers.get('origin');

    if (!isAuthorized(apiKeyHeader)) {
        return unauthorizedResponse();
    }

    console.log(query, params, database_name)
    try {
        const data = await executeSqlQuery(query, params, database_name);
        let response = successResponse(data);

        if (ALLOWED_ORIGINS.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        }

        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

        return response;
    } catch (error) {
        return errorResponse(error);
    }
};

function executeSqlQuery(query, params, database_name) {
    const DB_PATH = DB_PATHS[os.platform()] + database_name;
    const db = new Database(DB_PATH, { verbose: console.log });
    const stmnt = db.prepare(query);
    return stmnt.all(params);
}

function getQueryParams(url) {
    const query = url.searchParams.get('query');
    const params = url.searchParams.get('params');
    const database_name = url.searchParams.get('database_name');
    return {
        query: query,
        params: params ? params.split(',') : [],
        database_name: database_name
    };
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
