import { Button } from "@/src/components/ui/button";
import { formatDayMonthYear } from "@/src/lib/utils";
import { getDaysInMonth } from "date-fns";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ data, date, projectName }) => {

    function handleExportToExcel() {
        const numMonth = getDaysInMonth(new Date(date).getFullYear(), new Date(date).getMonth() + 1)
        const days = Array.from({ length: numMonth }, (_, i) => i + 1)

        const rows = data.map((item, i) => {
            const row = {
                "م": i + 1,
                "الاسم": item.school.name,
                "الرقم الوزاري": item.school.ministerialNumber,
            }


            days.forEach((day) => {
                row[day] = "";
            });

            item.detailsOfDays.forEach((d) => {
                const dayNumber = new Date(d.day).getDate();
                row[dayNumber] = d.totalCapacityDay;
            });

            row["السعة الإجمالية"] = item.totalCapacity

            return row;
        });

        const headers = [
            "",
            "م",
            "الاسم",
            "الرقم الوزاري",
            ...days.map((_, index) => (index + 1).toString()),
            "السعة الإجمالية",
        ];


        // const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
        const worksheet = XLSX.utils.json_to_sheet([]);

        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                [`تقرير مدارس ${projectName}`],
                []
            ],
            { origin: "D1" }
        );

        XLSX.utils.sheet_add_json(
            worksheet,
            rows,
            {
                header: headers,
                origin: "A3",
                skipHeader: false,
            }
        );
        const workbook = XLSX.utils.book_new();

        worksheet["!merges"] = [
            {
                s: { r: 0, c: 3 },
                e: { r: 0, c: headers.length - 1 }
            }
        ];
        XLSX.utils.book_append_sheet(workbook, worksheet, "تقرير مدارس");

        const fileName = `تقرير توريد مدارس ${projectName} شهر ${formatDayMonthYear(date, "MMMM yyyy")}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    }

    return <Button onClick={handleExportToExcel}>
        تحميل Excel
    </Button>
};