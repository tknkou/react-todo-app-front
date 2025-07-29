import { useState, useEffect } from "react";
import type { Todo } from "../schema/TodoSchema";
import { CreateTodoSheet } from "./CreateTodoSheet";
import { EditTodoDialog } from "./EditTodoDialog";
import { NewTodoButton } from "@/shared/button/NewTodoButton";
import { cn } from "@/lib/utils";
import TodoItem from "./TodoItem";

type Props = {
  title: string;
  status: "in_progress" | "completed";
  color: string;
  bgColor: string;
  hoverColor: string;
  todos: Todo[];
  count: number;
  onDuplicateButton: (todoId: string) => void;
  onCompleteButton?: (todoId: string) => void;
  onDeleteButton?: (todoId: string) => void;
  onRestoreButton?: (todoId: string) => void;
  isDeleting: boolean;
};

export function TodoColumn({
  title,
  status,
  color,
  bgColor,
  hoverColor,
  todos,
  count,
  onDuplicateButton,
  onCompleteButton,
  onDeleteButton,
  onRestoreButton,
  isDeleting,
}: Props) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  useEffect(() => {
    console.log(`[${title}] todos:`, todos);
  }, [todos]);

  const handleCardClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseDialog = () => {
    setSelectedTodo(null);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    } else if (a.dueDate) {
      return -1;
    } else if (b.dueDate) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className={cn("flex flex-col w-full min-w-[320px] max-w-[90vw] md:w-1/3 rounded-lg min-h-[500px] mx-4 mb-4 md:mb-0", bgColor)}>
      {/* ラベル部分 */}
      <div className="flex justify-center mb-2 pb-5 pt-3">
        <div className="flex items-center mx-5 space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h2 className="font-medium">{title}</h2>
          <span className="text-gray-500 ml-2">{count}</span>
        </div>
        <CreateTodoSheet
          trigger={<NewTodoButton onClick={() => {}} className={cn(hoverColor)} />}
          status={status}
        />
      </div>

      {/* タスク一覧 or 空の状態 */}
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 py-10 px-6">
          <p className="text-lg font-medium">まだタスクがありません</p>
          <p className="text-sm mt-2">右上の <span className="font-semibold">＋</span> ボタンからタスクを追加しましょう</p>
        </div>
      ) : (
        sortedTodos.map((todo) => (
          <div key={todo.id} className="w-full max-w-sm  mx-auto pb-4 px-4">
            <TodoItem
              todo={todo}
              onDuplicateButton={onDuplicateButton}
              onCompleteButton={onCompleteButton}
              onDeleteButton={onDeleteButton}
              onRestoreButton={onRestoreButton}
              isDeleting={isDeleting}
              onCardClick={() => handleCardClick(todo)}
            />
          </div>
        ))
      )}

      {/* 編集ダイアログ */}
      {selectedTodo && (
        <EditTodoDialog
          todo={selectedTodo}
          open={!!selectedTodo}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}