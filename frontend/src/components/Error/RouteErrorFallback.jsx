/** Fallback for errors handled by React Router rather than page-level request states. */
import { useRouteError } from "react-router-dom";
import Button from "../Button";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

const RouteErrorFallback = () => {
    const error = useRouteError();

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-background p-6">
            <span className="dotted-background" />
            <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg w-full border-card rounded-2xl bg-card/80 backdrop-blur-md p-8 shadow-card">
                <div className="h-16 w-16 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                    <AlertOctagon size={36} />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Application Error
                    </h1>
                    <p className="text-sm text-muted">
                        An unexpected runtime error occurred while rendering this page.
                    </p>
                </div>

                {(error?.message || error?.statusText) && (
                    <div className="w-full text-left bg-surface-secondary border border-card-border rounded-xl p-4 text-xs font-mono text-danger break-words max-h-36 overflow-y-auto">
                        {error.message || error.statusText}
                    </div>
                )}

                <div className="flex flex-wrap gap-3 justify-center w-full pt-2">
                    <Button
                        variant="primary"
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw size={16} /> Try Again
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => window.location.assign("/dashboard")}
                        className="flex items-center gap-2 border-card"
                    >
                        <Home size={16} /> Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RouteErrorFallback;
