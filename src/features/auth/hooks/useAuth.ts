import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginParamsSchema, registerParamSchema } from "../schemas/authSchema";
import { login, register as registerUser } from "../service/authService";
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  const{
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(loginParamsSchema),
  })

  const onSubmit = async (input: z.infer<typeof loginParamsSchema>) => {
    console.log("ログイン処理開始");
    try {
      console.log("username:", input.username, "password:", input.password); // ← ログ出力
      const result = await login(input)
      console.log("ログイン成功");
      localStorage.setItem("access-token", result.token)
      localStorage.setItem("username", result.username)
      console.log("navigate開始"); 
      navigate("/todos");
    }catch(err) {
      console.log("エラーメッセージ:", err instanceof Error ? err.message : err);
      if(err instanceof Error){
        if (err.message.includes("not found")){
          setError("User is not registered.");
        }else if (err.message.includes("Incorrect password")){
          setError("Pasword is incorrect."); 
        }else{
          setError("Login failed.");  
        }
      }
    }
  }
  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    error,
  }
}

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerParamSchema>>({
    resolver: zodResolver(registerParamSchema),
  });

  const handleSuccess = (results: { token: string; username: string }) => {
    console.log("成功レスポンス:", results);
    localStorage.setItem("access-token", results.token);
    localStorage.setItem("username", results.username);
    navigate("/todos");
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      if (err.message.includes("username")) {
        setUsernameError(err.message);
        setError(null);
      } else {
        setUsernameError(null);
        setError("register failed");
      }
    } else {
      setUsernameError(null);
      setError("unknown error occurred");
    }
  };

  const onSubmit = async (input: z.infer<typeof registerParamSchema>) => {
    try {
      const results = await registerUser(input);
      handleSuccess(results);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    error,
    usernameError,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("username");
    //ログインページにリダイレクト
    navigate("/login");
  }
  return logout;
}