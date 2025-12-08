import { TableCell, TableRow } from '../../components/ui/table'
import React from 'react'
import AddEditOrder from './AddEditOrder'
import DeleteOrder from './DeleteOrder'
import { formatDateWithTime, formatDayMonthYear } from '@/src/lib/utils'
import { Roles, StatusOrder } from '@/src/lib/utils/Entities'
import AuthFeature from '../../components/gards/AuthFeature'

function statusStyele(status, beforeToday) {
    if (status === StatusOrder.NOT_IMPLEMENTED && beforeToday) return "bg-red-400"
    if (status === StatusOrder.IMPLEMENTED) return "bg-green-400"
}

function DailyOrderRow({ order, index, beforeToday }) {

    const { _id: dailyOrderId, school, status, sendingDate, executionTime, supervisor, operator, transporter, vehicle = {}, RequiredCapacity, well, replyPrice, notes } = order
    return (
        <TableRow className={`${statusStyele(status, beforeToday)} `}>
            <TableCell>{index}</TableCell>
            <TableCell>{school.name}</TableCell>
            <TableCell>{supervisor?.name}</TableCell>
            <TableCell className='min-w-fit'>{transporter?.name}</TableCell>
            <TableCell>{vehicle.plateNumber || '-'}</TableCell>
            <TableCell>{operator == "ي-كاش" ? "مشتريات" : operator}</TableCell>
            <TableCell>{formatDayMonthYear(sendingDate, "dd MMMM yyyy")}</TableCell>
            <TableCell>{formatDateWithTime(executionTime) || "-"}</TableCell>
            <TableCell>{well?.name}</TableCell>
            <TableCell>{RequiredCapacity || "-"}</TableCell>
            <TableCell>{replyPrice}</TableCell>
            {/* <TableCell>{amount}</TableCell> */}
            <TableCell>{notes || ""}</TableCell>
            <TableCell>
                <div className="flex items-center justify-enter gap-2">
                    <AddEditOrder dailyOrder={order} />
                    <AuthFeature roles={[Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER]}>
                        <DeleteOrder dailyOrderName={name} dailyOrderId={dailyOrderId} />
                    </AuthFeature>
                </div>
            </TableCell>
        </TableRow>
    )
}
export default DailyOrderRow
