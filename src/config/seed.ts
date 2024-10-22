import {promises as fs} from 'fs';
import path from path;

import client from './connection.js';

const __dirname = path.resolve();
const schemaSQL = await fs.readFile(path.join(__dirname, './db/schema.sql'));

await client.query(schemaSQL);

const seedSQL = await fs.readFile(path.join(__dirname, './db/seed.sql'));

await client.query(seedSQL);

process.exit();