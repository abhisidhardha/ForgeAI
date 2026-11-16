/** Parameterized task SQL. The task service authorizes the parent project before these operations. */
const { pool } = require("../config/db");

class taskRepository{
    async createTask(title,description,status,projectId){
        const data = await pool.query(`INSERT INTO tasks(title,description,status,project_id)
            VALUES($1,$2,$3,$4)
            RETURNING *`,[title,description,status,projectId]);
        return data.rows[0] ;
    }

    async getTasks(projectId){
        const data = await pool.query(`SELECT * FROM tasks
            WHERE project_id = $1`,[projectId]);
        return data.rows ;
    }

    async getTaskById(taskId){
        const data = await pool.query(`SELECT * FROM tasks
            WHERE id = $1`,[taskId]);
        return data.rows[0] ;
    }

    async updateTask(title,description,status,taskId){
        const data = await pool.query(`UPDATE tasks
            SET title = $1,description = $2,status = $3,updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *`,[title,description,status,taskId]);
        return data.rows[0];
    }
    async deleteTask(taskId){
        const data = await pool.query(`DELETE FROM tasks
            WHERE id = $1
            RETURNING *`,[taskId]);
        return data.rows[0] ;
    }
}

module.exports = new taskRepository();
