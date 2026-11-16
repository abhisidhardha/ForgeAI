/** Owner-filtered counts and five newest projects/tasks; recent activity means creation time. */
const {pool} = require('../config/db');

class dashboardRepository{
    async getReports(ownerId){
        const projectsCount = await pool.query(`SELECT COUNT(*) AS projects_count FROM Projects AS p WHERE p.owner_id = $1`,[ownerId]);
        const tasksCount = await pool.query(`SELECT COUNT(*) AS tasks ,
            COUNT(*) FILTER (WHERE t.status = 'pending') AS pending_tasks ,
            COUNT(*) FILTER (WHERE t.status = 'in-progress') AS progress_tasks,
            COUNT(*) FILTER (WHERE t.status = 'completed') AS completed_tasks
            FROM Tasks t
            JOIN Projects p ON p.id = t.project_id
            WHERE p.owner_id = $1`,[ownerId]);
        const recentProjects = await pool.query(`SELECT * FROM Projects AS p  WHERE p.owner_id = $1 ORDER BY p.created_at DESC LIMIT 5`,[ownerId]);
        const recentTasks = await pool.query(`SELECT t.id, t.title, t.description, t.status, t.project_id, t.created_at FROM Tasks AS t JOIN Projects p ON p.id = t.project_id  WHERE p.owner_id = $1 ORDER BY t.created_at DESC  LIMIT 5`,[ownerId]);


        return {
            projectsCount : Number(projectsCount.rows[0].projects_count) ,
            tasksCount : {
                total : Number(tasksCount.rows[0].tasks),
                pending : Number(tasksCount.rows[0].pending_tasks),
                inProgress : Number(tasksCount.rows[0].progress_tasks),
                completed : Number(tasksCount.rows[0].completed_tasks),
            },
            recentProjects : recentProjects.rows ,
            recentTasks : recentTasks.rows ,
        }
    }
}

module.exports = new dashboardRepository();
