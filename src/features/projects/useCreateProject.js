import { handleError } from "@/src/services/api/api";
import { createProject } from "@/src/services/api/projectServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createNewProject } = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (err) => {
            toast.error(handleError(err))
        },
    })

    return { isCreating, createNewProject }
}