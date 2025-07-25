import { z } from "zod";

export const serchTodoSchema = z.object({
  title: z.string().min(1, "title is required").max(50, "Title must be less than 50 charactars"),
  description: z.string().max(100, "Description must be less than 100 charactars").optional(),
  dueDate_from: z
    .string()
    .refine(val => val === "" || ! isNaN(Date.parse(val)),{
      message: "input date correctly",
    })
    .optional(),

  dueDate_to: z
    .string()
    .refine(val => val === "" || ! isNaN(Date.parse(val)),{
      message: "input valid date",
    })
    .optional(),

  status: z.enum(["in_progress", "completed", "deleted"])
  .optional()
  .refine(val => val !== undefined, {
    message: "select a status",
  }),

  completed: z.boolean().optional()
})

export type SearchTodoParams = z.infer<typeof serchTodoSchema>

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 charactars"),
  description: z.string().max(100, "Description must be less than 100 charactars").optional(),
  due_date: z
    .string()
    .refine(val => val === "" || !isNaN(Date.parse(val)), {
      message: "input valid date",
    })
    .optional(),

  status: z.enum(["in_progress", "completed", "deleted"], {
    message: "select a status"
  })
})

export type CreateTodoParams = z.infer<typeof createTodoSchema>

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must be less than 50 charactars").optional(),
  description: z.string().max(100, "Description must be less than 100 charactars").optional(),
  due_date: z
    .string()
    .refine(val => val === "" || !isNaN(Date.parse(val)), {
      message: "input valid date",
    })
    .optional(),

  status: z.enum(["in_progress", "completed", "deleted"])
  .optional()
  .refine(val => val !== undefined, {
    message: "select a status",
  }),
  completed_at : z
    .string()
    .refine(val => val === "" || !isNaN(Date.parse(val)), {
      message: "input valid date"
    })
    .optional(),
})

export type UpdateTodoParams = z.infer<typeof updateTodoSchema>

export const todoResponseSchema = z.object({
  id: z.string().min(1).max(50),
  user_id: z.string().min(1).max(50),
  title: z.string().min(1).max(50),
  description: z.string().max(100).nullable(),
  status: z.enum(["in_progress", "completed", "deleted"]),
  due_date: z.string().nullable(),
  completed_at: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export const todosResponseSchema = z.array(todoResponseSchema).nullable()
export type TodoResponse = z.infer<typeof todoResponseSchema>

// タスクの型定義
export interface Todo {
    id: string;
    userId: string;
    title: string;
    description?: string;
    status: "in_progress" | "completed" | "deleted";
    dueDate?: Date | null;
    completedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}