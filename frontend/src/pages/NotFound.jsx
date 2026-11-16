import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import Button from "../components/Button";

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-6">
            <span className="dotted-background" />

            <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
                <div className="border-card mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-surface shadow-card">
                    <Compass className="text-primary animate-pulse" size={40} />
                </div>

                <span className="font-display text-7xl font-extrabold tracking-tight text-foreground/80">
                    404
                </span>

                <h1 className="mt-2 text-5xl font-bold tracking-tight text-foreground">
                    Page not found
                </h1>

                <p className="text-muted mt-2 max-w-sm text-lg">
                    The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
                </p>

                <div className="mt-8 flex gap-4">
                    <Link to="/dashboard">
                        <Button variant="primary" className="flex items-center gap-2 px-5 py-2.5">
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                <span className="text-muted/60 font-display mt-12 text-3xl font-bold">
                    Forge<span className="text-primary">.ai</span>
                </span>
            </div>
        </div>
    );
};

export default NotFound;
