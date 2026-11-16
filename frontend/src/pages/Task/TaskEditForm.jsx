/** Edit task fields and status using the task's persisted project ID; close only after a successful save. */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../../validations/taskSchema";
import { useUpdateTaskMutation } from "../../apis/taskApi";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { taskOptions } from "./TaskStatus";
import Select from "../../components/Select";
import { Controller } from "react-hook-form";
import { X } from "lucide-react";
import ErrorState from "../../components/ErrorState";
import Button from "../../components/Button";

const TaskEditForm = ({ task,onClose }) => {

    const taskId = task?.id ;
    const projectId = task?.project_id ;
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title || "",
            description: task?.description || "",
            status: task?.status || taskOptions[0].value,
        },
    });

    const [updateTask, { isLoading, isError, error }] = useUpdateTaskMutation();

    const handleUpdateTask = async(data) => {
        try {
            await updateTask({taskId,projectId,taskData:data}).unwrap();
            if (onClose) onClose();
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-5 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border-card bg-background ">
                <Button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 rounded-lg border-card p-1.5  bg-ghost-background hover:bg-red-500"
                >
                    <X size={20} />
                </Button>
                <form onSubmit={handleSubmit(handleUpdateTask)} className="flex max-h-[90vh] w-full flex-col gap-5 overflow-y-auto py-15 px-2 lg:px-10">
                    <div className="flex flex-col gap-5">
                        <Input type="text" {...register("title")} label="Title"></Input>
                        <Textarea {...register("description")} label="Description"></Textarea>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={taskOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    label="Status"
                                    error={errors.status?.message}
                                />
                            )}
                        />
                    </div>
                    <div className="min-h-6 self-center pt-2">
                        {isError && (
                            <ErrorState message={error?.data?.message} />
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="secondary"
                        isLoading={isLoading}
                        loadingText="Updating task ..."
                        className="w-fit self-center sticky-bottom"
                    >
                        Update Task
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default TaskEditForm;
