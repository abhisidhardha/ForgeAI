/** Parameterized project SQL. Single-project access must pass service-layer ownership checks. */
const {pool}= require('../config/db.js');

class projectRepository{

    async createProject(name,description,userId){
        const data = await pool.query(`INSERT INTO projects(name,description,owner_id)
            VALUES($1,$2,$3)
            RETURNING *`,[name,description,userId]);
        return data.rows[0] ;
    }

    async getProjects(userId){
        const data = await pool.query(`SELECT * FROM projects
            WHERE owner_id = $1`,[userId]);
        return data.rows ;
    }

    async checkProject(name,userId){
        const data = await pool.query(`SELECT * FROM projects
            WHERE name = $1 AND owner_id = $2`,[name,userId]);
        return data.rows[0] ;
    }

    async getProjectById(projectId){
        const data = await pool.query(`SELECT * FROM projects
            WHERE id = $1`,[projectId]);
        return data.rows[0];
    }

    async updateProject(name,description,projectId){
        const data = await pool.query(`UPDATE projects
            SET name = $1, description = $2,updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *`,[name,description,projectId]);
        return data.rows[0] ;
    }

    async deleteProject(projectId){
        const data = await pool.query(`DELETE FROM projects
            WHERE id = $1 RETURNING *`,[projectId]);
        return data.rows[0];
    }
}

module.exports = new projectRepository();
