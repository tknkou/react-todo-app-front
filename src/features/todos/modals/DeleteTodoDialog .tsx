
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function DeleteTodoDialog({
    todoId,
    onDelete,
    isDeleting,
    isOpen,
    onOpenChange,
}: {
    todoId: string,
    onDelete: (todoId: string) => void,
    isDeleting: boolean,
    isOpen: boolean,
    onOpenChange: (open: boolean)=>void
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                        onClick={() => onOpenChange(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            await onDelete(todoId);
                            toast.success("Todo successfully deleted ✅") // 成功通知
                            onOpenChange(false)
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}