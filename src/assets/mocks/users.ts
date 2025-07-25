// mocks/users.ts
export const mockUsers = [
  {
    username: "kohei",
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