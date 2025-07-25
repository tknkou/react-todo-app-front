import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type{ ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

interface JWTPayload {
    exp: number;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem("access-token");

    if (!token) {
        console.log("トークンなし /loginへ");
        return <Navigate to="/login" replace />;
    }
    // USE_MOCK === true のときはデコードしないで通す
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return children; // 認証済みとして扱う
    }
    try {
        const decoded = jwtDecode<JWTPayload>(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            localStorage.removeItem("access-token");
            return <Navigate to="/login" replace />;
        }
    } catch (err) {
        localStorage.removeItem("access-token");
        return <Navigate to="/login" replace />;
    }
    return children
}