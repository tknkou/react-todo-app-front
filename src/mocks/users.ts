// mocks/users.ts

import type { TodoResponse } from "@/features/todos/schema/TodoSchema";
export const mockUsers = [
  {
    username: "kohei1234",
    password: "password123", // ※ 実際のアプリでは平文はNG！
    token: "mock-token-kohei",
    user_id: "mock-user-id-kohei",
  },
  {
    username: "admin",
    password: "adminpass",
    token: "mock-token-admin",
    user_id: "mock-user-id-admin",
  },
];


// ダミーデータ
export const dummyTodos: TodoResponse[] = [
  {
    id: "1",
    user_id: "mock-user-id-kohei",
    title: "勉強タスク",
    description: "Zod型定義のテスト用です",
    status: "in_progress",
    due_date: "2025-07-31T23:59:59.000Z",
    completed_at: null,
    created_at: "2025-07-19T10:00:00.000Z",
    updated_at: "2025-07-19T10:00:00.000Z",
  },
  {
    id: "2",
    user_id: "mock-user-id-kohei",
    title: "レビュー依頼対応",
    description: null,
    status: "completed",
    due_date: "2025-07-15T18:00:00.000Z",
    completed_at: "2025-07-15T17:00:00.000Z",
    created_at: "2025-07-10T09:00:00.000Z",
    updated_at: "2025-07-15T17:00:00.000Z",
  },
  {
    id: "3",
    user_id: "mock-user-id-admin",
    title: "管理者レポート提出",
    description: "週次レポート",
    status: "in_progress",
    due_date: null,
    completed_at: null,
    created_at: "2025-07-01T08:30:00.000Z",
    updated_at: "2025-07-12T14:00:00.000Z",
  },
  {
    id: "4",
    user_id: "mock-user-id-admin",
    title: "DBリファクタリング",
    description: null,
    status: "in_progress",
    due_date: "2025-08-01T00:00:00.000Z",
    completed_at: null,
    created_at: "2025-07-17T12:00:00.000Z",
    updated_at: "2025-07-18T09:00:00.000Z",
  },
  {
    id: "5",
    user_id: "mock-user-id-kohei",
    title: "面談資料作成",
    description: "次回ミーティング用",
    status: "completed",
    due_date: "2025-07-20T15:00:00.000Z",
    completed_at: "2025-07-19T16:30:00.000Z",
    created_at: "2025-07-16T11:00:00.000Z",
    updated_at: "2025-07-19T16:30:00.000Z",
  },
];