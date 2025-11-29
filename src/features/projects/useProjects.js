import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/src/services/api/projectServices'
import { useSearchParams } from 'react-router-dom'
import { useRegions } from '../regions/useRegions'
import { useEffect } from 'react'
import { useAuth } from '@/src/hooks/useAuth'
import { Roles } from '@/src/lib/utils/Entities'

export const useProjects = () => {
    const { user } = useAuth()
    const isManagerRegionManager = [Roles.MANAGER, Roles.REGION_MANAGER].includes(user.role);

    if (!isManagerRegionManager) {
        return {
            isLoading: false,
            projects: [],
            error: null
        };
    }

    const { isLoading: loadingRegions, regions = [] } = useRegions()
    const [searchParams, setSearchParams] = useSearchParams()
    const regionParam = searchParams.get("region")

    useEffect(() => {
        // إذا لم يكن هناك region في الرابط، نعيّنه لأول منطقة
        if (!regionParam && regions.length > 0) {
            searchParams.set("region", regions[0]?.name);
            setSearchParams(searchParams);
        }
    }, [regions, regionParam, setSearchParams]);

    const activeRegionName = regionParam || regions[0]?.name;

    const activeRegion = regions?.find(r => r.name === activeRegionName);
    const filter = { region: activeRegion?._id || user.region };

    const { isLoading, data: projects = [], error } = useQuery({
        queryKey: ["projects", filter],
        queryFn: async () => {
            const { data } = await getProjects(filter)

            return data || []
        },
        enabled: !loadingRegions && (regions.length > 0 || !!user.region), // حتى لا يُستدعى قبل تحميل المناطق
    })

    return { isLoading, projects, error }
}

