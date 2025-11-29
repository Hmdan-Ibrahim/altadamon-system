import { TableCell, TableRow } from '@/src/components/ui/table'
import React from 'react'
import { formatDateWithTime } from '@/src/lib/utils'

function DailyOrderRow({ order, index }) {
    const { school, notificationTime, executionTime, supervisor, operator, transporter, vehicle = {}, RequiredCapacity, well, replyPrice, amount, notes } = order

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{school.name}</TableCell>
            <TableCell>{supervisor.name}</TableCell>
            <TableCell className='min-w-fit'>{transporter.name}</TableCell>
            <TableCell>{vehicle.plateNumber || '-'}</TableCell>
            <TableCell>{operator}</TableCell>
            <TableCell>{formatDateWithTime(notificationTime)}</TableCell>
            <TableCell>{formatDateWithTime(executionTime) || "-"}</TableCell>
            <TableCell>{well.name}</TableCell>
            <TableCell>{RequiredCapacity || "-"}</TableCell>
            <TableCell>{replyPrice}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{notes || ""}</TableCell>
            {/* <TableCell>
                <div className="flex items-center justify-enter gap-2">
                    <AddEditOrder dailyOrder={order} />
                    <DeleteOrder dailyOrderName={name} dailyOrderId={dailyOrderId} />
                </div>
            </TableCell> */}
        </TableRow>
    )
}
export default DailyOrderRow