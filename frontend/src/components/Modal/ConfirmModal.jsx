/** Reusable confirmation dialog; callers own the operation, pending state, and error message. */
import { useEffect } from "react";
import Button from "../Button";
import ErrorState from "../ErrorState";
const ConfirmModal = ({
    open,
    config,
    onClose,
    onConfirm,
    isLoading = false,
    error,
}) => {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape" && !isLoading) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, isLoading, onClose]);

    if (!open) return null;

    const {
        title,
        description,
        confirmText = "Confirm",
        cancelText = "Cancel",
        variant = "primary",
    } = config;

    return (
        <div
            className="fixed  inset-0  z-50 flex items-center justify-center  backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isLoading) {
                    onClose();
                }
            }}
        >
            <div className="w-screen p-5">
                <div className="bg-background/90 max-w-lg mx-auto rounded-xl border-card">
                    <div className="border-b-3 border-foreground/10 px-5 py-3 text-xl font-semibold">
                        {title}
                    </div>
                    <div className="p-5 text-lg">
                        <p>{description}</p>
                    </div>
                    <div className="p-5 flex justify-end gap-5">
                        <Button onClick={onClose} variant="ghost" disabled={isLoading}>{cancelText}</Button>
                        <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
                            {confirmText}
                        </Button>
                    </div>
                    {error && <ErrorState message={error} />}
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
