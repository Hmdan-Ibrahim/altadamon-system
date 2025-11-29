import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProjects } from '../projects/useProjects'
import { getDailyOrdersByProject } from '@/src/services/api/dailyOrderServices'
import { useAuth } from '@/src/hooks/useAuth'

export const useDailyOrders = () => {
    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()

    const region = searchParams.get("region")
    const project = searchParams.get("project")
    const date = searchParams.get("date")

    useEffect(() => {
        if (projects.length > 0) {
            // إذا لم يوجد project بالرابط أو لا ينتمي للمنطقة المحددة
            if (!project || !projects.find(p => p.name === project)) {
                searchParams.set("project", projects[0].name)
                setSearchParams(searchParams)
            }
        } else {
            // لا توجد مشاريع => نحذف project من الرابط
            // if (searchParams.has("project")) {
            //     searchParams.delete("project")
            //     setSearchParams(searchParams)
            // }
        }
    }, [projects, region, setSearchParams])

    const matchedProject = projects.find(p => p.name === project)?._id || user?.project;
    const filter = { sendingDate: date };

    const { isLoading, data: dailyOrders = [], error } = useQuery({
        queryKey: ["daily-orders", matchedProject, filter],
        queryFn: async () => {
            const { data } = await getDailyOrdersByProject(matchedProject, filter)
            return data || []
        },
        enabled: !loadingProjects && (!!matchedProject), // حتى لا يُستدعى قبل تحميل المشروع
    })

    return { isLoading, dailyOrders, date, error }
}

