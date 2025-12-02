import { handleError } from "@/src/services/api/api";
import { createSchool } from "@/src/services/api/schoolServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useProjects } from "../projects/useProjects";
import { useAuth } from "@/src/hooks/useAuth";

export const useCreateSchool = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient();

    const [searchParams] = useSearchParams()
    const { projects, error } = useProjects()
    const projectId = projects?.find(project => project.name === searchParams.get("project"))?._id || user?.project
    console.log("projectIdprojectId", projectId);


    const { isLoading: isCreating, mutate: createNewSchool } = useMutation({
        mutationFn: async (data) => {
            const res = await createSchool({ ...data, project: projectId })
            return res
        },
        onSuccess: (data) => {
            console.log("data", data);

            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["schools"] });
        },
        onError: (err) => toast.error(handleError(err)),
    })

    return { isCreating, createNewSchool }
}