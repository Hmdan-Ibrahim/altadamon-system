import ConfirmDelete from '@/src/components/layout/ConfirmDelete'
import { Button } from '@/src/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteOrder } from './useDeleteOrder'

function DeleteOrder({ orderName, dailyOrderId }) {
    const { isDeleting, deleteOrder } = useDeleteOrder()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDelete = () => {
        deleteOrder(dailyOrderId)
        setDeleteOpen(false)
    }
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <ConfirmDelete
                resource={{ name: "الطلب", exactName: orderName }} open={deleteOpen}
                disabled={isDeleting}
                onDelete={handleDelete} setDeleteOpen={setDeleteOpen} />
        </>
    )
}

export default DeleteOrder