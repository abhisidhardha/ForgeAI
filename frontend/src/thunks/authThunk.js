/** Bridge login HTTP results into Redux lifecycle actions and user-facing error messages. */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../apis/authApi";

export const loginUser = createAsyncThunk(
    'auth/login' , async(credentials,{rejectWithValue}) => {
        try{
            const data = await login(credentials);
            return data ;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || "Invalid Login");
        }
})
