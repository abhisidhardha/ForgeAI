/** Parameterized user persistence queries. Callers must hash passwords before registration. */
const { pool } = require('../config/db');

class authRepository{
    async findUserByEmail(email){
        const data = await pool.query(`SELECT *
        FROM users
        WHERE email = $1`,[email]);
        return data.rows[0] ;
    }
    async register(name,email,password){
        await pool.query(`INSERT INTO
        users(name,email,password)
        VALUES($1,$2,$3) `,[name,email,password]);
    }

}

module.exports = new authRepository();
