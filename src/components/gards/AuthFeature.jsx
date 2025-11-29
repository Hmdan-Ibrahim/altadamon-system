import { useAuth } from "@/src/hooks/useAuth"

export default function AuthFeature({ roles, children }) {
  const { user } = useAuth()

  return roles ? roles.includes(user.role) ? children : null : children
}