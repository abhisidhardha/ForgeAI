import { getTaskByOption } from "./TaskStatus";

const TaskHeader = ({ task, children }) => {
    const { title, description, status } = task;
    const statusStyles = {
        pending: "text-yellow-500 border-2 border-yellow-500/50",
        "in-progress": "text-blue-400 border-2 border-blue-500/70",
        completed: "text-green-500 border-2 border-green-500/50",
    };
    return (
        <>
            <div className="bg-card flex justify-between  gap-4 items-center p-5 relative z-10 rounded-xl border-card">
                <div className="flex flex-col min-w-0 gap-5">
                    <h1 className="text-lg lg:text-xl font-medium truncate">{title}</h1>
                    {description && (
                        <p className="text-sm lg:text-md line-clamp-1">{description}</p>
                    )}
                </div>

                <div className="">
                    <div
                        className={`self-stretch px-2 py-1 text-sm rounded-full text-center whitespace-nowrap ${statusStyles[status]}`}
                    >
                        {getTaskByOption(status)}
                    </div>
                </div>
            </div>

            {children && <div>{children}</div>}
        </>
    );
};

export default TaskHeader;
