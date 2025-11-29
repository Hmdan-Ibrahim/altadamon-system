import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useProjects } from '../projects/useProjects'
import { getVehicles } from '@/src/services/api/vehicleServices'

export const useVehicles = (capacity) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()

    let filterValue = searchParams.get("project")

    // useEffect(() => {
    //     // إذا لم يكن هناك region في الرابط، نعيّنه لأول منطقة
    //     if (!filterValue && projects.length > 0) {
    //         const newParams = new URLSearchParams(searchParams);
    //         newParams.set("project", projects[0]?.name);
    //         setSearchParams(newParams);
    //     }
    // }, [projects, filterValue, setSearchParams]);

    // filterValue = searchParams.get("project")


    const matchedProject = projects.find(p => p.name === filterValue);
    const filter = { project: matchedProject?._id, capacity };

    const { isLoading, data: vehicles = [], error } = useQuery({
        queryKey: ["vehicles", filter],
        queryFn: async () => {
            const { data } = await getVehicles(filter)
            return (data && filterValue ? data : [])
        },
        enabled: !loadingProjects && projects.length > 0, // حتى لا يُستدعى قبل تحميل المشروع
    })

    return { isLoading, vehicles, error }
}

