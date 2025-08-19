import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy } from 'lucide-react';
import { Trash2 } from "lucide-react";
import { Ellipsis } from 'lucide-react';
import { DeleteTodoDialog } from "./DeleteTodoDialog ";
import type { Todo } from "../schema/TodoSchema";
import { useState } from "react";

export const TodoDropDownMenu = ({
  todo,
  onDeleteButton,
  onDuplicateButton,
  isDeleting,
  
}:{
  todo : Todo,
  onDeleteButton : (todoID : string) => void,
  onDuplicateButton : (todoID : string) => void, 
  isDeleting : boolean,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 rounded-md hover:bg-gray-200 hover:text-blue-600 transition-colors"><Ellipsis /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e)=>{
          e.stopPropagation() 
          onDuplicateButton(todo.id)
        }}>
          <Copy/>Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e)=>{
          e.stopPropagation()
          setOpen(true)//ダイアログを開く
        }}>
          <Trash2 className="text-red-500 mr-2 h-4 w-4"/>Delete
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>

    <DeleteTodoDialog
      todoId={todo.id}
      onDelete={(id)=>{
        onDeleteButton(id)
        setOpen(false)
      }}
      isOpen={open}
      isDeleting={isDeleting}
      onOpenChange={setOpen}
      
    />
    </>
    
  )
}