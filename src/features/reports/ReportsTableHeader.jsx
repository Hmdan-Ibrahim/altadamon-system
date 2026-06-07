import AuthFeature from '@/src/components/gards/AuthFeature';
import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { Roles } from '@/src/lib/utils/Entities';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function ReportsTableHeader({ Days, reportType }) {
    const [searchParams] = useSearchParams()
    const groupBy = searchParams.get("groupBy")
    const isTransporter = groupBy == "الموصلين"

    return (
        <TableHeader>
            <TableRow className="text-[12px]">
                <TableHead>م</TableHead>
                <TableHead>{isTransporter ? "الاسم/المقاول" : "المدرسة"}</TableHead>
                {
                    isTransporter && <>
                        <TableHead>المشغل</TableHead>
                        <TableHead>السيارة</TableHead>
                        <TableHead>السعة</TableHead>
                    </>
                }
                {Days.map(day => <TableHead key={day} className="bg-green-300 border border-green-400 min-w-10 text-center">{day}</TableHead>)}
                {(reportType === "تقرير شهري" && isTransporter) && <>
                    <TableHead>عدد ردود  <br />اليوم</TableHead>
                    <TableHead>عدد اطنان <br />اليوم</TableHead>
                </>}
                {isTransporter && <TableHead>اجمالي <br /> الردود</TableHead>}
                <TableHead>اطنان <br /> الشهرية</TableHead>

                {
                    (["تقرير شهري", "استحقاق المشروع"].includes(reportType) && isTransporter) && <>
                        <TableHead>التحلية</TableHead>
                        <AuthFeature withoutRoles={[Roles.DRIVER]}>
                            <TableHead>سعر <br />الرد</TableHead>
                            {reportType === "تقرير شهري" && <>
                                <TableHead> استحقاق <br />اليوم</TableHead>
                            </>}
                            <TableHead>اجمالي الدخولية<br />(الاستحقاق)</TableHead>
                        </AuthFeature>
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
                        <AuthFeature withoutRoles={[Roles.DRIVER]}>
                            <TableHead>سعر الطن <br />(التعاقدي)</TableHead>
                            <TableHead>مبلغ الايراد</TableHead>
                        </AuthFeature>
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
