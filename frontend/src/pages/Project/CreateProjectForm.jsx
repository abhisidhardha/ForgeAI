/** Validated project creation modal; remain open on API failure so values and error feedback survive. */
import { useCreateProjectMutation } from "../../apis/projectApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../validations/projectSchema";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import ErrorState from "../../components/ErrorState";
import { X } from "lucide-react";
const CreateProjectForm = ({ onClose }) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const [createProject, { isLoading, isError, error }] =
        useCreateProjectMutation();

    const handleCreateProject = async (data) => {
        try {
            await createProject(data).unwrap();
            reset();
            onClose();
        } catch {
            // RTK Query exposes the mutation error in the form or confirmation dialog.
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
            onClick={(event) => {
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
                    onSubmit={handleSubmit(handleCreateProject)}
                    className="flex max-h-[90vh] w-full flex-col gap-5 overflow-y-auto py-15 px-2 md:px-10"
                >
                    <div className="flex flex-col gap-5">
                        <Input
                            type="text"
                            placeholder="Project Name"
                            label="Project Name"
                            {...register("name")}
                            error={errors?.name?.message}
                        />

                        <Textarea
                            {...register("description")}
                            label="Project Description"
                            placeholder="Project Description"
                            error={errors?.description?.message}
                        />


                    </div>
					<div className="min-h-6 self-center pt-2">
                            {isError && (
                                <ErrorState message={error?.data?.message} />
                            )}
                        </div>
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        loadingText="Creating project ..."
                        className="w-fit self-center sticky-bottom"
                    >
                        Create Project
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm;
