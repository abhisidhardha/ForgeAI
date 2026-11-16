import { InboxIcon } from "lucide-react";

const EmptyState = ({ title = "No items found", description, children, icon: Icon = InboxIcon }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center border-2 border-dashed border-card-border rounded-2xl bg-card/20">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <Icon size={28} />
            </div>
            <div className="max-w-md flex flex-col gap-1.5">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">{title}</h2>
                {description && <p className="text-muted text-sm leading-relaxed">{description}</p>}
            </div>
            {children && <div className="pt-2">{children}</div>}
        </div>
    );
};

export default EmptyState;
