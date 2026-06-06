
import { TableCell, TableRow } from '@/src/components/ui/table'
import React, { useMemo } from 'react'
import { getDaysInMonth } from './ReportsTable';
import { useSearchParams } from 'react-router-dom';
import { Roles } from '@/src/lib/utils/Entities';
import AuthFeature from '@/src/components/gards/AuthFeature';

function getStyleWithOperator(operator) {
    if (operator === "مقاول") {
        return "bg-gray-100"
    } else if (operator === "ي-كاش") {
        return "bg-gray-200"
    }
}

function ReportRow({ reportType, showDays, report, index }) {
    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")
    const groupBy = searchParams.get("groupBy")
    const isTransporter = groupBy == "الموصلين"

    const { transporter, school, operator, vehicle, RequiredCapacity, well, detailsOfDays, monthlyOrders, totalCapacity, replyPrice, monthlyPrice } = report
    const { name = '-', accountName = '-', accountNumber = '-', trip = '-' } = transporter || {}

    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const lengthMonth = getDaysInMonth(year, month)
    const numDays = showDays ? Array.from({ length: lengthMonth }, (_, i) => i + 1) : []

    const daysMap = useMemo(() => {
        const map = {};
        detailsOfDays?.forEach(d => {
            const dayNum = new Date(d.day).getDate();
            map[dayNum] = d;
        });
        return map;
    }, [detailsOfDays]);

    return (
        <TableRow className={getStyleWithOperator(operator)}>
            <TableCell>{index}</TableCell>
            {
                isTransporter ?
                    <>
                        <TableCell className=" text-start min-w-4">{operator == "ي-كاش" ? "مشتريات" : name}</TableCell>
                        <TableCell>{operator == "ي-كاش" ? "" : operator}</TableCell>
                        <TableCell>{vehicle || "-"}</TableCell>
                        <TableCell>{RequiredCapacity}</TableCell>
                    </> :
                    <TableCell className=" text-start min-w-4">{school}</TableCell>
            }

            {numDays.map(day =>
                <TableCell key={day}>
                    {(daysMap[day]?.totalOrders || daysMap[day]?.totalCapacity) ?? "-"}
                </TableCell>
            )}
            {(reportType === "تقرير شهري" && isTransporter) && <>
                <TableCell>
                    {daysMap[new Date(date).getDate()]?.totalOrders ?? "-"}
                </TableCell>
                <TableCell>
                    {(daysMap[new Date(date).getDate()]?.totalOrders ?? 0) * RequiredCapacity}
                </TableCell>
            </>}

            {isTransporter && <TableCell>{monthlyOrders}</TableCell>}
            <TableCell>{totalCapacity}</TableCell>

            {(["تقرير شهري", "استحقاق المشروع"].includes(reportType) && isTransporter) && <>
                <TableCell>{well}</TableCell>
                <AuthFeature withoutRoles={[Roles.DRIVER]}>
                    <TableCell>{replyPrice}</TableCell>
                    {reportType === "تقرير شهري" && <>
                        <TableCell>{+(replyPrice * (daysMap[new Date(date).getDate()]?.totalOrders)).toFixed(3) || 0}</TableCell>
                    </>}
                    <TableCell>{monthlyPrice}</TableCell>
                </AuthFeature>
            </>
            }
            {reportType === "استحقاق المشروع" && <>
                <TableCell>{accountName}</TableCell>
                <TableCell>{accountNumber}</TableCell>
            </>}
            {
                (reportType === "ايرادات المشروع") && <>
                    <AuthFeature withoutRoles={[Roles.DRIVER]}>
                        <TableCell>11.5</TableCell>
                        <TableCell>{11.5 * totalCapacity}</TableCell>
                    </AuthFeature>
                    <TableCell>{trip}</TableCell>
                    <TableCell>{(trip * monthlyOrders) || ''}</TableCell>
                </>
            }
            <TableCell>
                {/* <textarea
                    className="p-1 border rounded w-40 min-h-10 resize-none"
                    value={note}
                    onChange={(e) => onNoteChange(index, e.target.value)}
                /> */}

            </TableCell>
        </TableRow>
    )
}

export default ReportRow
