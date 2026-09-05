import { TableCell, TableRow } from '../../components/ui/table'
import React from 'react'
import AddEditOrder from './AddEditOrder'
import DeleteOrder from './DeleteOrder'
import { formatDateWithTime } from '@/src/lib/utils'
import { ApprovalStatus as approvalS, Roles, StatusOrder } from '@/src/lib/utils/Entities'
import AuthFeature from '../../components/gards/AuthFeature'
import ViewOrderImages from './ViewOrderImages'
import DownloadOrdersPptx from './DownloadOrdersPptx'
import ApproveRejectOrder from './ApproveRejectOrder'

const approvalColors = {
    [approvalS.UNDER_REVIEW]:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",

    [approvalS.APPROVED]:
        "bg-green-100 text-green-700 border border-green-200",

    [approvalS.REJCTED]:
        "bg-red-100 text-red-700 border border-red-200",
}

function statusStyele(status, beforeToday) {
    if (status === StatusOrder.NOT_IMPLEMENTED && beforeToday) return "bg-red-400"
    if (status === StatusOrder.IMPLEMENTED) return "bg-green-400"
}

function DailyOrderRow({ order, index, beforeToday }) {

    const { _id: dailyOrderId, school, status, orderType, executionTime, supervisor, operator, transporter, vehicle = {}, RequiredCapacity, well, replyPrice, driverTrip, notes, buildingImage, images, ApprovalStatus } = order
    return (
        <TableRow className={`${statusStyele(status, beforeToday)} `}>
            <TableCell>{index}</TableCell>
            <TableCell>{school.name}</TableCell>
            <TableCell>{supervisor?.name}</TableCell>
            <TableCell className='min-w-fit'>{transporter?.name}</TableCell>
            <TableCell>{vehicle.plateNumber || '-'}</TableCell>
            <TableCell>{operator == "ي-كاش" ? "مشتريات" : operator}</TableCell>
            <TableCell>{orderType}</TableCell>
            <TableCell>{formatDateWithTime(executionTime, "dd MMMM yyyy") || "-"}</TableCell>
            <TableCell>{well?.name}</TableCell>
            <TableCell>{RequiredCapacity || "-"}</TableCell>
            <TableCell>{driverTrip}</TableCell>
            <AuthFeature withoutRoles={[Roles.DRIVER]}>
                <TableCell>{replyPrice % 1 === 0 ? replyPrice : replyPrice?.toFixed(2) || '-'}</TableCell>
            </AuthFeature>
            <TableCell className={approvalColors[ApprovalStatus]}>{ApprovalStatus}</TableCell>
            <TableCell>{notes || ""}</TableCell>
            <TableCell>
                <div className="flex items-center justify-enter gap-2">
                    <ViewOrderImages buildingImage={buildingImage} images={images} />
                    {(![approvalS.APPROVED, approvalS.REJCTED].includes(ApprovalStatus) &&
                        <AuthFeature withoutRoles={[Roles.MANAGER, Roles.REGION_MANAGER, Roles.DRIVER, Roles.CONTRACTOR]}>
                            <AddEditOrder dailyOrder={order} />
                            {/* <AuthFeature withoutRoles={[Roles.DRIVER, Roles.CONTRACTOR]}> */}
                            <DeleteOrder dailyOrderName={name} dailyOrder={{ id: dailyOrderId, buildingImage, images }} />
                            {/* </AuthFeature> */}
                        </AuthFeature>
                    )}
                </div>
                {
                    (![approvalS.APPROVED, approvalS.REJCTED].includes(ApprovalStatus) && status == StatusOrder.IMPLEMENTED) &&
                    <AuthFeature roles={[Roles.REGION_MANAGER]}>
                        <ApproveRejectOrder orderID={dailyOrderId} />
                    </AuthFeature>
                }
                {
                    status == StatusOrder.IMPLEMENTED &&
                    <AuthFeature roles={[Roles.REGION_MANAGER, Roles.PROJECT_MANAGER, Roles.SUPERVISOR]}>
                        <DownloadOrdersPptx filter={{ school: school._id, orderID: dailyOrderId }} title="تحميل تقرير المدرسة" />
                    </AuthFeature>
                }
            </TableCell>
        </TableRow>
    )
}
export default DailyOrderRow
