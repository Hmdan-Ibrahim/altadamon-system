import { handleError } from "@/src/services/api/api";
import { deleteVehicle as deleteVehicleApi } from "@/src/services/api/vehicleServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteVehicle } = useMutation({
        mutationFn: deleteVehicleApi,
        onSuccess: (data) => {
            toast.success("تم حذف السيارة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isDeleting, deleteVehicle }
}