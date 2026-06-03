import { useAuth } from "@/src/hooks/useAuth"

export default function AuthFeature({ roles, withoutRoles, children }) {
  const { user } = useAuth()

  if (withoutRoles) return withoutRoles.includes(user.role) ? null : children

  return roles ? roles.includes(user.role) ? children : null : children
}