import { handleError } from "@/src/services/api/api";
import { createProject } from "@/src/services/api/projectServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useRegions } from "../regions/useRegions";
import { useAuth } from "@/src/hooks/useAuth";

export const useCreateProject = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient();
    const { isLoading, regions, error } = useRegions()
    const [searchParams] = useSearchParams()
    const regionId = regions?.find(region => region.name === searchParams.get("region"))?._id || user?.region
    console.log("regionIdregionId", regionId);

    const { isLoading: isCreating, mutate: createNewProject } = useMutation({
        mutationFn: async (data) => {
            const res = await createProject({ ...data, region: regionId })
            return res
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (err) => {
            toast.error(handleError(err))
        },
    })

    return { isCreating, createNewProject }
}