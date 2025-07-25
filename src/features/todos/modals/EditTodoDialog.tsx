import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditTodo } from "../hooks/useTodo";
import type{ Todo, UpdateTodoParams } from "../schema/TodoSchema";
export function EditTodoDialog({
  todo,
  open,
  onClose,
}: {
  todo: Todo
  open: boolean
  onClose: () => void
}){
  const [selectedStatus, setSelectedStatus] = useState<string>(todo.status);
  const { register, handleSubmit, setValue, reset, errors, isSubmitting, onSubmit, error } = useEditTodo(todo)

  useEffect(() => {
    if (open) {
      reset({
        title: todo.title,
        description: todo.description,
        due_date: todo.dueDate ? todo.dueDate.toISOString().split("T")[0] : "",
        status: todo.status,
      })
      setSelectedStatus(todo.status)
    }
  }, [open, todo, reset])

  const handleUpdate = async (input: UpdateTodoParams) => {
    await onSubmit({
      ...todo,
      title: input.title,
      description: input.description,
      due_date: input.due_date || undefined,
      status: input.status,
    })
    onClose() 
  }

  return  (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="grid gap-4">
            {/* Title */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <p className="col-span-4 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <p className="col-span-4 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            {/* Duedate */}
            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due date</Label>
              <Input
                id="dueDate"
                {...register("due_date")}
              />
              {errors.due_date && (
                <p className="col-span-4 text-sm text-red-500">{errors.due_date.message}</p>
              )}
            </div>

            {/* Status */}
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value: "in_progress" | "completed") => {
                  setSelectedStatus(value)
                  setValue("status", value, { shouldValidate: true })
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="deleted">削除済み</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="col-span-4 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}