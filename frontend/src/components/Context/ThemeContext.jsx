/** Persist light/dark preference and apply the root CSS class; default to dark when no preference exists. */
import { useEffect, useState } from "react"
import { ThemeContext } from "./theme";


const getInitialTheme = () => {
    try {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
    } catch {
        // Storage can be unavailable; use the default theme for this session.
    }
    return "dark";
};

const ThemeProvider = ({children}) =>{

    const [theme,setThemeState] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement ;

        if(theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");

        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Keep the theme usable when the browser blocks persistence.
        }

    },[theme])

    const setTheme = (newTheme) => {
        setThemeState(newTheme === "light" ? "light" : "dark") ;
    }

    const toggleTheme = () => {
        setThemeState((prev) => prev === "dark" ? "light" : "dark");
    }

    return (
        <ThemeContext.Provider value={{theme , setTheme ,  toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider ;
