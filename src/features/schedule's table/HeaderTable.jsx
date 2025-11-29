import { TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import React from 'react';

function HeaderTable({ Days }) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>م</TableHead>
                <TableHead>المدرسة</TableHead>
                <TableHead>عدد الردود</TableHead>
                {/* <TableHead>السعة</TableHead> */}
                {Days.map(day => (
                    <TableHead
                        key={day}
                        className="bg-green-300 border border-green-400 min-w-10 text-center"
                    >
                        {day}
                    </TableHead>
                ))}
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default React.memo(HeaderTable)
