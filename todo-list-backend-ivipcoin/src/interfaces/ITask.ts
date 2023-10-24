import { z } from 'zod';

const TaskZodSchema = z.object({
  title: z.string({ invalid_type_error: "Title must be a string!" })
    .min(3, { message: "Title must have min 3 characters!" }),  
  details: z.string({ invalid_type_error: "Description must be a string!" })
    .min(5, { message: "Title must have min 3 characters!" }),
  isDone: z.boolean({ invalid_type_error: "isDone must be a boolean value!" }),
});

type ITask = z.infer<typeof TaskZodSchema>;

export {
  TaskZodSchema,
  ITask
}