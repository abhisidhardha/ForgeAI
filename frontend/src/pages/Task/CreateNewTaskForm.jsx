/** Validated task creation with the route project ID and a controlled status selector. */
import { useParams } from "react-router-dom";
import { useCreateTaskMutation } from "../../apis/taskApi";
import { useForm } from "react-hook-form";
import { taskOptions } from "./TaskStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../validations/taskSchema";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import ErrorState from "../../components/ErrorState";
import { X } from "lucide-react";
import { Controller } from "react-hook-form";
const CreateNewTaskForm = ({ onClose }) => {
    //Task Schema Resolver
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            status: taskOptions[0].value,
        },
    });

    //Fetch Project Id to insert task
    const { projectId } = useParams();

    //Task Mutation (RTK QUERY)
    const [createTask, { isLoading, isError, error }] = useCreateTaskMutation();

    //Handle Task Creation
    const handleCreateTask = async (data) => {

        try {
            await createTask({
                projectId,
                taskData: data,
            }).unwrap();
            reset();
            onClose();
        } catch {
            // RTK Query exposes the mutation error in the form or confirmation dialog.
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-5 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="relative max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border-card bg-background">
                <Button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 rounded-lg border-card p-1.5  bg-ghost-background hover:bg-red-500"
                >
                    <X size={20} />
                </Button>
                <form
                    onSubmit={handleSubmit(handleCreateTask)}
                    className="flex max-h-[90vh] w-full flex-col gap-5 overflow-y-auto py-15 px-2 lg:px-10"
                >
                    <div className="flex flex-col gap-5">
                        <Input
                            type="text"
                            placeholder="Task Name"
                            label="Task Name"
                            {...register("title")}
                            error={errors?.title?.message}
                        />

                        <Textarea
                            placeholder="Task Description"
                            label="Task Description"
                            {...register("description")}
                            error={errors?.description?.message}
                        ></Textarea>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Status"
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    options={taskOptions}
                                    error={errors?.status?.message}
                                ></Select>
                            )}
                        />
                    </div>
                    <div className="min-h-6 self-center pt-2">
                        {isError && (
                            <ErrorState message={error?.data?.message}>

                            </ErrorState>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        loadingText="Creating task ..."
                        className="w-fit self-center sticky-bottom"
                    >
                        Create Task
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewTaskForm;
