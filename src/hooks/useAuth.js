
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../services/api/authServices";
import toast from "react-hot-toast";

export function useAuth() {
  const navigate = useNavigate()
  const user = localStorage.user ? JSON.parse(localStorage?.user) : undefined

  const logout = async () => {
    try {
      const res = await logoutApi()
      toast.success(res.message);

      if (localStorage.token) localStorage.removeItem("token")
      if (localStorage.user) localStorage.removeItem("user")

      navigate("/login")
    } catch (error) {
      console.log("ERRRRRRRRRRRRRRR", error);

    }
  }

  return { user, logout }
}
