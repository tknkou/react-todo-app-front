import { z } from "zod";

export const loginParamsSchema = z.object({
  username: z.string().min(8, "username is required at least 8 charactars"),
  password: z.string().min(8,"password is required at least 8 charactars").max(64,"password must be less than 64 charactars"),
})

export const registerParamSchema = z.object({
  username: z.string().min(8, "username is required at least 8 charactars"),
  password: z.string().min(8,"password is required at least 8 charactars").max(64,"password must be less than 64 charactars"),
})

export const authResponseSchema = z.object({
    token: z.string(),
    username: z.string(),
})