import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button';
import { ApprovalStatus } from '@/src/lib/utils/Entities';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { useApprovalOrder } from './useApprovalOrder';

function ApproveRejectOrder({ orderID }) {
    const { isApproval, approvalOrder } = useApprovalOrder()

    const [dialogOpen, setDialogOpen] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState(null);

    const isApproved = approvalStatus === ApprovalStatus.APPROVED

    const openApprovalDialog = (status) => {
        setApprovalStatus(status);
        setDialogOpen(true);
    };



    const handleApproval = async () => {
        if (!approvalStatus) return;
        await approvalOrder({ orderID, approvalStatus });

        setDialogOpen(false);
        setApprovalStatus(null);
    };

    return (
        <>
            <div className="flex gap-2 justify-center mb-2">
                <Button variant="default"
                    onClick={() => openApprovalDialog(ApprovalStatus.APPROVED)}>
                    اعتماد
                </Button>
                <Button
                    variant="destructive" approvalStatus={approvalStatus}
                    onClick={() => openApprovalDialog(ApprovalStatus.REJCTED)}
                >
                    رفض
                </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogClose />
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>تحديث حالة اعتماد الطلب</DialogTitle>
                    </DialogHeader>
                    <p>هل تريد تأكيد تحديث حالة اعتماد الطلب الى {approvalStatus}؟</p>
                    <div className='flex gap-1'>
                        <Button variant={isApproved ? "default" : "destructive"} disabled={isApproval} onClick={handleApproval}>{isApproved ? "تأكيد الاعتماد" : "تأكيد الرفض"}</Button>
                        <Button disabled={isApproval} onClick={() => setDialogOpen(false)}>الغاء</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ApproveRejectOrder
