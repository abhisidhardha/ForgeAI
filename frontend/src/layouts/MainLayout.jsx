/** Scrollable route content with a sidebar reveal control and a lazy-page loading boundary. */
import Button from "../components/Button";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PanelLeft } from "lucide-react";
import SuspenseLoader from "../pages/UI/SuspenseLoader";
const MainLayout = ({ collapsed, toggleCollapsed, startPeeking }) => {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = (e) => {
        setScrolled(e.currentTarget.scrollTop > 10);
    };
    return (
        <main
            onScroll={handleScroll}
            className={`flex-1 min-h-0  overflow-x-hidden overflow-y-scroll pt-[calc(var(--spacing-navbar-height)+var(--spacing-page-y))] px-(--spacing-page-x) pb-(--spacing-page-y)`}
        >
            {collapsed && (
                    <Button
                        variant=""
                        onClick={toggleCollapsed}
                        onMouseEnter={startPeeking}
                        className={`mx-4 my-5 absolute top-0 left-0 z-9999 p-2 hover:bg-ghost-hover  rounded-xl

                    ${
                        scrolled
                            ? " backdrop-blur-3xl border border-card-border shadow-sm hover:bg-ghost-hover"
                            : "bg-transparent border-transparent hover:bg-ghost-hover"
                    }`}
                    >
                        <PanelLeft size={22} />
                    </Button>
            )}
            <div className="w-full min-h-full pb-2">
                <SuspenseLoader>
                    <Outlet />
                </SuspenseLoader>
            </div>
        </main>
    );
};

export default MainLayout;
