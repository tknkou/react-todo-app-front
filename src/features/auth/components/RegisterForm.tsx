import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export const RegisterForm = ({...props}) => {
  const {register, handleSubmit, errors, isSubmitting, onSubmit, error, usernameError} = useRegister()
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter prefferd username below to register to our service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                {...register("username")}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              {/* 2. サーバーエラー（usernameに限定） */}
              {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password"
                required
                {...register("password")}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting? "Processing now...": "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <div className="text-center text-sm">
          Do you already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">Login</Link>
        </div>
      </CardFooter>
    </Card>
  )
}




