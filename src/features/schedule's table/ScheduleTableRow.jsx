import { Button } from '@/src/components/ui/button'
import { TableCell, TableRow } from '@/src/components/ui/table'
import { format } from 'date-fns';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useCreateOrder as useCreateOrders } from '../daily-orders/useCreateOrder';
import { useCreateSchool } from '../schools/useCreateSchool';
import { useProjects } from '../projects/useProjects';
import { useUsers } from '@/src/hooks/useUsers';
import { Roles } from '@/src/lib/utils/Entities';

function ScheduleTableRow({ schoolId, date, Days, report, index }) {
    const { projects, error } = useProjects()
    const { loading, createNewOrder: createNewOrders } = useCreateOrders()
    const [searchParams] = useSearchParams()
    const projectId = projects?.find(project => project.name === searchParams.get("project"))?._id
    const { users: supervisors } = useUsers({ project: projectId, role: Roles.SUPERVISOR })
    const { isCreating, createNewSchool } = useCreateSchool();

    const { school, district, neighborhood, ministerialNumber, supervisor, sex } = report
    let dailyOrders = [];

    const DaysCapacity = Days.map(day => {
        if (report[day]) {
            const dayDate = new Date(date).setDate(day)
            dailyOrders.push({ day: format(dayDate, "yyyy-MM-dd"), capacity: report[day] })
            return <TableCell key={day}>{report[day]}</TableCell>
        }
        return <TableCell>-</TableCell>
    })

    const handleSave = () => {
        const finalResult = dailyOrders.map(day => ({ school: schoolId, RequiredCapacity: day.capacity, sendingDate: new Date(day.day) }))
        createNewOrders(finalResult);
    }

    const handleCreate = () => {
        createNewSchool({ name: school, district, neighborhood, ministerialNumber, supervisor, sex });
    }

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell className=" text-start min-w-40">{school}</TableCell>
            <TableCell>{district}</TableCell>
            <TableCell>{neighborhood}</TableCell>
            <TableCell>{sex}</TableCell>
            <TableCell>{supervisors?.find(supervisorid => supervisorid._id == supervisor)?.name}</TableCell>
            <TableCell>{ministerialNumber}</TableCell>
            {DaysCapacity}
            <TableCell>
                <Button type="submit" disabled={loading} onClick={handleSave}>حفظ</Button>
            </TableCell>
            {!schoolId &&
                <TableCell>
                    <Button type="submit" disabled={isCreating} onClick={handleCreate}>إضافة مدرسة</Button>
                </TableCell>
            }
        </TableRow>
    )
}

export default ScheduleTableRow