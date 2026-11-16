/** Registration uses RTK Query; login returns a token to the Redux async thunk. */
import { api } from "./axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

export const registerApi = createApi({

    reducerPath : "registerApi" ,
    baseQuery : axiosBaseQuery() ,
    tagTypes : ["register"] ,

    endpoints : (builder) => ({
        register :  builder.mutation({
            query : (userData) => ({
                url : "/auth/register" ,
                method : "POST",
                data : userData
            }),
        }),
    }),

})

export const login = async(userData) => {
    const res = await api.post('/auth/login',userData);
    return res.data ;
}

export const { useRegisterMutation } = registerApi ;
