import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import React from 'react';

function ReportsTableHeader({ Days, reportType }) {
    console.log("ReportsTableHeader");

    return (
        <TableHeader>
            <TableRow className="text-[12px]">
                <TableHead>م</TableHead>
                <TableHead>الاسم/المقاول</TableHead>
                <TableHead>المشغل</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>السعة</TableHead>
                {Days.map(day => <TableHead key={day} className="bg-green-300 border border-green-400 min-w-10 text-center">{day}</TableHead>)}
                {reportType === "تقرير شهري" && <>
                    <TableHead>عدد ردود  <br />اليوم</TableHead>
                    <TableHead>عدد اطنان <br />اليوم</TableHead>
                </>}
                <TableHead>اجمالي <br /> الردود</TableHead>
                <TableHead>اطنان <br /> الشهرية</TableHead>

                {
                    (reportType === "تقرير شهري" || reportType === "استحقاق المشروع") && <>
                        <TableHead>سعر <br />الرد</TableHead>
                        {reportType === "تقرير شهري" && <>
                            <TableHead> استحقاق <br />اليوم</TableHead>
                        </>}
                        <TableHead>اجمالي الدخولية<br />(الاستحقاق)</TableHead>
                    </>
                }
                {
                    (reportType === "استحقاق المشروع") && <>
                        <TableHead>اسم المستفيد</TableHead>
                        <TableHead>رقم الحساب</TableHead>
                    </>
                }
                {
                    (reportType === "ايرادات المشروع") && <>
                        <TableHead>سعر الطن <br />(التعاقدي)</TableHead>
                        <TableHead>مبلغ الايراد</TableHead>
                        <TableHead>سعر الترب</TableHead>
                        <TableHead>مبلغ الترب</TableHead>
                    </>
                }
                <TableHead className="min-w-40">ملاحظات</TableHead>


            </TableRow>
        </TableHeader>
    )
}

export default React.memo(ReportsTableHeader)
