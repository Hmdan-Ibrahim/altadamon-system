import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button';
import { ApprovalStatus } from '@/src/lib/utils/Entities';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { useApprovalOrder } from './useApprovalOrder';
import { cn } from '@/src/lib/utils';

const getStatusLabel = (status) => {
    switch (status) {
        case ApprovalStatus.APPROVED:
            return ApprovalStatus.APPROVED;
        case ApprovalStatus.UNDER_REVIEW:
            return ApprovalStatus.UNDER_REVIEW;
        case ApprovalStatus.REJECTED:
            return ApprovalStatus.REJECTED;
        default:
            return "";
    }
};

function ApproveRejectOrder({ orderID, currentApprovalStatus }) {
    const { isPending, approvalOrder } = useApprovalOrder()

    const [dialogOpen, setDialogOpen] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState(null);

    const isCurrentlyApproved = currentApprovalStatus === ApprovalStatus.APPROVED;
    const isSelectingPending = approvalStatus === ApprovalStatus.UNDER_REVIEW;
    const isSelectingApproved = approvalStatus === ApprovalStatus.APPROVED;

    const openApprovalDialog = (status) => {
        setApprovalStatus(status);
        setDialogOpen(true);
    };



    const handleApproval = () => {
        if (!approvalStatus) return;
        approvalOrder({ orderID, approvalStatus }, {
            onSuccess: (data) => {
                setDialogOpen(false);
                setApprovalStatus(null);
            }
        });
    };

    return (
        <>
            <div className="flex gap-2 justify-center mb-2">
                {isCurrentlyApproved ? (
                    <Button
                        className="bg-yellow-300 hover:bg-amber-400 text-white"
                        disabled={isPending}
                        onClick={() => openApprovalDialog(ApprovalStatus.UNDER_REVIEW)}
                    >
                        قيد المراجعة
                    </Button>
                ) : (
                    <Button
                        variant="default"
                        disabled={isPending}
                        onClick={() => openApprovalDialog(ApprovalStatus.APPROVED)}
                    >
                        اعتماد
                    </Button>
                )}
                <Button variant="destructive"
                    disabled={isPending}
                    onClick={() => openApprovalDialog(ApprovalStatus.REJECTED)}
                >
                    رفض
                </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={(open) => !isPending && setDialogOpen(open)}>
                <DialogClose />
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>تحديث حالة اعتماد الطلب</DialogTitle>
                    </DialogHeader>
                    <p>
                        هل تريد تأكيد تحديث حالة اعتماد الطلب إلى{' '}
                        <span className="font-semibold text-primary">
                            "{getStatusLabel(approvalStatus)}"
                        </span>؟
                    </p>
                    <div className='flex gap-1'>
                        <Button
                            variant={isSelectingApproved ? "default" : isSelectingPending ? "outline" : "destructive"}
                            className={cn(
                                isSelectingPending && "bg-amber-500 hover:bg-amber-600 text-white border-none"
                            )}
                            disabled={isPending}
                            onClick={handleApproval}
                        >
                            {isPending
                                ? `جاري التحويل إلى ${getStatusLabel(approvalStatus)}...`
                                : `تأكيد ${getStatusLabel(approvalStatus)}`
                            }
                        </Button>
                        <Button
                            variant="outline"
                            disabled={isPending}
                            onClick={() => setDialogOpen(false)}
                        >
                            إلغاء
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ApproveRejectOrder
