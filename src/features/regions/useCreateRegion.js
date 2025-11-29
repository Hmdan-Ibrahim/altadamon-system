import { handleError } from "@/src/services/api/api";
import { createRegion } from "@/src/services/api/regionServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateRegion = () => {
    const queryClient = useQueryClient();

    const { isLoading: isCrating, mutate: createNewRegion } = useMutation({
        mutationFn: createRegion,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isCrating, createNewRegion }
}