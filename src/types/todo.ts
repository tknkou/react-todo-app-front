export type Todo = {
  id: string;
  user_id: string; 
  title: string;
  description: string | null;
  due_date: string | null;
  status: "in_progress" | "completed" | "deleted";
  completed_at: string | null; 
  created_at: string;        
  updated_at: string;        
};

export type CreatedtodoDTO = {
  title: string;
  description: string | null;
  completed_at: Date | null;
}

export type TodoItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  // onToggleComplete: (id: string) => void;
  onSave : (id: string, updated: Partial<Todo>) => void;
};

export type EditTodoFormProps = {
  todo : Todo;
  onSave : (id: string, updated: Partial<Todo>) => void;
}
export type AddTodoFormProps = {
  onAdd: (title: string, description: string, dueDate: string) => void
}
// export type LoginFormProps = {
//   onLoginSuccess: (token: string, username: string) => void
// }

export type TodoListProps = {
  token: string
}

export type TodoSectionProps = {
  title: string,
  status: Todo["status"];
  todos: Todo[],
  bgColor: string,
  emptyTextColor: string,
  onDelete: (id: string) => void,
  onSave: (id: string, updated: Partial<Todo>) => void,
}
