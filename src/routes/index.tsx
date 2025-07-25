import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import TodoPage from "@/pages/TodoPage";
import RegisterPage from "@/pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { Navigate } from "react-router-dom";

export const AppRoutes = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/todos" element={<TodoPage/>}/>
        <Route 
          path="/" 
          element={
          <PrivateRoute>
            <Navigate to="/todos" replace />
          </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )

}


    