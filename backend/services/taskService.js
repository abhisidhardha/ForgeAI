/** Validate task fields/status and authorize through the stored parent project before item access. */
const taskRepository = require("../repositories/taskRepository");
const appError = require("../utils/appError");
const projectService = require("./projectService");

class taskService{
    async createTask(title, description, status, projectId, userId){
        if(!title) throw new appError("Title is required",400);
        if(!projectId) throw new appError("Project ID is required",400);

        if(!title.trim()) throw new appError("Title is required",400);

        const validStatus = ["pending","in-progress","completed"];
        if(!validStatus.includes(status)){
            throw new appError("Invalid status",400);
        }

        await projectService.getProjectById(projectId,userId);
        const task = await taskRepository.createTask(title,description,status,projectId);
        return task ;

    }
    async getTasks(projectId,userId){
        if(!projectId) throw new appError("Project ID is required",400);

        await projectService.getProjectById(projectId,userId);

        const tasks = await taskRepository.getTasks(projectId);
        return tasks ;
    }
    async getTaskById(taskId,userId){
        if(!taskId) throw new appError("Task ID is required",400);

        const task = await taskRepository.getTaskById(taskId);
        if(!task) throw new appError("Task not found",404);

        await projectService.getProjectById(task.project_id,userId);

        return task ;
    }
    async updateTask(title,description,status,taskId,userId){

        if(!title) throw new appError("Title is required",400);
        if(!description) throw new appError("Description is required",400);
        if(!title.trim()) throw new appError("Title is required",400);
        if(!description.trim()) throw new appError("Description is required",400);
        if(!status) throw new appError("Status is required",400);
        if(!taskId) throw new appError("Task ID is required",400);

        const data = await taskRepository.getTaskById(taskId);
        if(!data) throw new appError("Task Not Found",404);

        const validStatus = ["pending","in-progress","completed"];
        if(!validStatus.includes(status)){
            throw new appError("Invalid status",400);
        }

        await projectService.getProjectById(data.project_id,userId);

        const task = await taskRepository.updateTask(title,description,status,taskId);
        return task ;

    }
    async deleteTask(taskId,userId){

        if(!taskId) throw new appError("Task ID is required",400);

        const data = await taskRepository.getTaskById(taskId);
        if(!data) throw new appError("Task Not Found",404);

        await projectService.getProjectById(data.project_id,userId);

        const task = await taskRepository.deleteTask(taskId);
        return task ;

    }
}

module.exports = new taskService() ;
