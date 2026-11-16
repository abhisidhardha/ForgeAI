import { useParams } from "react-router-dom";
import { useGetTasksQuery } from "../../apis/taskApi"
import TaskCard from "./TaskCard";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import Loading from "../../components/Loading";
const TaskList = () => {
    const {  projectId } = useParams();
    const { data, isLoading , isError , error } = useGetTasksQuery(projectId);

    if(isLoading) return(<Loading message="Loading tasks" />);
    if(isError) return (<ErrorState message={error?.data?.message}/>);
    if(!data?.length) return(<EmptyState title="No tasks"/>) ;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {
                data.map((task)=> (
                    <TaskCard task={task} key={task.id}/>
                ))
            }
        </div>
    )
}

export default TaskList
