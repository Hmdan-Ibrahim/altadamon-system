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
            const { transporter, operator, vehicle, RequiredCapacity, well, detailsOfDays, monthlyOrders, monthlyRevenue, totalCapacity, replyPrice, ContractPricePerTon, monthlyPrice } = item
            const { name = '-', trip = '-' } = transporter || {}
            const row = {
                "م": i + 1,
                "الاسم/المقاول": operator == "ي-كاش" ? "مشتريات" : name,
                "المشغل": operator == "ي-كاش" ? "" : operator,
                "السيارة": vehicle || "",
                "السعة": RequiredCapacity
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
            row["إجمالي الأطنان الشهرية"] = totalCapacity ?? "";

            if (["تقرير شهري", "استحقاق المشروع"].includes(reportType)) {
                row["التحلية"] = well ?? "";
                row["سعر الرد"] = replyPrice ?? "";

                if (reportType === "تقرير شهري") {
                    row["استحقاق اليوم"] = +((replyPrice ?? 0) * (daysMap[selectedDay]?.totalOrdersDay ?? 0)).toFixed(3);
                }
                row["اجمالي الدخولية (الاستحقاق)"] = monthlyPrice ?? "";
            }

            if (reportType === "ايرادات المشروع") {
                row["سعر الطن"] = ContractPricePerTon || "";
                row["مبلغ الإيراد الشهري"] = monthlyRevenue || "";
                row["سعر الترب"] = trip || "";
                row["مبلغ الترب"] = (trip * monthlyOrders) || "";
            }

            return row;
        });

        const headers = ["م", "الاسم/المقاول", "المشغل", "السيارة", "السعة", ...days.map(day => day.toString()),];
        if (reportType === "تقرير شهري") { headers.push("طلبات اليوم", "كمية اليوم"); }
        headers.push("إجمالي الطلبات", "إجمالي الأطنان الشهرية");

        if (["تقرير شهري", "استحقاق المشروع"].includes(reportType)) {
            headers.push("التحلية", "سعر الرد");
        }
        if (reportType === "تقرير شهري") {
            headers.push("استحقاق اليوم");
        }
        headers.push("اجمالي الدخولية (الاستحقاق)");

        if (reportType === "ايرادات المشروع") {
            headers.push("سعر الطن", "مبلغ الإيراد الشهري", "سعر الترب", "مبلغ الترب");
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