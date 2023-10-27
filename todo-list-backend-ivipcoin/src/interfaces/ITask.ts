import { z } from 'zod';


const TaskZodSchema = z.object({
  title: z.string({ invalid_type_error: "Título deve ser um texto!" })
    .min(10, { message: "Título deve ter no mínimo 10 caracteres!" }),  
  details: z.string({ invalid_type_error: "Detalhes deve ser um texto!" })
    .min(20, { message: "Detalhes deve ter no mínimo 20 caracteres!" }),
  isDone: z.boolean(),
  userId: z.string().optional(),
  id: z.string().optional()
});

type ITask = z.infer<typeof TaskZodSchema>;

export {
  TaskZodSchema,
  ITask
}