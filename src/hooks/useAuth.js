
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/api/authServices";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useAuth() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = localStorage.user ? JSON.parse(localStorage?.user) : undefined

  const logout = async () => {
    try {
      if (isLoggingOut) return;
      setIsLoggingOut(true);

      const res = await logoutApi()

      if (localStorage.token) localStorage.removeItem("token")
      if (localStorage.user) localStorage.removeItem("user")
      queryClient.clear();

      toast.success(res.message);
      navigate("/login")
    } catch (error) {
      console.error("ERRRRRRRRRRRRRRR", error);

    } finally {
      setIsLoggingOut(false);
    }
  }

  return { isLoggingOut, user, logout }
}
