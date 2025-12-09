import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/api/userServices'
import { useAuth } from './useAuth'

export const useUsers = (filters, options = {}) => {
    const { user } = useAuth()
    const { enabled = true } = options
    console.log("users filters", filters);
    if (!filters?.project) filters = { ...filters, project: user?.project }
    console.log("users filters", filters);

    const { isLoading, data: users = [], error } = useQuery({
        queryKey: ["users", filters],
        queryFn: async () => {
            const { data } = await getUsers(filters);
            return data
        },
        enabled
    })

    return { isLoading, users, error }
}