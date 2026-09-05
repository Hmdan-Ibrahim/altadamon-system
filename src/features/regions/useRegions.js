import { useAuth } from "@/src/hooks/useAuth"
import { Roles } from "@/src/lib/utils/Entities"
import { getRegions } from "@/src/services/api/regionServices"
import { useQuery } from "@tanstack/react-query"
export const useRegions = () => {
    const { user } = useAuth();
    const allowedRoles = [Roles.ADMIN, Roles.MANAGER].includes(user.role);

    if (!allowedRoles) {
        return {
            isLoading: false,
            regions: [],
            error: null
        };
    }

    const query = useQuery({
        queryKey: ["regions"],
        queryFn: async () => {
            const { data } = await getRegions();
            return data || [];
        },
        enabled: true
    });

    return {
        isLoading: query.isPending,
        regions: query.data || [],
        error: query.error
    };
};
