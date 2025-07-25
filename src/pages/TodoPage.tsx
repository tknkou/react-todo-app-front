import { useEffect } from "react";
import TodoList from "@/features/todos/modals/TodoList";
import { useTodoContext } from "@/contexts/TodoContext";
import { todo } from "node:test";

export default function TodoPage(){
  const {todos, fetchAllTodos} = useTodoContext();

  useEffect(() => {
    const fetch = async () => {
      await fetchAllTodos()
    }
    fetch()
  }, [])
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <TodoList todos={todos}/>
    </div>
  )
}