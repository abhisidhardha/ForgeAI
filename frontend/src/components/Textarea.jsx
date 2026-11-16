import { forwardRef, useRef, useState, useCallback, useEffect } from "react";

const Textarea = forwardRef(({ error, onChange, onInput, label , value, defaultValue, ...props }, ref) => {
    const wrapperRef = useRef(null);
    const textareaRef = useRef(null);
    const [height, setHeight] = useState(80);
    const dragging = useRef(false);
    const startY = useRef(0);
    const startH = useRef(0);
    const userMinHeight = useRef(80);

    const setRefs = useCallback(
        (node) => {
            textareaRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        },
        [ref]
    );

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";

        const contentHeight = textarea.scrollHeight + 20;

        const nextHeight = Math.max(userMinHeight.current, contentHeight);
        setHeight(nextHeight);
    }, []);

    useEffect(() => {
        adjustHeight();
    }, [value, defaultValue, adjustHeight]);

    const handleInput = (e) => {
        adjustHeight();
        if (onInput) onInput(e);
    };

    const handleChange = (e) => {
        adjustHeight();
        if (onChange) onChange(e);
    };

    const onPointerDown = useCallback((e) => {
        if (e.button !== 0) return;
        dragging.current = true;
        startY.current = e.clientY;
        startH.current = wrapperRef.current ? wrapperRef.current.offsetHeight : height;
        document.body.style.userSelect = "none";

        const onMove = (e) => {
            if (!dragging.current) return;
            const delta = e.clientY - startY.current;
            const newH = Math.max(80, startH.current + delta);
            userMinHeight.current = newH;
            setHeight(newH);
        };

        const onUp = () => {
            dragging.current = false;
            document.body.style.userSelect = "";
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
    }, [height]);

    const handleDoubleClick = () => {
        userMinHeight.current = 80;
        adjustHeight();
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="">{label}</label>
            <div
                ref={wrapperRef}
                className="border-card rounded-lg overflow-hidden flex flex-col transition-[height] duration-75"
                style={{ height }}
            >

                <textarea
                    ref={setRefs}
                    {...props}
                    value={value}
                    defaultValue={defaultValue}
                    onInput={handleInput}
                    onChange={handleChange}
                    className="px-3 pt-2 w-full flex-1 outline-none resize-none bg-background text-foreground min-h-0 caret-foreground placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <div
                    onPointerDown={onPointerDown}
                    onDoubleClick={handleDoubleClick}
                    title="Drag to resize / Double-click to auto-fit"
                    className="h-5 flex items-center justify-center cursor-ns-resize group shrink-0 border-t border-foreground/5 touch-none select-none"
                >
                    <div className="flex gap-0.75 items-center pointer-events-none">
                        <span className="block w-6 h-0.5 rounded-full bg-foreground/20 group-hover:bg-foreground/50 group-active:bg-foreground/70 transition-all duration-150" />
                        <span className="block w-3 h-0.5 rounded-full bg-foreground/10 group-hover:bg-foreground/40 group-active:bg-foreground/60 transition-all duration-150" />
                    </div>
                </div>
            </div>
            {error && <p className="text-red-500 text-lg">{error}</p>}
        </div>
    );
});

export default Textarea;
