import { useLogout } from "@/features/auth/hooks/useAuth";

export const LogoutButton = () => {
  const logout  = useLogout();

  return (
    <button
      onClick={logout}
      className="text-sm hover:underline border-2 p-2
 rounded hover:bg-gray-100 transition active:scale-95 font-medium
"
    >
      Logout 
    </button>
  );
};