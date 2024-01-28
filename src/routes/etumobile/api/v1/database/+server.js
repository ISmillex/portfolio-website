import os from 'os';
import Database from 'better-sqlite3';
import {API_KEY} from '$env/static/private';


const DB_PATH_MAC = '/Users/archyn/Programming/JavaScript/Svelte/porfolio-website/src/etumobile/database/ubs_database.db';
const DB_PATH_LINUX = '/home/ubuntu/Programming/portfolio-website/src/etumobile/database/ubs_database.db';

let DB_PATH;

if (os.platform() === 'darwin') {
    DB_PATH = DB_PATH_MAC;
} else if (os.platform() === 'linux') {
    DB_PATH = DB_PATH_LINUX;
}


export const OPTIONS = async ({ request, url }) => {
    const response = new Response(null);

    const origin = request.headers.get('origin');

    console.log('origin', origin);

    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    return response;
};


export const GET = async ({ request, url }) => {
    const { query, params } = getQueryParams(url);
    const apiKeyHeader = request.headers.get('x-api-key');



    if (!isAuthorized(apiKeyHeader)) {
        return unauthorizedResponse();
    }

    try {
        const data = await executeSqlQuery(query, params);
        return successResponse(data);
    } catch (error) {
        return errorResponse(error);
    }
};

function executeSqlQuery(query, params) {
    const db = new Database(DB_PATH, { verbose: console.log });
    const stmnt = db.prepare(query);
    return stmnt.all(params);
}

function getQueryParams(url) {
    const query = url.searchParams.get('query');
    const params = url.searchParams.get('params');
    return {
        query: query,
        params: params ? params.split(',') : []
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


