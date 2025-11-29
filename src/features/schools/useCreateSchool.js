import { handleError } from "@/src/services/api/api";
import { createSchool } from "@/src/services/api/schoolServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateSchool = () => {
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createNewSchool } = useMutation({
        mutationFn: createSchool,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isCreating, createNewSchool }
}