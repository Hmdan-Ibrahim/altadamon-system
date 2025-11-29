import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../services/api/authServices"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export function useLogin() {
  const navigate = useNavigate()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard")
    }
  })

  return { isLoading, login }
}
