import { handleError } from "@/src/services/api/api";
import { createVehicle } from "@/src/services/api/vehicleServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createNewVehicle } = useMutation({
        mutationFn: createVehicle,
        onSuccess: (data) => {
            toast.success("تم انشاء السيارة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isCreating, createNewVehicle }
}