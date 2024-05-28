import { z } from "zod";


export const todoInput = z.string({
    required_error: "allfields required",

}).min(1).max(50);


export const toggleeInput = z.object({
    id: z.string().uuid("Invalid ID format"),
    done: z.boolean(),
  });
