import { handleError } from "@/src/services/api/api";
import { ApprovalOrder } from "@/src/services/api/dailyOrderServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useApprovalOrder = () => {
    const queryClient = useQueryClient();

    const { isPending: isApproval, mutate: approvalOrder } = useMutation({
        mutationFn: ApprovalOrder,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["daily-orders"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isApproval, approvalOrder }
}