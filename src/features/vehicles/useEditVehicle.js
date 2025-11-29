import { handleError } from "@/src/services/api/api";
import { updateVehicle } from "@/src/services/api/vehicleServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useEditVehicle = () => {
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate: editVehicle } = useMutation({
        mutationFn: updateVehicle,
        onSuccess: (data) => {
            toast.success("تم تعديل بيانات السيارة بنجاح");
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isEditing, editVehicle }
}