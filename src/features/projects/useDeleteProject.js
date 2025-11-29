import { handleError } from "@/src/services/api/api";
import { deleteProject as deleteProjectApi } from "@/src/services/api/projectServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteProject } = useMutation({
        mutationFn: deleteProjectApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isDeleting, deleteProject }
}