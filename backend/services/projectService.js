/** Project business rules and ownership checks. Repositories query by ID without authorizing callers. */
const projectRepository = require('../repositories/projectRepository');
const appError = require('../utils/appError');

class projectService{
    async createProject(name,description,userId){

        const projectName = name.trim();
        const data = await projectRepository.checkProject(projectName,userId);
        if(data) throw new appError("Project already exists",400);

        const project = await projectRepository.createProject(name,description,userId);
        return project
    }
    async getProjects(userId){
        const data = await projectRepository.getProjects(userId);
        return data ;
    }
    async checkProject(name,userId){
        const data = await(projectRepository.checkProject(name,userId));
        return data ;
    }
    async getProjectById(projectId,userId){
        const project = await projectRepository.getProjectById(projectId);

        if(!project) throw new appError("Project Not Found",404);

        if(project.owner_id !== userId) throw new appError("Forbidden",403);

        return project ;
    }
    async updateProject(userId,projectId,name,description){


        const project = await projectRepository.getProjectById(projectId);
        if(!project) throw new appError("Project not found",404);

        if(project.owner_id !== userId) throw new appError("Forbidden",403);

        if(!name) throw new appError("Name is required",400);
        if(!description) throw new appError("Description is required",400);

        const updatedProject = await projectRepository.updateProject(name,description,projectId);
        return updatedProject
    }
    async deleteProject(userId,projectId){

        const project = await projectRepository.getProjectById(projectId);

        if(!project) throw new appError("Project Not Found",404);
        if(project.owner_id !== userId) throw new appError("Forbidden",403);

        const deletedProject = await projectRepository.deleteProject(projectId);
        return deletedProject ;
    }
}

module.exports = new projectService() ;
