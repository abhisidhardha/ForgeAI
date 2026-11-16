/** Map persisted status values to UI labels and styles. Keep values aligned with taskSchema/taskService. */
const base = "text-sm md:text-lg px-2 py-1 border-2 rounded-2xl" ;

export const taskOptions = [
    {
        label : "Pending",
        value : "pending",
        className : `${base} bg-yellow-500/10  border-yellow-500/80 `,
    },
    {
        label : "In Progress",
        value : "in-progress",
        className : `${base} bg-blue-500/10 border-blue-500/80`,
    },
    {
        label : "Completed",
        value : "completed",
        className : `${base} bg-green-500/10 border-green-500/80`,
    },
]

export const getTaskByOption = (taskStatus) => {
    return taskOptions.find((option) => option.value === taskStatus)?.label || taskStatus;
}

export const getTaskClassName = (taskStatus) => {
    return taskOptions.find((option) => option.value === taskStatus)?.className || "";
}
