import ConfirmDelete from '@/src/components/layout/ConfirmDelete'
import { Button } from '@/src/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteVehicle } from './useDeleteVehicle'

function AddEditVehicle({ vehicleName, vehicleID }) {
    const { isDeleting, addEditVehicle } = useDeleteVehicle()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDelete = () => {
        addEditVehicle(vehicleID)
        setDeleteOpen(false)
    }
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <ConfirmDelete
                resource={{ name: "المدرسة", exactName: vehicleName }} open={deleteOpen}
                disabled={isDeleting}
                onDelete={handleDelete} setDeleteOpen={setDeleteOpen} />
        </>
    )
}

export default AddEditVehicle