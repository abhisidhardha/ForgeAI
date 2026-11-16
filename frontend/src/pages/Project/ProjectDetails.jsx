/** View/edit one project, confirm updates/deletion, and host its task workspace. */
import { useNavigate, useParams } from "react-router-dom";

import {
    useGetProjectByIdQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} from "../../apis/projectApi";

import { useState, useEffect } from "react";
import Tasks from "../Tasks";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { projectSchema } from "../../validations/projectSchema";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import ErrorState from "../../components/ErrorState";

import ConfirmModal from "../../components/Modal/ConfirmModal";

import { confirmConfig } from "../../components/Modal/confirmConfig";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();


    //RTK Query
    const { data, isLoading, isError, error } = useGetProjectByIdQuery(projectId);

    //Edit Form
    const [isEditing, setIsEditing] = useState(false);

    //Modal Config
    const [config, setConfig] = useState(null);

    //Mutations
    const [
        updateProject,
        { isLoading: isUpdating, isError: isUpdateError, error: updateError },
    ] = useUpdateProjectMutation();

    const [
        deleteProject,
        { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
    ] = useDeleteProjectMutation();

    //Schema Resolver
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

    //Fetch Data
    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                description: data.description,
            });
        }
    }, [data, reset]);

    //Handlers
    const handleUpdateProject = async (formData) => {
        try {
            await updateProject({
                projectId,
                projectData: formData,
            }).unwrap();

            setIsEditing(false);
            setConfig(null);
        } catch {
            // RTK Query exposes the mutation error in the form or confirmation dialog.
        }
    };

    const handleDeleteProject = async () => {
        try {
            await deleteProject(projectId).unwrap();

            setConfig(null);
            navigate("/projects");
        } catch {
            // RTK Query exposes the mutation error in the form or confirmation dialog.
        }
    };

    const handleCancelEdit = () => {
        reset({ name: data?.name, description: data?.description });
        setIsEditing(false);
    };
    const confirmMeta = {
        "update-project": {
            run: () => handleSubmit(handleUpdateProject)(),
            isLoading: isUpdating,
            error: isUpdateError ? updateError?.data?.message : null,
        },
        "delete-project": {
            run: handleDeleteProject,
            isLoading: isDeleting,
            error: isDeleteError ? deleteError?.data?.message : null,
        },
    };

    const active = confirmMeta[config];
    const activeConfirmConfig = config ? confirmConfig[config] : null;

    const handleConfirm = () => {
        if (!active) return ;
        active.run();
    };

    const isConfirmLoading = active?.isLoading ?? false;
    const confirmError = active?.error ?? null;

    const deleteButton = (
        <Button
            type="button"
            variant="danger"
            onClick={() => setConfig("delete-project")}
        >
            Delete Project
        </Button>
    );

    if (isLoading) return <Loading message="Loading project details" />;
    if (isError) return <ErrorState message={error?.data?.message} />;
    if (!data) return null;

    return (
        <div className="flex flex-col gap-10 mt-5">
            <div className="pb-10 border-b-2 border-dashed border-foreground/20">
                {!isEditing ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <h1 className="text-4xl font-bold tracking-tight">
                                {data.name}
                            </h1>

                            <div className="flex gap-5">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Update Project
                                </Button>
                                {deleteButton}
                            </div>
                        </div>

                        <p className="text-base lg:text-lg text-left">{data.description}</p>
                    </div>
                ) : (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            setConfig("update-project");
                        }}
                        className="flex flex-col gap-5"
                    >
                        <Input
                            type="text"
                            label="Project Name"
                            {...register("name")}
                            error={errors?.name?.message}
                        />
                        <Textarea
                            label="Description"
                            {...register("description")}
                            rows="6"
                            error={errors?.description?.message}
                        />

                        <div className="flex gap-5 flex-wrap">
                            <Button type="submit" variant="secondary">Update Project</Button>
                            <Button type="button" variant="base" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                            {deleteButton}
                        </div>

                    </form>
                )}
            </div>

            <Tasks />
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

export default ProjectDetails;
