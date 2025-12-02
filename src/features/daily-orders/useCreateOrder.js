import { handleError } from "@/src/services/api/api";
import { createOrder } from "@/src/services/api/dailyOrderServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    // const date = 

    const { isLoading: isEditing, mutate: createNewOrder } = useMutation({
        mutationFn: createOrder,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["daily-orders"] });
        },
        onError: (err) => toast.error(handleError(err)),
        // enabled: false
    })

    return { isEditing, createNewOrder }
}