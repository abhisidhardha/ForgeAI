/** Task server-state cache. Parent-specific list tags keep separate projects' task lists independent. */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
export const taskApi = createApi({

    reducerPath : "taskApi" ,
    baseQuery : axiosBaseQuery(),
    tagTypes : ["Task"],

    endpoints : (builder) => ({
        getTasks : builder.query({
            query : (projectId) => ({
                url : `/projects/${projectId}/tasks`,
                method: 'GET'
            }),
            transformResponse : (response) => response.data ,
            providesTags : (results = [] , error , projectId ) => [
                {type : "Task" , id : `LIST-${projectId}`},
                ...results.map(({id}) => ({
                    type : "Task" , id
                })),
            ]

        }),
        getTaskById : builder.query({
            query : ({projectId,taskId}) => ({
                url : `/projects/${projectId}/tasks/${taskId}`,
                method: 'GET'
            }),
            transformResponse : (response) => response.data ,
            providesTags : (result , error , {taskId}) => [
                    {type : "Task" , id : taskId }
            ]
        }),
        createTask : builder.mutation({
            query : ({projectId,taskData}) => ({
                url : `/projects/${projectId}/tasks`,
                method : 'POST',
                data : taskData
            }),
            invalidatesTags : (result , error, {projectId}) => [
                {type : "Task" , id : `LIST-${projectId}`}
            ]
        }),
        updateTask : builder.mutation({
            query : ({projectId,taskId,taskData}) => ({
                url : `/projects/${projectId}/tasks/${taskId}`,
                method: 'PUT',
                data : taskData
            }),
            invalidatesTags : (result , error , {projectId,taskId}) => [
                    {type : "Task" , id : taskId },
                    {type : "Task" , id : `LIST-${projectId}`},
            ]
        }),
        deleteTask : builder.mutation({
            query : ({projectId,taskId}) => ({
                url : `/projects/${projectId}/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags : (result , error , {projectId,taskId}) => [
                    {type : "Task" , id : taskId },
                    {type : "Task" , id : `LIST-${projectId}`},
            ]
        }),
    })

})

export const { useGetTasksQuery , useGetTaskByIdQuery , useCreateTaskMutation , useUpdateTaskMutation , useDeleteTaskMutation } = taskApi ;
