import { Button } from '@/src/components/ui/button'
import { TableCell, TableRow } from '@/src/components/ui/table'
import { format } from 'date-fns';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useCreateOrder as useCreateOrders } from '../daily-orders/useCreateOrder';
import { useCreateSchool } from '../schools/useCreateSchool';

function ScheduleTableRow({ schoolId, date, Days, report, index }) {
    const { loading, createNewOrder: createNewOrders } = useCreateOrders()
    const { isCreating, createNewSchool } = useCreateSchool();

    const { school, numOfReplaies } = report
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
        createNewSchool({ name: school });
    }

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell className=" text-start min-w-40">{school}</TableCell>
            <TableCell>{numOfReplaies}</TableCell>
            {DaysCapacity}
            <TableCell>
                <Button type="submit" disabled={loading} onClick={handleSave}>حفظ</Button>
            </TableCell>
            {!schoolId &&
                <TableCell>
                    <Button type="submit" disabled={loading} onClick={handleCreate}>إضافة مدرسة</Button>
                </TableCell>
            }
        </TableRow>
    )
}

export default ScheduleTableRow