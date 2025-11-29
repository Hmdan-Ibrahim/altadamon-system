import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

function ConfirmDelete({
    resource,
    open = false,
    onDelete,
    setDeleteOpen
}) {

    return (
        <Dialog open={open} onOpenChange={setDeleteOpen}>
            <DialogClose />
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>حذف {resource.exactName}</DialogTitle>
                </DialogHeader>
                <p>هل تريد تأكيد حذف {resource.name}؟</p>
                <div className='flex gap-1'>
                    <Button variant="destructive" onClick={onDelete}>حذف</Button>
                    <Button onClick={() => setDeleteOpen(false)}>الغاء</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDelete