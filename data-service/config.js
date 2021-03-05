'use-strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config(); //getting all configurations made on env file

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true"; 

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host:HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        driver: 'msnodesqlv8',
        password: SQL_PASSWORD,
        options: {
            encrypt: sqlEncrypt,
            enableArithAbort:true
        }
    }
}