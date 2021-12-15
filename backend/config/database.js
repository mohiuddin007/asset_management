/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2021-10-26 07:53:11
 * @modify date 2021-10-26 07:53:11
 * @desc [description]
 */
const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

module.exports = pool;