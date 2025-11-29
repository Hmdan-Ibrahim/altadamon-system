import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/src/components/ui/table';
import { useMemo, useRef, useState } from 'react';
import { handleError } from '@/src/services/api/api';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import ReportRow from './ReportRow';
import { useReports } from './useReports';
import { Label } from '@/src/components/ui/label';
import PrintPortal from '@/src/components/layout/PrintPortal';
import { useSearchParams } from 'react-router-dom';
import ReportsTableHeader from './ReportsTableHeader';
import { formatDayMonthYear, getDayName } from '@/src/lib/utils';




export function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function ReportsTable() {
    const notesRef = useRef({});
    const [searchParams] = useSearchParams();
    const reportType = searchParams.get("report");

    const [searchTerm, setSearchTerm] = useState("")
    const [showDays, setShowDays] = useState(false)
    const [cons, setCons] = useState(true)

    const { isLoading, reports, projectName, date, error } = useReports()

    const numMonth = getDaysInMonth(new Date(date).getFullYear(), new Date(date).getMonth() + 1)
    const Days = showDays ? Array.from({ length: numMonth }, (_, i) => i + 1) : []

    const filteredReports = useMemo(() => {
        const key = cons ? "operator" : "transporter";

        return (
            reports.reports?.filter((r) =>
                String(r?.[key] || "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            ) || []
        );
    }, [reports.reports, searchTerm, cons]);


    const totals = useMemo(() => {

        // اليوم المختار من التاريخ
        const selectedDay = new Date(date).getDate();

        // إجماليات
        let totalOrdersByDay = 0;       // إجمالي ردود اليوم لجميع المدارس
        let totalTonsByDay = 0;         // إجمالي أطنان اليوم لجميع المدارس
        let totalOrdersMonth = 0;       // إجمالي ردود الشهر
        let totalTonsMonth = 0;         // إجمالي أطنان الشهر
        let totalPriceByDay = 0;        // إجمالي دخولية اليوم
        let totalPriceMonth = 0;        // إجمالي الدخولية
        let revenueAmount = 0;        // إجمالي الترب
        let commission = 0;        // إجمالي الترب

        filteredReports.forEach(report => {

            const capacity = report.RequiredCapacity;

            revenueAmount += 11 * report.totalCapacity
            commission += report.trip * report.monthlyOrders || 0;

            report.detailsOfDays?.forEach(d => {
                const dayNum = new Date(d.day).getDate();
                const orders = d.totalOrders || 0;
                const replyPrice = report.replyPrice || 0;

                // إجمالي اليوم المحدد
                if (dayNum === selectedDay) {
                    totalOrdersByDay += orders;
                    totalTonsByDay += orders * capacity;
                    totalPriceByDay += replyPrice

                }
                // إجمالي الشهر
                totalOrdersMonth += orders;
                totalTonsMonth += orders * capacity;
            });

            totalPriceMonth += report.totalPrice || 0;
        });

        return {
            totalOrdersByDay,
            totalTonsByDay,
            totalOrdersMonth,
            totalTonsMonth,
            totalPriceByDay,
            totalPriceMonth,
            revenueAmount,
            commission
        };

    }, [filteredReports, date]);

    const handleNoteChange = (reportId, value) => {
        notesRef.current[reportId] = value;
    };

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />


    return (
        <>

            <div className="relative flex flex-wrap items-center gap-3.5 my-4">
                <div className="relative w-md -full">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                {filteredReports?.length !== 0 && <div className="flex gap-3.5">
                    <Input type="checkbox" className="max-w-6" checked={showDays} onChange={e => setShowDays(!showDays)} />
                    <Label className={"min-w-fit"}>اظهار الايام</Label>
                    <Input type="checkbox" className="max-w-6" checked={cons} onChange={e => setCons(!cons)} />
                    <Label className={"min-w-fit"}>بحث المشغل</Label>
                </div>}
            </div>
            <PrintPortal>
                <div className="border rounded-lg on-print m-2">
                    <h1 className="text-center my-5">
                        تقرير شهري انتاجية مشروع {projectName} ليوم {getDayName(date)} الموافق {formatDayMonthYear(date, "ddMMyyyy")}
                    </h1>

                    <Table className="table-auto m-2">
                        <ReportsTableHeader showDays={showDays} Days={Days} reportType={reportType} />
                        <TableBody>
                            {filteredReports?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8 + Days.length} className="text-center text-muted-foreground py-8">
                                        لا توجد بيانات
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredReports?.map((report, index) => <ReportRow key={report._id} reportType={reportType} showDays={showDays} report={report} index={index + 1} note={notesRef.current[index + 1]}
                                    onNoteChange={handleNoteChange} />)
                            )
                            }
                        </TableBody>
                        {filteredReports?.length !== 0 && <TableFooter className="bg-gray-400">
                            <TableRow>
                                <TableCell className="text-start pr-50 text-lg" colSpan={5 + Days.length}>الإجمالي</TableCell>
                                {reportType === "تقرير شهري" && <>
                                    <TableCell >{totals.totalOrdersByDay}</TableCell>
                                    <TableCell >{totals.totalTonsByDay}</TableCell>
                                </>}
                                <TableCell >{totals.totalOrdersMonth}</TableCell>
                                <TableCell >{totals.totalTonsMonth}</TableCell>
                                {
                                    (reportType === "تقرير شهري" || reportType === "استحقاق المشروع") && <>
                                        <TableCell ></TableCell>
                                        {reportType === "تقرير شهري" && <>
                                            <TableCell>{totals.totalPriceByDay}</TableCell>
                                        </>}
                                        <TableCell >{totals.totalPriceMonth}</TableCell>
                                    </>
                                }

                                {(reportType === "استحقاق المشروع") && <TableCell colSpan={2}> </TableCell>}

                                {
                                    (reportType === "ايرادات المشروع") && <>
                                        <TableCell></TableCell>
                                        <TableCell>{totals.revenueAmount}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{totals.commission}</TableCell>
                                    </>
                                }

                                <TableCell ></TableCell>
                            </TableRow>
                        </TableFooter>}
                    </Table>
                </div>
            </PrintPortal>
        </>
    )
}

export default ReportsTable