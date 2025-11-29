import ConfirmDelete from '@/src/components/layout/ConfirmDelete'
import { Button } from '@/src/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteSchool } from './useDeleteSchool'

function DeleteSchool({ schoolName, schoolID }) {
    const { isDeleting, deleteSchool } = useDeleteSchool()
    const [deleteOpen, setDeleteOpen] = useState(false)

    const handleDelete = () => {
        deleteSchool(schoolID)
        setDeleteOpen(false)
    }
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <ConfirmDelete
                resource={{ name: "المدرسة", exactName: schoolName }} open={deleteOpen}
                disabled={isDeleting}
                onDelete={handleDelete} setDeleteOpen={setDeleteOpen} />
        </>
    )
}

export default DeleteSchool