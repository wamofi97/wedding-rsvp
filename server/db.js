const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.connectionString,
    ssl: {
      rejectUnauthorized: false, // Ensure SSL is handled correctly
    },
  });
  
  // Test connection
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error connecting to database', err.stack);
    }
    console.log('Connected to Supabase via connection string!');
    release();
  });

// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: String(process.env.DB_PASSWORD),
//     host : process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// })

module.exports = pool;