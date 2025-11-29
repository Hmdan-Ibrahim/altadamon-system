import { handleError } from "@/src/services/api/api";
import { deleteRegion as deleteRegionApi } from "@/src/services/api/regionServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useDeleteRegion = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteRegion } = useMutation({
        mutationFn: deleteRegionApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["regions"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isDeleting, deleteRegion }
}