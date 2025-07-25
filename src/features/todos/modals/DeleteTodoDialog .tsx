import { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useDeleteTodo } from "../hooks/useTodo"

export function DeleteTodoDialog({
    todoId,
    onDelete,
    isDeleting,
}: {
    todoId: string
    onDelete: (todoId: string) => void
    isDeleting: boolean
}) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-sm px-5 bg-rose-400 hover:bg-rose-500 text-white hover:text-white"
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(true)
                    }}
                >
                    <Trash2/>
                </Button>
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>
                        本当に削除しますか？
                    </DialogTitle>
                    <DialogDescription>
                        この操作はもとに戻せません
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            await onDelete(todoId);
                            setOpen(false)
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}