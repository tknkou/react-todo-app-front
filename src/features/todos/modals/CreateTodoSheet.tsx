import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateTodo } from "../hooks/useTodo"
import { toast } from "sonner"
export function CreateTodoSheet({
  trigger,
  status,
}: {
  trigger: React.ReactNode,
  status: "in_progress" | "completed"
}){
  const [selectedStatus, setSelectedStatus] = useState<string>(status);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [open, setOpen] = useState(false); 
  const {register, handleSubmit, setValue, reset, errors, isSubmitting, onSubmit, error} = useCreateTodo(() => {
    toast.success("Todo successfully created ✅");
    setOpen(false);
  })

  useEffect(()=>{
    if(open) {
      reset({
        title: "",
        description: "",
        due_date: undefined,
        status: status
      })
      setSelectedStatus(status)
      setShowCalendar(false)
    }
  }, [open, status, reset])

  return (
    //sheetを閉じたらセットされている値を空にする.
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Todo</SheetTitle>
          <SheetDescription>
            Create new todo here. Title and status must be filled and Description & DueDate are optional
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            {/* Title */}
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")}/>
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
          {/* Due Date */}
          <div className="grid gap-3">
            <Label htmlFor="due_date">Due Date</Label>
            <Input 
              id="due_date" 
              type="date" 
              {...register("due_date")}
            />
            {errors.due_date && (
                <p className="col-span-3 text-sm text-red-500">{errors.due_date.message}</p>
            )}
            {showCalendar && (
              <Calendar
                mode="single"
                className="border rounded-md shadow"
                //過去の日付を選択できないようにする
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                onSelect={(date) => {
                  if (date) {
                    //yyyy-mm-ddの形に成形
                    setValue("due_date", date.toISOString().split("T")[0], { shouldValidate: true })
}
                  setShowCalendar(false);
                }}
              />
            )}
          </div>
          {/* status */}
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
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* エラーメッセージ */}
              {errors.status && (
                <p className="col-span-4 text-sm text-red-500">{errors.status.message}</p>
              )}
          </div>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <SheetFooter>
          <Button type="submit"
          >{isSubmitting ? "Creating..." : "Create"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )

}