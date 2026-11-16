/** Shared PostgreSQL pool. Configuration comes from backend/.env; startup verifies connectivity. */
const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
})

const checkServer = async() => {
    await pool.query(`SELECT 1`);
    console.log("Database connected");
}


module.exports = {pool,checkServer} ;
