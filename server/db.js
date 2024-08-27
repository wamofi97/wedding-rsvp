const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "imnotEMO97_",
    host : "localhost",
    port: 5432,
    database: "weddingrsvp"
})

module.exports = pool;