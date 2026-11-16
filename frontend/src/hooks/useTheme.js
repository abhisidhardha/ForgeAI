import { useContext } from "react";
import { ThemeContext } from "../components/Context/theme";

/** Read the persisted theme from the provider installed in main.jsx. */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
