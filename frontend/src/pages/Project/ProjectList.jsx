import { useGetProjectsQuery } from "../../apis/projectApi";
import ProjectCard from "./ProjectCard";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";
import EmptyState from "../../components/EmptyState";
const ProjectList = () => {
    const { data, isLoading, isError, error } = useGetProjectsQuery();

    if (isLoading) return <Loading message="Loading Projects" />;

    if (isError) return <ErrorState message={error?.data?.message}/> ;

    if (!data.length) return <EmptyState title="No projects exists" />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-5 mt-5">
            {data.map((project) => {
                return <ProjectCard project={project} key={project.id} />;
            })}
        </div>
    );
};

export default ProjectList;
