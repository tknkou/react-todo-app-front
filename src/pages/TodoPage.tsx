import { useEffect, useState } from "react";
import TodoList from "@/features/todos/modals/TodoList";
import { useTodoContext } from "@/contexts/TodoContext";
import { toast } from "sonner";

export default function TodoPage(){
  const {todos, fetchAllTodos} = useTodoContext();
  const [showToast, setShowToast] = useState<boolean>(false);
  //コンポーネントのマウント時に一度だけfetchalltodosでDBからデータを取得
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
        (todo) => {
          if (!todo.dueDate) return false;
          const due = new Date(todo.dueDate);
          const today = new Date();

          today.setHours(0, 0, 0, 0);
          due.setHours(0, 0, 0, 0);

          return due < today; //機能以前なら期限切れ 
        }
      );
      if (showToast === false && pastDueTodos.length > 0) {
        toast.error( 
          //複数形に対応
          pastDueTodos.length === 1 ?
          `⚠️ You have ${pastDueTodos.length} overdue todo.`: `⚠️ You have ${pastDueTodos.length} overdue todos.` ,{
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