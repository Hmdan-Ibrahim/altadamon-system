import { handleError } from "@/src/services/api/api";
import { deleteOrder as deleteOrderApi } from "@/src/services/api/dailyOrderServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
        mutationFn: deleteOrderApi,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["daily-orders"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isDeleting, deleteOrder }
}