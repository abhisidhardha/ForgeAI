/** Coordinate desktop collapse and temporary peek/drawer visibility for the shared workspace layout. */
import { useEffect,useRef,useState } from "react";

const useSidebar = () => {
    const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1024);
    const [isPeeking, setIsPeeking] = useState(false);
    const [isDesktop,setIsDesktop] = useState(() => window.innerWidth >= 1024);
    const peekTimeout = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth > 1024 ;
            setIsDesktop(desktop);
            if(!desktop) setCollapsed(true);
        }
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
        },[])

        const isOpen = isDesktop ? !collapsed || isPeeking : isPeeking ;

        return {
        collapsed,
        isPeeking,
        isDesktop ,
        isOpen,
        toggleCollapsed: () => {
            if(!isDesktop){
                setIsPeeking(true);
                return ;
            }
            setCollapsed(c => !c)
        },
        startPeeking: () => {
            clearTimeout(peekTimeout.current);
            setIsPeeking(true);
        },
        endPeeking: () => {
            peekTimeout.current = setTimeout(() => setIsPeeking(false), 100);
        },
    };
};

export default useSidebar;
