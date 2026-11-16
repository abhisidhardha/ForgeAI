import { SyncLoader } from "react-spinners";
import { useTheme } from "../hooks/useTheme";

const Loading = ({ message = "Loading", className = "", fullScreen = false }) => {
    const { theme } = useTheme();
    const color = theme === "dark" ? "#F8FAFC" : "#090A0C";

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
                <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl font-medium tracking-tight text-foreground">
                        {message}
                    </span>
                    <SyncLoader color={color} size={6} speedMultiplier={0.7} />
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-center py-16 w-full text-foreground ${className}`}>
            <div className="flex items-center justify-center gap-3">
                <span className="text-lg sm:text-base font-medium opacity-80">
                    {message}
                </span>
                <SyncLoader color={color} size={5} speedMultiplier={0.7} />
            </div>
        </div>
    );
};

export default Loading;
