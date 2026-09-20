import { Button } from '@/src/components/ui/button'
import { TableCell, TableRow } from '@/src/components/ui/table'
import { format, formatDate } from 'date-fns';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useCreateOrder as useCreateOrders } from '../daily-orders/useCreateOrder';
import { useCreateSchool } from '../schools/useCreateSchool';
import { useEditSchool } from '../schools/useEditSchool';
import { formatDayMonthYear } from '@/src/lib/utils';
import { useCreateSchoolQouta } from '../schools/useCreateSchoolQuota';

function ScheduleTableRow({ school1, date, Days, report, index }) {
    const { loading, createNewOrder: createNewOrders } = useCreateOrders()
    const { isCreating, createNewSchool } = useCreateSchool();
    const { isCreatingQouta, createNewSchoolQouta } = useCreateSchoolQouta();


    const { school, district, supervisor, neighborhood, ministerialNumber, startDate, endDate, monthlyQuantity } = report
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
        const finalResult = dailyOrders.map(day => ({ school: school1._id, RequiredCapacity: day.capacity, sendingDate: new Date(day.day) }))
        createNewOrders(finalResult);
    }

    const handleCreate = () => {
        createNewSchool({ name: school, district, supervisor, neighborhood, ministerialNumber });
    }
    const handleCreateQuota = () => {

        console.log(formatDayMonthYear("9 1 2026"));
        createNewSchoolQouta({ school: school1._id, startDate: "2026-09-01", endDate: "2027-04-30", monthlyQuantity });
    }

    const { isEditing, editSchool } = useEditSchool();


    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell className=" text-start min-w-40">{school}</TableCell>
            <TableCell>{district}</TableCell>
            <TableCell>{neighborhood}</TableCell>
            <TableCell>{supervisor}</TableCell>
            <TableCell>{monthlyQuantity}</TableCell>
            <TableCell className={(ministerialNumber == school1?.ministerialNumber) && "bg-blue-700"}>{ministerialNumber}</TableCell>
            <TableCell>{school1?.ministerialNumber}</TableCell>
            <TableCell>{formatDayMonthYear("9 1 2026")}</TableCell>
            <TableCell>{formatDayMonthYear("4 1 2027")}</TableCell>
            {/* {DaysCapacity} */}
            <TableCell>
                <Button type="submit" disabled={loading} onClick={handleSave}>حفظ</Button>
            </TableCell>
            {!school1?.supervisor && <TableCell>
                <Button type="submit" disabled={loading || isEditing} onClick={() => {
                    editSchool({ schoolID: school1._id, school: { supervisor } })
                }}>اضافة مشرف</Button>
            </TableCell>}
            {!school1?._id &&
                <TableCell>
                    <Button type="submit" disabled={isCreating} onClick={handleCreate}>إضافة مدرسة</Button>
                </TableCell>
            }
            {school1?._id &&
                <TableCell>
                    <Button type="submit" disabled={isCreatingQouta} onClick={handleCreateQuota}>إضافة حصة مدرسة</Button>
                </TableCell>
            }
        </TableRow>
    )
}

export default ScheduleTableRow