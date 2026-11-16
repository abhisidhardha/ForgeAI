import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import Button from "../Button";
import LiquidGlass from "../LiquidGlass/LiquidGlass";
import { Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
const Navbar = ({ className = "" }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { theme, setTheme } = useTheme();

    const [modal, setModal] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header
            className={`w-full pl-15 fixed top-4 left-0 z-50 flex justify-center px-(--spacing-page-x) ${className}`}
        >
            <LiquidGlass className="w-full max-w-4xl relative z-50">
                <div className="flex items-center justify-between px-4 py-2 gap-3">
                    <h1 className="text-lg md:text-2xl font-bold font-display tracking-tight">
                        Forge<span className="text-blue-500">.ai</span>
                    </h1>
                    {isMobile ? (
                        <div className="flex gap-3">
                            <div className="flex gap-2 justify-between items-center relative border-card rounded-3xl  overflow-hidden">
                                <span
    className={`absolute top-0 bottom-0 w-1/2 h-full rounded-full bg-blue-500 dark:bg-blue-700 transition-all duration-300 ${theme === "dark" ? "left-1/2" : "left-0"}`}
/>
                                <span
                                    className={`relative z-10 p-2 cursor-pointer transition-colors duration-300 ${theme === "light" ? "text-white" : "text-foreground/50"}`}
                                    onClick={() => setTheme("light")}
                                    aria-label="Light mode"
                                >
                                    <Sun size={16} />
                                </span>
                                <span
                                    className={`relative z-10 p-2 cursor-pointer transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-foreground/50"}`}
                                    onClick={() => setTheme("dark")}
                                    aria-label="Dark mode"
                                >
                                    <Moon size={16} />
                                </span>
                            </div>
                            <Button onClick={() => setModal((prev) => !prev)}>
                                <Menu className="w-4 h-4 aspect-square"/>
                            </Button>
                        </div>
                    ) : (
                        <div className={`flex gap-5 items-center`}>
                            <p className="font-medium text-lg ">
                                Welcome {user?.name} !
                            </p>

                            <Button
                                variant="danger"
                                className="px-3! py-1! text-base! "
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            <div className="flex gap-5 relative border-card rounded-3xl px-3 py-2 overflow-hidden">
                                <span
                                    className={`absolute top-0 w-1/2 h-full rounded-full bg-blue-400 transition-all duration-300 ${theme === "dark" ? "left-1/2 bg-blue-700" : "left-0"}`}
                                ></span>
                                <Sun
                                    className={`relative ${theme === "dark" ? "text-white/70" : "text-white"}`}
                                    size={20}
                                    onClick={() => setTheme("light")}
                                />
                                <Moon
                                    className={`relative `}
                                    size={20}
                                    onClick={() => setTheme("dark")}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </LiquidGlass>
            {modal && (
                <>
                    {/* 1. Fullscreen Backdrop: Blocks clicks behind it and closes modal on click */}
                    <div
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
                        onClick={() => setModal(false)}
                    />

                    {/* 2. Menu Box: Sits above the backdrop (z-50) */}
                    <div className="absolute top-full left-0 w-full mt-2 px-(--spacing-page-x) flex justify-center z-50">
                        <div
                            className="w-full max-w-4xl bg-background border border-card-border rounded-2xl p-4 shadow-xl transition-all duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ul className="flex flex-col gap-3">
                                <li className="font-medium text-foreground">
                                    Welcome {user?.name} !
                                </li>
                                <li
                                    onClick={() => {
                                        handleLogout();
                                        setModal(false);
                                    }}
                                    className="p-2 text-center text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer font-semibold transition-colors"
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;
