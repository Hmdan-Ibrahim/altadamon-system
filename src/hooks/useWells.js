import { useQuery } from "@tanstack/react-query"
import api from "../services/api/api"

export const useWells = () => {
    const { isLoading, data: wells, error } = useQuery({
        queryKey: ["wells"],
        queryFn: async () => {
            const { data } = await api.get(`/wells`)
            return data.data || []
        },
    })

    return { isLoading, wells, error }
}