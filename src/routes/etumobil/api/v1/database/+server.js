import { config } from 'dotenv';
import { spawn } from 'child_process';

config();

const API_KEY = process.env.API_KEY;

export const GET = async ({ request, url }) => {

    const apiKeyHeader = request.headers.get('x-api-key');

    const functionName = url.searchParams.get('function') ;
    const args = url.searchParams.get('args') ?? []

    if (!apiKeyHeader || apiKeyHeader !== API_KEY) {
        return new Response(JSON.stringify({
            message: 'Unauthorized'
        }), { status: 401 });
    }

    try {
        const data = await runPythonScript(functionName, Object.values(args));
        return new Response(JSON.stringify({
                message: 'Python script executed successfully',
                data: data
            }),{ status: 200});
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'An error occurred while executing the Python script',
            error: error
        }), { status: 500 });
    }
};

function runPythonScript(taskName, args = []) {
    const scriptMap = {
        'create_database': 'create_database.py',
        'update_database': 'update_database.py',
    };

    const scriptName = scriptMap[taskName];
    const scriptPath = `./src/etumobil/${scriptName}`;

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
