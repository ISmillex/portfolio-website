import Database from 'better-sqlite3';

const API_KEY = "AlkinOrospu";

export const GET = async ({ request, url }) => {
    const apiKeyHeader = request.headers.get('x-api-key');
    const query = url.searchParams.get('query') ;
    // const params = url.searchParams.get('params').split(',');

    // if (!apiKeyHeader || apiKeyHeader !== API_KEY) {
    //     return new Response(JSON.stringify({
    //         message: 'Unauthorized'
    //     }), { status: 401 });
    // }

    try {
        const data = await executeSqlQuery(query);
        return new Response(JSON.stringify({
            message: 'Sql query executed successfully',
            data: data
        }),{ status: 200});
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'An error occurred while executing sql query',
            error: error.message
        }), { status: 500 });
    }
};

function executeSqlQuery(query) {
    // mac path - /Users/archyn/Programming/JavaScript/Svelte/portfolio-website-new/src/etumobile/ubs_database.db
    // ubuntu path - /home/ubuntu/Programming/portfolio-website/src/etumobile/ubs_database.db
    const db = new Database('/Users/archyn/Programming/JavaScript/Svelte/portfolio-website-new/src/etumobile/ubs_database.db', { verbose: console.log });
    const stmnt = db.prepare(query);
    return stmnt.all();
}



