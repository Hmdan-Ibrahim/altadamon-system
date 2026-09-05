import { useAuth } from "@/src/hooks/useAuth"
import { Roles } from "@/src/lib/utils/Entities"

export default function AuthFeature({ roles = [], withoutRoles, children }) {
  const { user } = useAuth()

  if (withoutRoles) return withoutRoles.includes(user.role) ? null : children

  return [...roles, Roles.ADMIN].includes(user.role) ? children : null
}