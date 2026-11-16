/** Render owner-scoped project/task statistics and recent records, including loading/error/empty states. */
import { useGetReportsQuery } from "../apis/dashboardApi";
import StatCard from "./UI/StatCard";
import {
    FolderOpenDot,
    ListChecks,
    CircleCheckBig,
    LoaderCircle,
    Clock4,
} from "lucide-react";
import TaskHeader from "./Task/TaskHeader";
import ProjectHeader from "./Project/ProjectHeader";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
    const { data, isLoading, isError, error } = useGetReportsQuery();

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message={error?.data?.message} />;
    if (!data) {
        return (
            <EmptyState
                title="No dashboard data available"
                description="There is no report data yet for this workspace."
            />
        );
    }

    const recentProjects = data?.recentProjects ?? [];
    const recentTasks = data?.recentTasks ?? [];

    return (
        <div className="w-full">
            <p className="text-4xl tracking-tight font-bold">Overview</p>

            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
                <StatCard
                    title="Projects"
                    value={data?.projectsCount ?? 0}
                    icon={FolderOpenDot}
                    color="blue"
                />
                <StatCard
                    title="Total Tasks"
                    value={data?.tasksCount?.total ?? 0}
                    icon={ListChecks}
                    color="gray"
                />
                <StatCard
                    title="Pending Tasks"
                    value={data?.tasksCount?.pending ?? 0}
                    icon={Clock4}
                    color="yellow"
                />
                <StatCard
                    title="In Progress Tasks"
                    value={data?.tasksCount?.inProgress ?? 0}
                    icon={LoaderCircle}
                    color="indigo"
                />
                <StatCard
                    title="Completed Tasks"
                    value={data?.tasksCount?.completed ?? 0}
                    icon={CircleCheckBig}
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex-1">
                    <div className="text-4xl tracking-tight font-semibold border-b-2 border-dashed border-foreground/10 pb-3">
                        Recent Projects
                    </div>

                    <div className="flex flex-col pt-4 gap-5">
                        {recentProjects.length === 0 ? (
                            <EmptyState
                                title="No recent projects"
                                description="Create a project to get started."
                            />
                        ) : (
                            recentProjects.map((project) => (
                                <ProjectHeader key={project.id} project={project} />
                            ))
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="text-4xl tracking-tight font-semibold border-b-2 border-dashed border-foreground/10 pb-3">
                        Recent Tasks
                    </div>

                    <div className="flex flex-col pt-4 gap-5">
                        {recentTasks.length === 0 ? (
                            <EmptyState
                                title="No recent tasks"
                                description="Add a task to your first project."
                            />
                        ) : (
                            recentTasks.map((task) => (
                                <TaskHeader key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
