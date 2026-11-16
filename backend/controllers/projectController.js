/** Translate project HTTP requests into service calls using the verified token user ID. */
const projectService = require("../services/projectService");
class projectController{
    async createProject(req,res){
        const {name,description} = req.body;
        const userId  = req.user.id ;
        if(!name) return res.status(400).json({message:"Name is required"});

       const data = await projectService.createProject(name,description,userId);
        res.status(201).json({message:"Project Created Successfully",data:data});

    }
    async getProjects(req,res){
        const userId = req.user.id ;

        const data = await projectService.getProjects(userId);

        return res.status(200).json({
            message:"Projects retrieved successfully",
            data:data
        })

    }
    async getProjectById(req,res){
        const projectId = req.params.id ;
        const userId = req.user.id ;

        const data = await projectService.getProjectById(projectId,userId);
        return res.status(200).json({message:'Project Retrieved Successfully',data:data});

    }

    async updateProject(req,res){
        const projectId = req.params.id ;
        const {name,description} = req.body ;
        const userId = req.user.id ;

        const data = await projectService.updateProject(userId,projectId,name,description);
        return res.status(200).json({"message":"Project updated successfully",data:data})

    }
    async deleteProject(req,res){
        const projectId = req.params.id ;
        const userId = req.user.id ;

        const data = await projectService.deleteProject(userId,projectId);
        return res.status(200).json({message:"Project Deleted Successfully",data:data});
    }
}

module.exports = new projectController();
