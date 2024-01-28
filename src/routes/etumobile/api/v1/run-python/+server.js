import { spawn } from 'child_process';
import { API_KEY } from '$env/static/private';

const SCRIPT_MAP = {
    'create_database': 'create_database.py',
    'update_database': 'update_database.py',
};

export const GET = async ({ request, url }) => {
    const apiKeyHeader = request.headers.get('x-api-key');
    const functionName = url.searchParams.get('function');
    const args = url.searchParams.get('args') ?? [];
    const origin = request.headers.get('origin');


    if (!isValidApiKey(apiKeyHeader)) {
        return unauthorizedResponse();
    }

    try {
        const data = await runPythonScript(functionName, Object.values(args));
        let response = successResponse(data);
        response = addCors(origin, response);

        return response;
    } catch (error) {
        return errorResponse(error);
    }
};

function runPythonScript(taskName, args = []) {
    const scriptName = SCRIPT_MAP[taskName];
    const scriptPath = `./src/etumobil/python/${scriptName}`;

    if (!scriptName) {
        throw new Error(`Invalid task name: ${taskName}`);
    }

    return new Promise((resolve, reject) => {
        const python = spawn(scriptPath, [...args]);
        let dataToSend = "";

        python.stdout.on('data', (data) => {
            dataToSend += data.toString();
        });

        python.stderr.on('data', (data) => {
            reject(data.toString());
        });

        python.on('close', (code) => {
            resolve(dataToSend);
        });
    });
}


function addCors(origin, response) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
    if (allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
    return response;
}

function isValidApiKey(apiKeyHeader) {
    return apiKeyHeader && apiKeyHeader === API_KEY;
}

function jsonResponse(body, status) {
    return new Response(JSON.stringify(body), { status });
}

function unauthorizedResponse() {
    return jsonResponse({ message: 'Unauthorized' }, 401);
}

function successResponse(data) {
    return jsonResponse({ message: 'Python script executed successfully', data }, 200);
}

function errorResponse(error) {
    return jsonResponse({ message: 'An error occurred while executing the Python script', error }, 500);
}


