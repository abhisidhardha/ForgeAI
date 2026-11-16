/** Task summary with edit actions and confirmed deletion; mutation errors stay in the modal. */
import { useState, useRef, useEffect } from "react";
import { getTaskByOption, getTaskClassName } from "./TaskStatus";
import { EllipsisVertical } from "lucide-react";
import { useDeleteTaskMutation } from "../../apis/taskApi";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { confirmConfig } from "../../components/Modal/confirmConfig";
import TaskEditForm from "./TaskEditForm";

const TaskCard = ({ task }) => {
    const [taskOpen, setTaskOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const taskRef = useRef(null);

    const [
        deleteTask,
        { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
    ] = useDeleteTaskMutation();
    const [config, setConfig] = useState(null);

    const handleDeleteTask = async () => {
        try {
            const taskId = task.id;
            const projectId = task.project_id;
            await deleteTask({ taskId, projectId }).unwrap();
            setConfig(null);
        } catch {
            // RTK Query exposes the mutation error in the form or confirmation dialog.
        }
    };

    const confirmMeta = {
        "delete-task": {
            run: handleDeleteTask,
            isLoading: isDeleting,
            error: isDeleteError ? deleteError?.data?.message : null,
        },
    };

    const active = confirmMeta[config];
    const activeConfirmConfig = config ? confirmConfig[config] : null;

    const handleConfirm = () => {
        if (!active) {
            console.error(`No handler found for: ${config}`);
            return;
        }
        active.run();
    };

    const isConfirmLoading = active?.isLoading ?? false;
    const confirmError = active?.error ?? null;

    const createdAt = task?.created_at;
    const daysAgo = createdAt
        ? Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24))
        : 0;

    useEffect(() => {
        if (!taskOpen) return;
        const handleClose = (e) => {
            if (taskRef.current && !taskRef.current.contains(e.target)) {
                setTaskOpen(false);
            }
        };
        document.addEventListener("click", handleClose);
        return () => document.removeEventListener("click", handleClose);
    }, [taskOpen]);

    return (
        <div className="bg-card h-full flex flex-col gap-3 border-card shadow-card rounded-xl relative">
            <div className="grid grid-cols-[1fr_auto] p-5 relative">
                <h2 className="text-lg lg:text-2xl font-semibold">{task.title}</h2>
                <div ref={taskRef} className="relative">
                    <EllipsisVertical
                        className="ml-5 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setTaskOpen((prev) => !prev);
                        }}
                    />
                    {taskOpen && (
                        <div className="absolute top-full right-0 z-20 overflow-hidden bg-surface border-card rounded-xl shadow-lg min-w-32 py-1">
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                onClick={() => {
                                    setEditOpen(true);
                                    setTaskOpen(false);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                                onClick={() => {
                                    setConfig("delete-task");
                                    setTaskOpen(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <p className="px-5 pb-5 text-base lg:text-lg text-muted flex-1 leading-relaxed">{task.description}</p>
            <div className="mt-auto grid grid-cols-2 border-t border-dashed border-foreground/10 p-5 items-center">
                <p className={`w-fit ${getTaskClassName(task.status)}`}>
                    {getTaskByOption(task.status)}
                </p>
                <h2 className="text-lg lg:text-xl ml-auto">
                    {daysAgo > 0 ? `${daysAgo} days ago` : "Today"}
                </h2>
            </div>
            {editOpen && (
                <TaskEditForm task={task} onClose={() => setEditOpen(false)} />
            )}

            <ConfirmModal
                open={Boolean(config)}
                config={activeConfirmConfig}
                onClose={() => setConfig(null)}
                onConfirm={handleConfirm}
                isLoading={isConfirmLoading}
                error={confirmError}
            />
        </div>
    );
};

export default TaskCard;
