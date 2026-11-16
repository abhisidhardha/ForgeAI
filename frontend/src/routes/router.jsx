/** Public entry/auth routes and protected workspace routes. Feature pages are loaded lazily. */
import { lazy } from "react";

import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../pages/Landing/Landing";
import NotFound from "../pages/NotFound";
import PublicRoute from "./PublicRoute";
import RouteErrorFallback from "../components/Error/RouteErrorFallback";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetails = lazy(() => import("../pages/Project/ProjectDetails"));
const CreateProjectForm = lazy(
    () => import("../pages/Project/CreateProjectForm"),
);

export const router = createBrowserRouter([
    {
        element: <Landing />,
        path: "/",
        errorElement: <RouteErrorFallback />,
    },
    {
        element: <PublicRoute />,
        errorElement: <RouteErrorFallback />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
    {
        element: <ProtectedRoute />,
        errorElement: <RouteErrorFallback />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "/dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "/projects",
                        element: <Projects />,
                    },
                    {
                        path: "/createProject",
                        element: <CreateProjectForm />,
                    },
                    {
                        path: "/projects/:projectId",
                        element: <ProjectDetails />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
