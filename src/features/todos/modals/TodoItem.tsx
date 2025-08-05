import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Undo2 } from 'lucide-react';
import { TodoDropDownMenu } from "./DropdownMenu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <div className="absolute top-2 right-5 z-10">
          <TodoDropDownMenu
          todo={todo}
          onDuplicateButton={onDuplicateButton!}
          onDeleteButton={onDeleteButton!}
          isDeleting={isDeleting}
        />
        </div>
        
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
            className="text-sm bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
          >
            <Undo2/>
          </Button>
        }
      </CardFooter>
    </Card>
  );
};

export default TodoItem;