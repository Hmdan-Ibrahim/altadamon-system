import { useQuery } from "@tanstack/react-query"
import api from "../services/api/api"

export const useWells = (projectID) => {
    const { isLoading, data: wells, error } = useQuery({
        queryKey: ["wells", projectID],
        queryFn: async () => {
            const { data } = await api.get(`/wells`, {
                params: {
                    project: projectID
                }
            })
            return data.data || []
        },
        enabled: !!projectID,
    })

    return { isLoading, wells, error }
}