import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProjects } from '../projects/useProjects'
import { getDailyOrdersByProject, getOrders } from '@/src/services/api/dailyOrderServices'

export const useDailyOrders = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()

    let region = searchParams.get("region")
    let project = searchParams.get("project")
    let date = searchParams.get("date")

    useEffect(() => {
        if (projects.length > 0) {
            // إذا لم يوجد project بالرابط أو لا ينتمي للمنطقة المحددة
            if (!project || !projects.find(p => p.name === project)) {
                searchParams.set("project", projects[0].name)
                setSearchParams(searchParams)
            }
        } else {
            // لا توجد مشاريع => نحذف project من الرابط
            if (searchParams.has("project")) {
                searchParams.delete("project")
                setSearchParams(searchParams)
            }
        }
    }, [projects, region, setSearchParams])

    const matchedProject = projects.find(p => p.name === project);
    const filter = { date };

    const { isLoading, data: dailyOrders = [], error } = useQuery({
        queryKey: ["daily-orders", matchedProject?.name, filter],
        queryFn: async () => {
            const { data } = await getDailyOrdersByProject(matchedProject?._id, filter)
            return (data && project ? data : [])
        },
        enabled: !loadingProjects && projects.length > 0 && matchedProject != undefined, // حتى لا يُستدعى قبل تحميل المشروع
    })

    return { isLoading, dailyOrders, date, error }
}

