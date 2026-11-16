/** Restore non-expired persisted tokens and track login/logout state. Backend verification is authoritative. */
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../thunks/authThunk";
import {jwtDecode} from "jwt-decode" ;

const isTokenExpired = (token) => {
    try {
        if (!token) return true;
        const { exp } = jwtDecode(token);
        if (!exp) return false;
        return Date.now() >= exp * 1000;
    } catch {
        return true;
    }
};

const getInitalAuthState = () => {
    try {
        const token = localStorage.getItem("token");
        const validToken = token && !isTokenExpired(token) ? token : null;

        return {
            token:validToken,
            user: validToken ? jwtDecode(validToken) : null ,
            isAuthenticated: !!validToken,
            status: "idle",
            error: null,
        }
    } catch {
        return {
            token: null,
            user: null,
            isAuthenticated: false,
            status: "idle",
            error: null,
        }
    }
}

const initialState = getInitalAuthState();


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.status = "idle";
            state.error = null;
            try {
                localStorage.removeItem("token");
            } catch  {
                // Redux still clears the session if browser storage is blocked.
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const token = action.payload?.token;
            state.status = "succeeded";
            state.token = token;
            try {
                state.user = token ? jwtDecode(token) : null ;
            } catch {
                state.user = null;
            }
            state.isAuthenticated = Boolean(token);
            state.error = null ;
            try {
                if(token) localStorage.setItem("token", token);
            } catch {
                // This login remains usable in memory without persistence.
            }

        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
            state.isAuthenticated = false;
            state.token = null ;
            state.user = null ;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
