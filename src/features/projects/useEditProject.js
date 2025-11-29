import { handleError } from "@/src/services/api/api";
import { updateProject } from "@/src/services/api/projectServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useEditProject = () => {
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editProject } = useMutation({
        mutationFn: updateProject,
        onSuccess: (data) => {


            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isEditing, editProject }
}