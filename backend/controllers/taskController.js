/** Translate nested task requests into service calls. Item ownership follows the stored parent project. */
const taskService = require("../services/taskService");

class taskController{
    async createTask(req,res){

        const userId = req.user.id;
        const {title,description,status} = req.body ;
        const { projectId } = req.params ;

        const data = await taskService.createTask(title,description,status,projectId,userId);
        return res.status(201).json({message:"Task created successfully",data:data});

    }
    async getTasks(req,res){
        const userId = req.user.id ;
        const { projectId } = req.params ;

        const tasks = await taskService.getTasks(projectId,userId);
        return res.status(200).json({message:"Tasks retrieved successfully",data:tasks});
    }
    async getTaskById(req,res){
        const userId = req.user.id ;
        const taskId  = req.params.id ;

        const task = await taskService.getTaskById(taskId,userId);
        return res.status(200).json({message:"Tasks retrieved successfully",data:task});
    }
    async updateTask(req,res){
        const taskId = req.params.id ;
        const userId = req.user.id ;

        const {title,description,status} = req.body ;

        const task = await taskService.updateTask(title,description,status,taskId,userId);
        return res.status(200).json({message:"Task updated successfully",data:task});
    }
    async deleteTask(req,res){
        const taskId = req.params.id ;
        const userId = req.user.id ;

        const task = await taskService.deleteTask(taskId,userId);
        return res.status(200).json({message:"Task deleted successfully",data:task});
    }
}

module.exports = new taskController() ;
