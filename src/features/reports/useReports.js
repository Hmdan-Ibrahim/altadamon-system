import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProjects } from '../projects/useProjects'
import { getReports } from '@/src/services/api/reportServices'
import { format } from 'date-fns'
import { StatusOrder } from '@/src/lib/utils/Entities'
import { useAuth } from '@/src/hooks/useAuth'
import { groupByItems as groupByItems } from "./SelectGroupBy"

export const useReports = () => {

    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()
    const [regionState, setRegoin] = useState("")
    let project = searchParams.get("project")
    let region = searchParams.get("region")
    let date = searchParams.get("date")
    let groupBy = searchParams.get("groupBy")
    let ordersType = searchParams.get("orders-type")

    const changedRegion = regionState === !region

    useEffect(() => {
        if ((!project || changedRegion) && projects.length) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("project", projects[0]?.name);
            newParams.set("date", new Date());
            setSearchParams(newParams);
            setRegoin(region)
        }
    }, [projects, project, setSearchParams]);

    project = searchParams.get("project")

    groupBy = groupByItems.find(g => g.label === groupBy)?.key || "transporter"
    const matchedProject = projects.find(p => p.name === project)?._id || user?.project;
    const filter = { project: matchedProject, sendingDate: date, status: StatusOrder.IMPLEMENTED, groupBy, ordersType };

    const { isLoading, data: reports = [], error } = useQuery({
        queryKey: ["reports", { ...filter, sendingDate: '', date: format(date, "MM yyyy") }],
        queryFn: async () => {
            const { data } = await getReports(filter)
            return data || []
        },
        enabled: !loadingProjects && (!!matchedProject),
    })

    return { isLoading, reports, projectName: project, date, error }
}

