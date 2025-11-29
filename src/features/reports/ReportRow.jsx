import { TableCell, TableRow } from '@/src/components/ui/table'
import React, { useMemo } from 'react'
import { getDaysInMonth } from './ReportsTable';
import { useSearchParams } from 'react-router-dom';

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
    const { transporter, operator, vehicle, RequiredCapacity, detailsOfDays, monthlyOrders, totalCapacity, replyPrice, trip, totalPrice } = report

    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const lengthMonth = getDaysInMonth(year, month)
    const numDays = Array.from({ length: lengthMonth }, (_, i) => i + 1)

    const daysMap = useMemo(() => {
        const map = {};
        detailsOfDays?.forEach(d => {
            const dayNum = new Date(d.day).getDate();
            map[dayNum] = d; // { totalOrders, totalCapacity, ... }
        });
        return map;
    }, [detailsOfDays]);

    return (
        <TableRow className={getStyleWithOperator(operator)}>
            <TableCell>{index}</TableCell>
            <TableCell className=" text-start min-w-4">{operator == "ي-كاش" ? "مشتريات" : transporter}</TableCell>
            <TableCell>{operator == "ي-كاش" ? "كاش" : operator}</TableCell>
            <TableCell>{vehicle || "-"}</TableCell>
            <TableCell>{RequiredCapacity}</TableCell>

            {showDays && numDays.map(day =>
                <TableCell key={day}>
                    {daysMap[day]?.totalOrders ?? "-"}
                </TableCell>
            )}
            {reportType === "تقرير شهري" && <>
                <TableCell>
                    {daysMap[new Date(date).getDate()]?.totalOrders ?? "-"}
                </TableCell>

                <TableCell>
                    {(daysMap[new Date(date).getDate()]?.totalOrders ?? 0) * RequiredCapacity}
                </TableCell>
            </>}

            <TableCell>{monthlyOrders}</TableCell>
            <TableCell>{totalCapacity}</TableCell>

            {
                (reportType === "تقرير شهري" || reportType === "استحقاق المشروع") && <>
                    <TableCell>{replyPrice}</TableCell>
                    {reportType === "تقرير شهري" && <>
                        <TableCell>{replyPrice * (daysMap[new Date(date).getDate()]?.totalOrders ?? 0) || 0}</TableCell>
                    </>}
                    <TableCell>{totalPrice}</TableCell>
                </>
            }
            {reportType === "استحقاق المشروع" && <>
                <TableCell>c</TableCell>
                <TableCell>c</TableCell>
            </>}
            {
                (reportType === "ايرادات المشروع") && <>
                    <TableCell>11</TableCell>
                    <TableCell>{11 * totalCapacity}</TableCell>
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