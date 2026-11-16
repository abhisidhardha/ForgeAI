/** Client task form requirements and persisted status enum shared by create/edit forms. */
import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().trim().min(1, "Task Title is required"),
    description: z.string().trim().min(1, "Task Description is required"),
    status: z.enum(["in-progress", "pending", "completed"]),
});
