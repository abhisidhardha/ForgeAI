/** Compose navbar, responsive sidebar, mobile overlay, and the nested workspace content outlet. */
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import useSidebar from "../hooks/useSidebar";

import MainLayout from "./MainLayout";
const DashboardLayout = () => {
    const sidebar = useSidebar();

    return (
        <div className="relative h-screen w-screen overflow-hidden ">
            <span className="dotted-background" />

            <div className="relative z-10 flex h-full min-h-0 flex-col">
                <Navbar />

                <div className="flex min-h-0 flex-1">
                    <Sidebar {...sidebar} />
                    {!sidebar.isDesktop && sidebar.isOpen && (
                        <div
                            className="fixed inset-0 z-20 max-md:bg-linear-to-r from-background  to-transparent"
                            onClick={sidebar.endPeeking}
                        />
                    )}
                    <MainLayout {...sidebar} />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
