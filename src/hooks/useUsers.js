import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/api/userServices'

export const useUsers = (filters, options = {}) => {
    const { enabled = true } = options

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