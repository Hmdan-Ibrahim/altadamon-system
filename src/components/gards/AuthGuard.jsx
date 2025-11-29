import { useAuth } from "@/src/hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function AuthGuard({ roles, children }) {
  const { user } = useAuth()

  return roles.includes(user.role) ? children : <Navigate to={"*"} />
}