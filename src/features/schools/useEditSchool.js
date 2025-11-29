import { handleError } from "@/src/services/api/api";
import { updateSchool } from "@/src/services/api/schoolServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useEditSchool = () => {
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editSchool } = useMutation({
        mutationFn: updateSchool,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isEditing, editSchool }
}