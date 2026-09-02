import { Button } from "@/src/components/ui/button";
import { formatDayMonthYear } from "@/src/lib/utils";
import { getDaysInMonth } from "date-fns";
import * as XLSX from "xlsx";

export const ExportTransportersReportToExcel = ({ data, date, projectName, reportType }) => {

    function handleExportToExcel() {
        const currentDate = new Date(date);

        const numMonth = getDaysInMonth(new Date(date).getFullYear(), new Date(date).getMonth() + 1)
        const days = Array.from({ length: numMonth }, (_, i) => i + 1)
        const selectedDay = currentDate.getDate();

        const rows = data.map((item, i) => {
            const { transporter, school, operator, vehicle, RequiredCapacity, well, detailsOfDays, monthlyOrders, monthlyRevenue, totalCapacity, replyPrice, ContractPricePerTon, monthlyPrice } = item
            const { name = '-', accountName = '-', accountNumber = '-', trip = '-' } = transporter || {}
            const row = {
                "م": i + 1,
                "الاسم/المقاول": operator == "ي-كاش" ? "مشتريات" : name,
                "المشغل": operator == "ي-كاش" ? "" : operator,
                "السيارة": vehicle || "",
                "السعر": RequiredCapacity
            }

            const daysMap = {};

            detailsOfDays.forEach((d) => {
                const dayNumber = new Date(d.day).getDate();
                daysMap[dayNumber] = d;
                row[dayNumber] = d?.totalOrdersDay ?? "";
            });

            if (reportType === "تقرير شهري") {
                row["طلبات اليوم"] = daysMap[selectedDay]?.totalOrdersDay ?? "";
                row["كمية اليوم"] = daysMap[selectedDay]?.totalCapacityDay ?? 0;
            }

            row["إجمالي الطلبات"] = monthlyOrders ?? "";
            row["السعة الإجمالية"] = totalCapacity ?? "";

            if (["تقرير شهري", "استحقاق المشروع"].includes(reportType)) {
                row["التحلية"] = well ?? "";
                row["سعر الرد"] = replyPrice ?? "";

                if (reportType === "تقرير شهري") {
                    row["قيمة اليوم"] = +((replyPrice ?? 0) * (daysMap[selectedDay]?.totalOrdersDay ?? 0)).toFixed(3);
                }

                row["السعر الشهري"] = monthlyPrice ?? "";
            }

            if (reportType === "ايرادات المشروع") {
                row["سعر الطن"] = ContractPricePerTon ?? "";
                row["الإيراد الشهري"] = monthlyRevenue ?? "";
                row["الرحلة"] = trip ?? 0;
                row["قيمة الرحلات"] =
                    trip && monthlyOrders ? trip * monthlyOrders : "";
            }

            return row;
        });

        const headers = ["م", "الاسم/المقاول", "المشغل", "السيارة", "السعر", ...days.map(day => day.toString()),];
        if (reportType === "تقرير شهري") { headers.push("طلبات اليوم", "كمية اليوم"); }
        headers.push("إجمالي الطلبات", "السعة الإجمالية");

        if (["تقرير شهري", "استحقاق المشروع"].includes(reportType)) {
            headers.push("التحلية", "سعر الرد");
        }
        if (reportType === "تقرير شهري") {
            headers.push("قيمة اليوم");
        }
        headers.push("السعر الشهري");

        if (reportType === "ايرادات المشروع") {
            headers.push("سعر الطن", "الإيراد الشهري", "الرحلة", "قيمة الرحلات");
        }

        const worksheet = XLSX.utils.json_to_sheet([]);

        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                [`تقرير الموصلين مشروع ${projectName}`],
                [`${reportType} - ${formatDayMonthYear(date, "MMMM yyyy")}`],
                []
            ],
            { origin: "A1" }
        );

        XLSX.utils.sheet_add_json(
            worksheet,
            rows,
            {
                header: headers,
                origin: "A4",
                skipHeader: false,
            }
        );
        const workbook = XLSX.utils.book_new();

        worksheet["!merges"] = [
            {
                s: { r: 0, c: 3 },
                e: { r: 0, c: headers.length - 1 }
            }, { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 }, },
        ];

        worksheet["!cols"] = headers.map((header) => { if (header === "الاسم/المقاول") { return { wch: 25 }; } if (header === "المشغل") { return { wch: 15 }; } if (header === "السيارة") { return { wch: 15 }; } return { wch: 13, }; });

        XLSX.utils.book_append_sheet(workbook, worksheet, `تقرير الموصلين مشروع ${projectName}`);

        const fileName = `تقرير الموصلين مشروع ${projectName} - ${reportType} - ${formatDayMonthYear(date, "MMMM yyyy")}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    }

    return <Button onClick={handleExportToExcel}>
        تحميل Excel
    </Button>
};