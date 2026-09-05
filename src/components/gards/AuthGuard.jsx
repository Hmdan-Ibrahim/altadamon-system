import { useAuth } from "@/src/hooks/useAuth"
import { Roles } from "@/src/lib/utils/Entities"
import { Navigate } from "react-router-dom"

export default function AuthGuard({ roles = [], children }) {
  const { user } = useAuth()

  return [...roles, Roles.ADMIN].includes(user.role) ? children : <Navigate to={"*"} />
}