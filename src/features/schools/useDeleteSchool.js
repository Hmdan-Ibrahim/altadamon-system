import { handleError } from "@/src/services/api/api";
import { deleteSchool as deleteSchoolApi } from "@/src/services/api/schoolServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useDeleteSchool = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteSchool } = useMutation({
        mutationFn: deleteSchoolApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isDeleting, deleteSchool }
}