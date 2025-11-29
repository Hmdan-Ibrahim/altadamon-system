import { handleError } from "@/src/services/api/api";
import { updateRegion } from "@/src/services/api/regionServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useEditRegion = () => {
    const queryClient = useQueryClient();

    const { isLoading: isCrating, mutate: editRegion } = useMutation({
        mutationFn: updateRegion,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isCrating, editRegion }
}