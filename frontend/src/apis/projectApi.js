/** Project server-state cache. LIST and entity tags refresh project queries after project mutations. */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";


export const projectApi = createApi({
  reducerPath: "projectApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Project"],

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({ url: "/projects", method: "GET" }),
      transformResponse: (response) => response.data,
      providesTags: (result = []) => [
          { type: "Project", id: "LIST" },
          ...(result ?? []).filter(Boolean).map(({ id }) => ({ type: "Project", id })),
        ],
      }),
    getProjectById: builder.query({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: (result , error , projectId) => [
        {type : "Project" , id : projectId}
      ]
    }),
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        data: projectData,
      }),
      invalidatesTags: [
        {type : 'Project' , id : "LIST" },
      ],
    }),
    updateProject: builder.mutation({
      query: ({ projectId, projectData }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        data: projectData,
      }),
      invalidatesTags: (result , error , {projectId}) => [
        {type : "Project" , id : projectId},
        {type : 'Project' , id : "LIST" },
      ],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags:  [
        {type : 'Project' , id : "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
