import pg from 'pg';
import 'console.table';
const { Client } = pg;
const client = new Client({
    user: 'postgres',
    password: 'pass',
    database: 'employee_tracker_db'
});
await client.connect();
//# sourceMappingURL=index.js.map