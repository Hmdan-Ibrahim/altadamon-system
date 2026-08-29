import AuthFeature from '@/src/components/gards/AuthFeature'
import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { Roles } from '@/src/lib/utils/Entities'
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
                <AuthFeature roles={[Roles.ADMIN]}>
                    <TableHead>الاجراءات</TableHead>
                </AuthFeature>
            </TableRow>
        </TableHeader>
    )
}

export default SchoolsTableHeader