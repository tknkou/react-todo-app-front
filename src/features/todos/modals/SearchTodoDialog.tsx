import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchTodo } from "../hooks/useTodo";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function SearchTodoDialog() {
  const {fetchAllTodos,register, handleSubmit, onSubmit, reset, setValue, control, error, errors, isSubmitting}=useSearchTodo()
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  //検索結果をリセットする関数
  const resetFormAndFetchAll = async () => {
    reset(); // フォーム初期化
    await fetchAllTodos(); // 全件取得
  };
  useEffect(()=>{
    if(open){
      reset({
        title: "",
        description: "",
        dueDate_from: undefined,
        dueDate_to: undefined,
        status: undefined
      })
      setShowCalendar(false)
    }
  }, [open, reset])
  return (
    <div className="p-4">
      <Button onClick={() => setOpen(!open)}>
        {open ? "close" : "open Search Form"}
      </Button>

      {open && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex gap-4 flex-wrap items-end"
        >
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="例: タスク名"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control} // ← useForm から取得した control を渡す
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="in_progress">進行中</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="deleted">削除済み</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="col-span-4 text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Due Date From */}
          <div>
            <Label htmlFor="dueDate_from">From</Label>
            <Input 
              id="dueDate_from" 
              type="date" 
              {...register("dueDate_from")}
            />
            {errors.dueDate_from && (
                <p className="col-span-3 text-sm text-red-500">{errors.dueDate_from.message}</p>
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
                    setValue("dueDate_from", date.toISOString().split("T")[0], { shouldValidate: true })
}
                  setShowCalendar(false);
                }}
              />
            )}
          </div>

          {/* Due Date To */}
          <div>
            <Label htmlFor="dueDate_To">To</Label>
            <Input 
              id="dueDate_to" 
              type="date" 
              {...register("dueDate_to")}
            />
            {errors.dueDate_from && (
                <p className="col-span-3 text-sm text-red-500">{errors.dueDate_from.message}</p>
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
                    setValue("dueDate_to", date.toISOString().split("T")[0], { shouldValidate: true })
}
                  setShowCalendar(false);
                }}
              />
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Searching ..." : "Search"}
            </Button>
          </div>

          {/* Reset Buttom */}
          <div>
            <Button type="button" variant="outline" onClick={resetFormAndFetchAll}>
              Reset
            </Button>
          </div>
          
          {/* エラー表示（共通） */}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}
    </div>
  );
}