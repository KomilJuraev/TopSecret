const pg = require("pg");

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD, 
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log('Database connection error:', err))

module.exports = db;