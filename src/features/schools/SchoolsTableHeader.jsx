import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import React from 'react'

function SchoolsTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>م</TableHead>
                <TableHead>اسم المدرسة</TableHead>
                <TableHead>المشرف</TableHead>
                <TableHead>المنطقة</TableHead>
                <TableHead>الحي</TableHead>
                <TableHead>الرقم الوزاري</TableHead>
                <TableHead>الاجراءات</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default SchoolsTableHeader