import { useAuth } from "@/src/hooks/useAuth"
import { Roles } from "@/src/lib/utils/Entities"
import { getRegions } from "@/src/services/api/regionServices"
import { useQuery } from "@tanstack/react-query"
export const useRegions = () => {
    const { user } = useAuth();
    const isManager = user.role === Roles.MANAGER;

    // إذا لم يكن مدير → لا تُشغّل useQuery أبدًا
    if (!isManager) {
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
        isLoading: query.isLoading,
        regions: query.data || [],
        error: query.error
    };
};
