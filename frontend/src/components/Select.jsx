/** Controlled keyboard-navigable status selector; integrate with React Hook Form through Controller. */
import { useState, useEffect, useRef, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";

const Select = forwardRef(
    (
        {
            options = [],
            value,
            onChange,
            onBlur,
            error,
            label,
            name,
            disabled = false,
        },
        ref,
    ) => {
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [focusedIndex, setFocusedIndex] = useState(-1);
        const wrapperRef = useRef(null);
        const triggerRef = useRef(null);

        const selectedOption = options.find((opt) => opt.value === value);

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                    setDropdownOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const setRefs = (node) => {
            triggerRef.current = node;

            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const handleKeyDown = (e) => {
            if (disabled) return;

            if (!dropdownOpen) {
                if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                    e.preventDefault();
                    setDropdownOpen(true);
                    setFocusedIndex(
                        options.findIndex((opt) => opt.value === value) >= 0
                            ? options.findIndex((opt) => opt.value === value)
                            : 0,
                    );
                }
                return;
            }

            switch (e.key) {
                case "Escape":
                    e.preventDefault();
                    setDropdownOpen(false);
                    onBlur?.({ target: { name, value } });
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    setFocusedIndex((prev) =>
                        prev < options.length - 1 ? prev + 1 : 0,
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setFocusedIndex((prev) =>
                        prev > 0 ? prev - 1 : options.length - 1,
                    );
                    break;
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (focusedIndex >= 0 && options[focusedIndex]) {
                        onChange(options[focusedIndex].value);
                        setDropdownOpen(false);
                        onBlur?.({ target: { name, value: options[focusedIndex].value } });
                    }
                    break;
                default:
                    break;
            }
        };

        return (
            <div className="relative flex flex-col gap-1.5" ref={wrapperRef}>
                {label && (
                    <label className="text-xs font-semibold text-muted uppercase tracking-wider">
                        {label}
                    </label>
                )}

                <div
                    ref={setRefs}
                    role="combobox"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    aria-invalid={Boolean(error)}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                        if (!disabled) setDropdownOpen((prev) => !prev);
                    }}
                    onBlur={() => onBlur?.({ target: { name, value } })}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-card shadow-card p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary ${
                        disabled ? "cursor-not-allowed opacity-60" : ""
                    }`}
                >
                    <span className="text-sm font-medium">
                        {selectedOption?.label || "Select an option"}
                    </span>
                    <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 text-muted ${
                            dropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>

                {dropdownOpen && (
                    <ul
                        role="listbox"
                        className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-lg border-card bg-background shadow-lg max-h-60 overflow-y-auto"
                    >
                        {options.map((option, idx) => (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={option.value === value}
                                className={`flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                                    idx === focusedIndex
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-foreground/5"
                                } ${
                                    option.value === value ? "font-semibold text-primary" : ""
                                }`}
                                onClick={() => {
                                    if (disabled) return;
                                    onChange(option.value);
                                    setDropdownOpen(false);
                                    onBlur?.({ target: { name, value: option.value } });
                                }}
                                onMouseEnter={() => setFocusedIndex(idx)}
                            >
                                <span>{option.label}</span>
                                {option.value === value && (
                                    <Check size={16} className="text-primary shrink-0" />
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {error && <p className="text-xs text-danger font-medium">{error}</p>}
            </div>
        );
    },
);

export default Select;
