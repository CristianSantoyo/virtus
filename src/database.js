const mysql = require('mysql');
const {promisify} = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection){
        connection.release();
        console.error('DATABASE Connected');
        return;
    }
});
// Promisify Pool QUERY -> Convirtiendo en promesas lo que antes eran callbacks
pool.query = promisify(pool.query);

module.exports = pool;