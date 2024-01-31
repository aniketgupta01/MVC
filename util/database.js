const sql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Aniket123'
})


module.exports = pool.promise();