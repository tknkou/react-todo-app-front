import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatDateToYYYYMMDD } from "@/lib/utils";
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
import { toast } from "sonner";
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(todo.dueDate ? new Date(todo.dueDate) : undefined);
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const { register, handleSubmit, setValue, reset, errors, isSubmitting, onSubmit, error } = useEditTodo(todo)

  useEffect(() => {
    if (open) {
      reset({
        title: todo.title,
        description: todo.description,
        due_date: todo.dueDate ? formatDateToYYYYMMDD(todo.dueDate) : "",
        status: todo.status,
      })
      setSelectedStatus(todo.status)
      setSelectedDate(todo.dueDate ? new Date(todo.dueDate) : undefined); // ← カレンダーに渡す
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
    toast.success("Todo successflly updated ✅");
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
                value={selectedDate ? formatDateToYYYYMMDD(selectedDate) : ""}
                onClick={()=>{
                  setShowCalendar((prev)=> !prev)
                }}
                readOnly
                placeholder="Select a date"
              />
              {errors.due_date && (
                <p className="col-span-4 text-sm text-red-500">{errors.due_date.message}</p>
              )}
              {showCalendar && (
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    className="border rounded-md shadow"
                    //過去の日付を選択できないようにする
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date)
                        //yyyy-mm-ddの形に成形
                        const formatted = formatDateToYYYYMMDD(date);
                        setValue("due_date",formatted, { shouldValidate: true })
                      }
                      setShowCalendar(false);
                }}
              />
                </div>
              
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
                    <SelectItem value="in_progress">InProgress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
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
              <Button type="submit">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}