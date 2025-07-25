import { useState } from "react"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type{ CreateTodoParams, UpdateTodoParams, Todo } from "../schema/TodoSchema";
import { createTodoSchema, updateTodoSchema,} from "../schema/TodoSchema";
import { useTodoContext } from "@/contexts/TodoContext";

export const useCreateTodo = (onSuccess?:()=>void) =>{
  const {createTodo} = useTodoContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(createTodoSchema)
  })

  const onSubmit = async (input: CreateTodoParams) => {
    try{
      const payload = {
        ...input, 
        due_date: input.due_date? input.due_date:undefined,
      }
      await createTodo(payload)
      if(onSuccess){
        onSuccess()
      }
    }catch(err){
      setError("failed to create Todo")
    }
  }

  return {
    register,
    handleSubmit,
    setValue,
    reset,
    errors,
    isSubmitting,
    onSubmit,
    error
  }
}

export const useEditTodo = (originalTodo: Todo) => {
  const {updateTodo} = useTodoContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateTodoSchema),
  })

  const onSubmit = async (input: UpdateTodoParams) => {
    try{
      const updatedTodo: Todo = {
        ...originalTodo,
        title: input.title ?? originalTodo.title,
        description: input.description ?? originalTodo.description,
        status: input.status ?? originalTodo.status,
        dueDate: input.due_date ? new Date(input.due_date) : undefined,
        completedAt: input.completed_at ? new Date(input.completed_at) : undefined,
      }
      await updateTodo(updatedTodo)
    }catch(err){
      setError("faild to update Todo")
    }
  }

  return {
    register,
    handleSubmit,
    setValue,
    reset,
    errors,
    isSubmitting,
    onSubmit,
    error,
  }


}

export const useUpdateTodo = () => {
    const { todos, duplicateTodo, updateTodo, fetchAllTodos } = useTodoContext()
    const [error, setError] = useState<string | null>(null);

    const useDuplicateTodo = async (todoId: string) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return

        const copyTitle = `${todo.title}のコピー`

        if (copyTitle.length > 50) {
            setError("タイトルが長すぎて複製できません（最大50文字）")
            return
        }

        try {
            await duplicateTodo(todoId)
        } catch (err) {
            console.error("Todoの複製に失敗しました", err)
        }
    }

    const useMoveCompleteTodo = async (todoId: string) => {
        const todo = todos.find(t => t.id === todoId)
        if (!todo) return 

        try {
            const updatedTodo: Todo = {
              ...todo,
              status: "completed",
              completedAt: new Date(), // ← Date型として渡す
            };
            await updateTodo(updatedTodo);
            await fetchAllTodos()
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }
    const useMoveInProgressTodo = async (todoId: string) => {
      const todo = todos.find(t => t.id === todoId)
      if (!todo) return
      
      try {
            const updatedTodo: Todo = {
              ...todo,
              status: "in_progress",
              completedAt: null, 
            };
            await updateTodo(updatedTodo);
            await fetchAllTodos()
        } catch (err) {
            console.error("Todoステータス更新に失敗しました", err)
        }
    }

    return { useDuplicateTodo, error, useMoveCompleteTodo, useMoveInProgressTodo }
  }

  export const useDeleteTodo = () => {
  const { deleteTodo } = useTodoContext(); // Context から delete 関数を取得
  const [isDeleting, setIsDeleting] = useState(false); // UI用の削除中フラグ
  const [error, setError] = useState<string | null>(null); // エラーハンドリング（任意）

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteTodo(id); // 実際の削除処理（API or モック）
    } catch (err) {
      console.error("削除に失敗しました", err);
      setError("削除に失敗しました");
    } finally {
      setIsDeleting(false); // 終了後フラグを戻す
    }
  };

  return {
    handleDelete, // 呼び出し元が使う関数
    isDeleting,   // 削除中かどうか
    error         // 削除エラー（任意）
  };
};