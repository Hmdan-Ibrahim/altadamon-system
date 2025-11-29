import { handleError } from "@/src/services/api/api";
import { updateOrder } from "@/src/services/api/dailyOrderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useEditOrder = () => {
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editOrder } = useMutation({
        mutationFn: updateOrder,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["daily-orders"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isEditing, editOrder }
}