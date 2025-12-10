import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProjects } from '../projects/useProjects'
import { getSchools } from '@/src/services/api/schoolServices'
import { useAuth } from '@/src/hooks/useAuth'
import { Roles } from '@/src/lib/utils/Entities'

export const useSchools = () => {
    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()

    const regionParam = searchParams.get("region")
    const projectParam = searchParams.get("project")

    useEffect(() => {
        if (projects.length > 0) {
            // إذا لم يوجد project بالرابط أو لا ينتمي للمنطقة المحددة
            if (!projectParam || !projects.find(p => p.name === projectParam)) {
                // const newParams = new URLSearchParams(searchParams)
                searchParams.set("project", projects[0].name)
                setSearchParams(searchParams)
            }
        } else {
            // لا توجد مشاريع => نحذف project من الرابط
            // const newParams = new URLSearchParams(searchParams)
            // if (searchParams.has("project")) {
            //     searchParams.delete("project")
            //     setSearchParams(searchParams)
            // }
        }
    }, [projects, regionParam, setSearchParams])

    const matchedProject = projects.find(p => p.name === projectParam)?._id || user.project;
    const filter = { project: matchedProject, supervisor: user.role == Roles.SUPERVISOR ? user._id : undefined };

    const { isLoading, data: schools = [], error } = useQuery({
        queryKey: ["schools", filter],
        queryFn: async () => {
            const { data } = await getSchools(filter)
            return data || []
        },
        enabled: !loadingProjects && (!!matchedProject), // حتى لا يُستدعى قبل تحميل المشروع
    })

    return { isLoading, schools, error }
}

