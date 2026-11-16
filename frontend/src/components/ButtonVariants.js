const base = " font-bold text-sm lg:text-lg px-3 py-2 rounded-3xl  transition-all duration-200 active:scale-95";

export const variants = {
    base   : `${base} border-card bg-background hover:text-white hover:bg-linear-to-b from-blue-400 to-blue-600`,
    primary : `${base}  bg-linear-to-b from-blue-400 to-blue-600 text-white hover:bg-linear-to-b hover:from-blue-700 hover:to-blue-600`,
    secondary : `${base} bg-linear-to-b from-indigo-500 to-indigo-700 text-white hover:bg-linear-to-b hover:from-indigo-700 hover:to-indigo-600`,
    danger    : `${base} bg-linear-to-b from-red-500 to-red-700 text-white hover:bg-linear-to-b hover:from-red-700 hover:to-red-600`,
    ghost     : `${base} border-card bg-background`,
};
