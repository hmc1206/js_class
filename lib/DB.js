const mysql = require('mysql2');

const {Info} = require('./secret.js');

const pool = mysql.createPool(Info);
const promisePool = pool.promise();

module.exports = {
    Pool : promisePool,
}