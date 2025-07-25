import z from "zod";
import { loginParamsSchema, registerParamSchema, authResponseSchema } from "../schemas/authSchema";

const API_URL = import.meta.env.VITE_API_URL

export const login = async (params: z.infer<typeof loginParamsSchema>):Promise<z.infer<typeof authResponseSchema>> => {

  // const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

  // console.log("USE_MOCK:", USE_MOCK); // <- trueになるか？ 
  // if (USE_MOCK) {
  //   const user = mockUsers.find(
  //     (u) => u.username === params.username && u.password === params.password
  //   );
  //   if (!user) {
  //     throw new Error("Invalid username or password");
  //   }
  //   ;
  //   return {
  //     token: user.token,
  //     username: user.username,
  //   }
  // };

  const res = await fetch(`${API_URL}/login`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(params),
  });
  if(!res.ok) {
    let message = "Login failed";
    try{
      const error = await res.json();
      console.log("サーバーからのエラーレスポンス:", error); // 👈 追加
      //API側が { error: "xxx" } を返している場合
      message = error?.error || error?.message || message;
    }catch(_){
      //何もしない
    }
    throw new Error(message);
  }

  const json = await res.json()
  console.log("login API response:", json); // 👈 ここでバックエンドのレスポンス確認


const parsed = authResponseSchema.safeParse(json)
if (!parsed.success) {
  console.error("authResponseSchema validation failed", parsed.error); // 👈 検証エラー確認
  throw new Error("APIのレスポンスが不正です")
}
return parsed.data;
}

export const register = async (params: z.infer<typeof registerParamSchema>): Promise<z.infer<typeof authResponseSchema>> => {
  
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const errorData = await res.json();
    const message =
      res.status === 409
        ? "username already used"
        : errorData.message || "register failed";
    throw new Error(message);
  }

  const json = await res.json()
  console.log("サーバーからのレスポンス:", json);
  const parsed = authResponseSchema.safeParse(json)
  if (!parsed.success) {
    throw new Error("APIのレスポンスが不正です")
  }
  return parsed.data;
}