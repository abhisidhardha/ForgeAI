/** Client project form requirements shared by create/edit forms. */
import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().trim().min(1, "Project Name is required"),
    description: z.string().trim().min(1, "Project Description is required"),
});
