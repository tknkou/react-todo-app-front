import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

// 新しいタスク追加ボタン
export function NewTodoButton({ onClick, className }: { onClick: any,  className?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "py-3 text-black rounded-lg mt-3",className
            )}
        >
        <Plus className="h-4 w-4 mr-2 ml-2" />  
        </button>
    )
}