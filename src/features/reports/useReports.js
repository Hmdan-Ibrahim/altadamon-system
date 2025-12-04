import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProjects } from '../projects/useProjects'
import { getReports } from '@/src/services/api/reportServices'
import { format } from 'date-fns'
import { StatusOrder } from '@/src/lib/utils/Entities'
import { useAuth } from '@/src/hooks/useAuth'

export const useReports = () => {

    const {user} = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()
    const [regionState, setRegoin] = useState("")
    let project = searchParams.get("project")
    let region = searchParams.get("region")
    let date = searchParams.get("date")

    const changedRegion = regionState === !region

    useEffect(() => {
        // إذا لم يكن هناك region في الرابط، نعيّنه لأول منطقة
        if ((!project || changedRegion) && projects.length) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("project", projects[0]?.name);
            newParams.set("date", new Date());
            setSearchParams(newParams);
            setRegoin(region)
        }
    }, [projects, project, setSearchParams]);

    project = searchParams.get("project")


    const matchedProject = projects.find(p => p.name === project);
    const filter = { project: matchedProject?._id || user?.project, sendingDate: date, status: StatusOrder.IMPLEMENTED };

    const { isLoading, data: reports = [], error } = useQuery({
        queryKey: ["reports", { ...filter, date: format(date, "MM yyyy") }],
        queryFn: async () => {
            const { data } = await getReports(filter)
            return (data && project ? data : [])
        },
        enabled: !loadingProjects && projects.length > 0, // حتى لا يُستدعى قبل تحميل المشروع
    })

    return { isLoading, reports, projectName: project, date, error }
}

