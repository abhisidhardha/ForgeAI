/** Install shared state, theme, render-error, and loading boundaries around the browser router. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/Error/ErrorBoundary.jsx";
import { store } from "./store/store.js";
import { router } from "./routes/router.jsx";
import SuspenseLoader from "./pages/UI/SuspenseLoader.jsx";
import ThemeProvider from "./components/Context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <ErrorBoundary>
                    <SuspenseLoader>
                        <RouterProvider router={router} />
                    </SuspenseLoader>
                </ErrorBoundary>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
