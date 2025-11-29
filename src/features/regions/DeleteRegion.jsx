import ConfirmDelete from '@/src/components/layout/ConfirmDelete'
import { Button } from '@/src/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteRegion } from './useDeleteRegion'

function DeleteRegion({ regionName, regionID }) {
    const { isDeleting, deleteRegion } = useDeleteRegion()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDelete = () => {
        deleteRegion(regionID)
        setDeleteOpen(false)
    }
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <ConfirmDelete
                resource={{ name: "المنطقة", exactName: regionName }} open={deleteOpen}
                disabled={isDeleting}
                onDelete={handleDelete} setDeleteOpen={setDeleteOpen} />
        </>
    )
}

export default DeleteRegion