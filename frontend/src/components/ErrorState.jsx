import { AlertCircle } from "lucide-react";

const sizeMap = {
    sm: {
        wrapper: "py-2 px-3 gap-2 flex-row rounded-lg border border-danger/30 bg-danger/10 text-left",
        iconSize: 16,
        textSize: "text-xs",
    },
    md: {
        wrapper: "py-6 px-4 gap-3 flex-col rounded-xl border border-card-border bg-danger/5 text-center",
        iconSize: 24,
        textSize: "text-sm",
    },
    lg: {
        wrapper: "py-10 px-6 gap-3 flex-col text-center",
        iconSize: 32,
        textSize: "text-base",
    },
};

const ErrorState = ({ message = "Something went wrong.", size = "md" }) => {
    const config = sizeMap[size] || sizeMap.md;

    return (
        <div className={`flex items-center justify-center ${config.wrapper}`}>
            <AlertCircle className="text-danger shrink-0" size={config.iconSize} />
            <p className={`text-danger font-medium ${config.textSize}`}>{message}</p>
        </div>
    );
};

export default ErrorState;
