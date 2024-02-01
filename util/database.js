const sql = require('mysql2')
const pool = sql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Aniket123'
})


module.exports = pool.promise();