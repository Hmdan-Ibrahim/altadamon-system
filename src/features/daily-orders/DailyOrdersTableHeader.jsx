import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import React from 'react'

function DailyOrdersTableHeader() {
    return (
        <TableHeader>
            <TableRow className='min-w-fit'>
                <TableHead>م</TableHead>
                <TableHead>المدرسة</TableHead>
                <TableHead>المشرف</TableHead>
                <TableHead className='min-w-fit'>السائق/المقاول</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>المشغل</TableHead>
                <TableHead>نوع الطلب</TableHead>
                <TableHead>زمن التنفيذ</TableHead>
                <TableHead>التحلية</TableHead>
                <TableHead>السعة</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>ملاحظات</TableHead>
                <TableHead>الاجراءات</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default DailyOrdersTableHeader