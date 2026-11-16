import { NavLink } from "react-router-dom";
import { PanelLeft } from "lucide-react";
import Button from "../Button";

const Sidebar = ({
    collapsed,
    isPeeking,
    isDesktop,
    isOpen,
    toggleCollapsed,
    endPeeking,
    startPeeking,
}) => {
    return (
        <aside
            onMouseEnter={startPeeking}
            onMouseLeave={endPeeking}
            className={`
        top-0 z-30 h-full overflow-hidden pt-[calc(var(--spacing-navbar-height)+1rem)]

        ${isOpen ? "w-64 px-2 pb-2" : "w-0 p-0"}

        ${isDesktop ? "sticky" : "fixed left-0 bottom-0 "}
      `}
        >
            <nav
                className={`flex flex-col justify-center h-full   rounded-2xl  dashed-border ${!collapsed ? "solid" : ""} ${collapsed && isPeeking ? "bg-background backdrop-blur-xl " : "bg-background"}  gap-3 px-4 text-heading font-bold tracking-tight shadow-card`}
            >
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `bg-linear-to-b from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 p-2 relative rounded-2xl transition-all duration-300 flex justify-start items-end
                        ${isActive ? ` h-40 text-white` : `h-25 text-black hover:text-white/80`}`
                    }
                >
                    {({ isActive }) => (
                        <span className="flex items-center gap-2">
                            Dashboard
                            {isActive && (
                                <span className="absolute text-5xl leading-none right-2 bottom-1">
                                    .
                                </span>
                            )}
                        </span>
                    )}
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `bg-linear-to-b from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 p-2 relative rounded-2xl transition-all duration-300 flex justify-start items-end
                        ${isActive ? `text-white/90 h-40` : `h-25 text-black hover:text-white/50`}`
                    }
                >
                    {({ isActive }) => (
                        <span className="flex gap-2">
                            Projects
                            {isActive && (
                                <span className="absolute text-5xl leading-none right-2 bottom-1">
                                    .
                                </span>
                            )}
                        </span>
                    )}
                </NavLink>
                {collapsed && !isPeeking ? (
                    <Button
                        className="p-2  hover:bg-ghost-hover  rounded-xl"
                        onClick={() => {
                            if (!isDesktop) toggleCollapsed();
                            endPeeking();
                        }}
                        onMouseEnter={startPeeking}
                    >
                        <PanelLeft size={22} />
                    </Button>
                ) : (
                    !collapsed &&
                    isDesktop && (
                        <Button
                            variant="ghost"
                            className="absolute bottom-5 right-5 p-2  hover:bg-ghost-hover  rounded-xl"
                            onClick={() => {
                                toggleCollapsed();
                                endPeeking();
                            }}
                        >
                            <PanelLeft size={22} />
                        </Button>
                    )
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
