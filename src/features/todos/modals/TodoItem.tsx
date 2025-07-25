import { Button } from "@/components/ui/button";
import {Files} from "lucide-react" 
import { Check } from "lucide-react";
import { Undo2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DeleteTodoDialog } from "./DeleteTodoDialog ";
import type { Todo } from "../schema/TodoSchema";

const TodoItem = ({ 
  todo,
  onDeleteButton,
  onCompleteButton,
  onDuplicateButton, 
  onRestoreButton,
  onCardClick,
  isDeleting,
 }: {
  todo : Todo,
  onDuplicateButton? : (todoID: string) => void,
  onCompleteButton ? : (todoID: string) => void,
  onDeleteButton? : (todoID: string) => void,
  onRestoreButton? : (todoID : string) => void
  onCardClick: () => void
  isDeleting: boolean
 }) => {
  return (
    <Card className="
      w-full max-w-sm relative transition hover:bg-gray-100 
      active:scale-95 active:shadow-sm min-h-[100px]" 
      onClick={onCardClick}
    >
      <CardHeader>
        {onDuplicateButton && 
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 hover:bg-gray-300"
          onClick={(e)=>{
            e.stopPropagation()
            onDuplicateButton(todo.id)
          }}
        >
          {/* duplicateボタン */}
          <Files className="h-4 w-4 "/>
        </Button>
      }
        <CardTitle className="text-blue-500">
          <h3>{todo.title}</h3>
        </CardTitle>
        <CardDescription>
          <p>{todo.description}</p>
        </CardDescription>
      </CardHeader>
      {todo.dueDate && (
        <CardContent>
          <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
        </CardContent>
      )}
      <CardFooter className=" absolute bottom-2 right-2 gap-2">
        {onCompleteButton &&
          <Button
            variant="outline"
            size="sm"
            onClick={(e)=>{
              e.stopPropagation()
              onCompleteButton(todo.id)
            }}
            className="text-sm bg-green-500 text-white hover:bg-green-600 hover:text-white"
          
          >
            <Check strokeWidth={3}/>
          </Button>
        }
        {onRestoreButton &&
          <Button
            variant="outline"
            size="sm"
            onClick={(e)=>{
              e.stopPropagation()
              onRestoreButton(todo.id)
            }}
            className="text-sm bg-yellow-500 text-white hover:bg-green-600 hover:text-white"
          >
            <Undo2/>
          </Button>
        }
        {onDeleteButton &&
          <DeleteTodoDialog
            todoId={todo.id}
            onDelete={(id) => {onDeleteButton(id)}}
            isDeleting={isDeleting}
          />
        }
      </CardFooter>
    </Card>
  );
};

export default TodoItem;