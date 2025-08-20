import { useEffect, useState } from "react";
import TodoList from "@/features/todos/modals/TodoList";
import { useTodoContext } from "@/contexts/TodoContext";
import { toast } from "sonner";

export default function TodoPage(){
  const {todos, fetchAllTodos} = useTodoContext();
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      await fetchAllTodos()
    }
    fetch()
  }, [])

  useEffect(()=>{

    setShowToast(false)

    if (todos.length === 0) return; // まだ取得されていない場合は何もしない
    // 過去の期日を持つ Todo をチェック
      const pastDueTodos = todos.filter(
        (todo) => todo.dueDate && new Date(todo.dueDate) < new Date()
      );

      if (showToast === false && pastDueTodos.length > 0) {
        toast.error(
          `⚠️ 過去の期日を持つ Todo が ${pastDueTodos.length} 件あります`,{
            position: "top-center",
            duration: 4000,
            
          }
        );
        setShowToast(true);
      }
  }, [todos]);
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <TodoList todos={todos}/>
    </div>
  )
}