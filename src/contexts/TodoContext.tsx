import { createContext, useContext, useState } from "react"
import type{ Todo, SearchTodoParams, CreateTodoParams, TodoResponse, UpdateTodoParams} from "../features/todos/schema/TodoSchema"
import { getAllTodo, getTodosWithFilters, createTodo as createTodoAPI, updateTodo as updateTodoAPI, duplicateTodo as duplicateTodoAPI, deleteTodo as deleteTodoAPI} from "@/features/todos/service/todoService"

interface TodoContextType {
  todos: Todo[]
  fetchAllTodos: () => Promise<void>
  fetchTodosWithFilters: (params: SearchTodoParams) => Promise<void>
  createTodo: (newTodo: CreateTodoParams) => Promise<void>
  updateTodo: (updatedTodo: Todo) => Promise<void>
  duplicateTodo: (todoId: string) => Promise<void>
  deleteTodo: (todoId: string) => Promise<void>
  isLoading: boolean; 
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchAllTodos = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTodo()
      const todos = response.map(convertToTodo)
      setTodos(todos)
    } catch (error) {
      console.error("Todoの取得に失敗しました", error)
    }finally{
      setIsLoading(false);
    }
  }

  const fetchTodosWithFilters = async (params: SearchTodoParams) => {
    try {
      const response = await getTodosWithFilters(params)
      const todos = response.map(convertToTodo)
      setTodos(todos)
    } catch (error) {
      console.error("Todoの取得に失敗しました", error)
    }
  }

  const createTodo = async (params: CreateTodoParams) => {
    try {
      const response = await createTodoAPI(params)
      const newTodo = convertToTodo(response)
      setTodos((prev) => [...prev, newTodo])
    } catch (error) {
      console.error("Todoの作成に失敗しました", error)
    }
  }

  const updateTodo = async (updatedTodo: Todo) => {
    const todoId = updatedTodo.id
    const params: UpdateTodoParams = {
      title:updatedTodo.title.trim(),
      description: updatedTodo.description?.trim() ?? undefined,
      due_date: updatedTodo.dueDate ? updatedTodo.dueDate.toISOString().slice(0, 10) : undefined,
      status: updatedTodo.status,
      completed_at: updatedTodo.completedAt ? updatedTodo.completedAt.toISOString().slice(0, 10) : undefined,
    }
    try {
      const response = await updateTodoAPI(todoId, params)
      const newTodo = convertToTodo(response)
      setTodos((prev) =>
        prev.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
      )
    } catch (error) {
      console.error("Todoの更新に失敗しました", error)
    }
  }

  const duplicateTodo = async (todoId: string) => {
    try {
      const response = await duplicateTodoAPI(todoId);
      const duplicatedTodo = convertToTodo(response);
      setTodos((prev) => [...prev, duplicatedTodo]);
    } catch (error) {
      console.log("duplication error", error);
      console.error("Todoの複製に失敗しました", error);
      throw error; // ← ここで再スロー
    }
  };
  const deleteTodo = async (todoId: string) => {
    try {
      await deleteTodoAPI(todoId);
      setTodos((prev) => prev.filter((todo)=>todo.id !== todoId));
    }catch(error){
      console.error("Todoの削除に失敗しました。", error)
    }
  }

  return (
    <TodoContext.Provider value={{ todos, fetchAllTodos, fetchTodosWithFilters, createTodo, updateTodo, duplicateTodo, deleteTodo, isLoading }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = (): TodoContextType => {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error("useTodoContext must be used within a TodoProvider")
  return ctx
}

const convertToTodo = (res: TodoResponse): Todo => {
  return {
    id: res.id,
    userId: res.user_id,
    title: res.title,
    description: res.description ?? undefined,
    status: res.status,
    dueDate: res.due_date ? new Date(res.due_date) : undefined,
    completedAt: res.completed_at ? new Date(res.completed_at) : undefined,
    createdAt: new Date(res.created_at),
    updatedAt: new Date(res.updated_at),
  }
}