
import {todosResponseSchema, todoResponseSchema } from "../schema/TodoSchema";
import type { SearchTodoParams, TodoResponse, CreateTodoParams, UpdateTodoParams,  } from "../schema/TodoSchema";
import queryString from "query-string";
import { dummyTodos } from "@/mocks/users";

const API_URL = import.meta.env.VITE_API_URL
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const todos: TodoResponse[] = dummyTodos


export const getAllTodo = async (): Promise<TodoResponse[]> =>{
  const token = localStorage.getItem("access-token")
  //モック
  if(USE_MOCK) {
    return todos
  }
  const res = await fetch(`${API_URL}/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }) 
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Get Todo list failed")
  }

  const json = await res.json()
  console.log("API response:", JSON.stringify(json, null, 2)); // ← ★ここ
  const parsed = todosResponseSchema.safeParse(json)
  if(!parsed.success) {
    throw new Error("invald API response")
  }
  return parsed.data ?? []

} 

export const getTodosWithFilters = async (params: SearchTodoParams): Promise<TodoResponse[]> => {
  const token = localStorage.getItem("access-token")
  const query = queryString.stringify(params,{
  skipEmptyString: true,
  skipNull: true,
  });
  //debug
  console.log("query:", query || "(no query params)");
  //queryの有無によってURLのパラメータを決める
  const url = query ? `${API_URL}/todos?${query}`: `${API_URL}/todos`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })

  if(!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "get todo list failed")
  }
  const json = await res.json()
  const parsed = todosResponseSchema.safeParse(json)
  if(!parsed.success) {
    throw new Error("invalid API response")
  } 

  return parsed.data ?? []

}

export const createTodo = async (params: CreateTodoParams): Promise<TodoResponse> => {
  const token = localStorage.getItem("access-token");
  // モックモードならダミー追加＆返却
  if (USE_MOCK) {
    const now = new Date().toISOString();

    const newTodo: TodoResponse = {
      id: Date.now().toString(),
      user_id: "dummy-user-id",
      title: params.title,
      description: params.description ?? null,
      status: "in_progress",
      due_date: params.due_date ?? null,
      completed_at: null,
      created_at: now,
      updated_at: now,
    };

    dummyTodos.push(newTodo); // ダミーリストに追加

    return newTodo;
  }
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(params)
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "create todo failed")
  }
  const json = await res.json()
  const parsed = todoResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error("invalid API response")
  }

  return parsed.data
}

export const updateTodo = async (todoID: string, params: UpdateTodoParams): Promise<TodoResponse> =>{
  console.log("updateTodo params:", params);
  const token = localStorage.getItem("access-token");

  if (USE_MOCK) {
    const index = dummyTodos.findIndex(todo => todo.id === todoID)
    if (index === -1) throw new Error("todo not found in mock data")

    const updated = {
      ...dummyTodos[index],
      ...params,
      updated_at: new Date().toISOString(),
    }
    dummyTodos[index] = updated
    return updated
  }

  const res = await fetch(`${API_URL}/todos/${todoID}`,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(params)
  })

  if(!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "todo update failed")
  }
  const json = await res.json()
  
  const parsed = todoResponseSchema.safeParse(json)
  if(!parsed.success) {
    throw new Error("invalid API response")
  } 

  return parsed.data
} 

export const duplicateTodo = async (todoID: string): Promise<TodoResponse> =>{
  const token = localStorage.getItem("access-token")

  if (USE_MOCK) {
    const now = new Date().toISOString();
    const original = dummyTodos.find(todo => todo.id === todoID);
    if (!original) throw new Error("todo not found in mock data");

    const duplicated: TodoResponse = {
      ...original,
      id: Date.now().toString(),
      title: original.title + "のコピー",
      due_date : null,
      created_at: now,
      updated_at: now,
    };

    dummyTodos.unshift(duplicated); // 先頭に追加（任意）
    return duplicated;
  }

  const res = await fetch(`${API_URL}/todos/${todoID}/duplicate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  if(!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "todo duplicate failed")
  }
  const json = await res.json()
  const parsed = todoResponseSchema.safeParse(json)
  if(!parsed.success) {
    throw new Error("invalid API response ")
  }

  return parsed.data
}

export const deleteTodo = async (todoID: string): Promise<void> => {
  const token = localStorage.getItem("access-token");
  //モック用
  if (USE_MOCK) {
  const index = dummyTodos.findIndex(todo => todo.id === todoID);
  if (index === -1) throw new Error("todo not found in mock data");
  dummyTodos.splice(index, 1)[0]; // 削除されたTodoを取得
  return; // TodoResponse 型のオブジェクトを返す
}

  const res = await fetch(`${API_URL}/todos/${todoID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "todo delete failed");
  }
  return;
};
