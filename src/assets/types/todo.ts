export type Todo = {
  id: string;
  user_id: string; 
  title: string;
  description: string | null;
  due_date: string | null;
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
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, updated: Partial<Todo>) => void;
};

export type EditTodoFormProps = {
  todo : Todo;
  onSave : (id: string, updated: Partial<Todo>) => void;
  onCancel : () => void
}
export type AddTodoFormProps = {
  onAdd: (title: string, description: string) => void
}
export type LoginFormProps = {
  onLoginSuccess: (token: string, username: string) => void
}

export type TodoListProps = {
  token: string
}
