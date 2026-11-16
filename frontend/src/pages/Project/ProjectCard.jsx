import { Link } from "react-router-dom";
const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="h-full">
            <div className=" h-full  gap-10 flex flex-col p-5 bg-card border-card shadow-card  rounded-xl">
                <h2 className="text-2xl font-semibold">{project.name}</h2>
                <p className="line-clamp-3">{project.description}</p>
            </div>
        </Link>
    );
};

export default ProjectCard;
