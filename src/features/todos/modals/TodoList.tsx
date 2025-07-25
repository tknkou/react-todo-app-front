import { TodoColumn } from "./TodoColumn";
import { useUpdateTodo } from "../hooks/useTodo";
import { useDeleteTodo } from "../hooks/useTodo";
import type { Todo } from "../schema/TodoSchema";
import { LogoutButton } from "@/shared/button/LogoutButton";
type Props = {
    todos: Todo[]
}

export default function TodoList({ todos }: Props) {
    const { useDuplicateTodo, useMoveCompleteTodo, useMoveInProgressTodo } = useUpdateTodo()
    const {handleDelete, isDeleting} = useDeleteTodo()
    const username = localStorage.getItem("username");

    return (
        <>  
            {/* ユーザー挨拶 */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center items-start pl-10 gap-2 md:px-50 mt-4">
                    <h1 className="text-lg font-semibold">Hello, {username}</h1>
                    <LogoutButton/>
                </div>

            {/* カンバンボード */}
            <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto mt-10 px-4 gap-6" >

                {/* 進行中列 */}
                <TodoColumn
                    title="InProgress"
                    status="in_progress"
                    color="bg-blue-500"
                    bgColor="bg-blue-50"
                    hoverColor="hover:bg-blue-100"
                    todos={todos.filter(t => t.status === "in_progress")}
                    count={todos.filter(t => t.status === "in_progress").length}
                    onDuplicateButton={useDuplicateTodo}
                    onCompleteButton={useMoveCompleteTodo}
                    onDeleteButton={handleDelete}
                    isDeleting={isDeleting}
                />

                {/* 完了列 */}
                <TodoColumn
                    title="Completed"
                    status="completed"
                    color="bg-green-500"
                    bgColor="bg-green-50"
                    hoverColor="hover:bg-green-100"
                    todos={todos.filter(t => t.status === "completed")}
                    count={todos.filter(t => t.status === "completed").length}
                    onDuplicateButton={useDuplicateTodo}
                    onDeleteButton={handleDelete}
                    onRestoreButton={useMoveInProgressTodo}
                    isDeleting={isDeleting}
                />

            </div>
        </>
    )
}