/** Register the auth slice and each independent RTK Query reducer/middleware; install query listeners. */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { projectApi }  from '../apis/projectApi' ;
import { taskApi } from "../apis/taskApi";
import { dashboardApi } from "../apis/dashboardApi";
import { registerApi } from "../apis/authApi";


export const store = configureStore({
    reducer:{
        auth:authReducer,
        [registerApi.reducerPath] : registerApi.reducer ,
        [projectApi.reducerPath] : projectApi.reducer ,
        [taskApi.reducerPath] : taskApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().
    concat(registerApi.middleware).
    concat(projectApi.middleware).
    concat(taskApi.middleware).
    concat(dashboardApi.middleware)

})

setupListeners(store.dispatch);
