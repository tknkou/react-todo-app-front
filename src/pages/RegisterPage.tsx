import { RegisterForm } from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <RegisterForm />
        </div>
      </div>
    )
}

export default RegisterPage;