import ConfirmDelete from '@/src/components/layout/ConfirmDelete'
import { Button } from '@/src/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDeleteProject } from './useDeleteProject'

function DeleteProject({ projectName, projectID }) {
    const { isDeleting, deleteProject } = useDeleteProject()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDelete = () => {
        deleteProject(projectID)
        setDeleteOpen(false)
    }
    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setDeleteOpen(true)}>
                <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
            <ConfirmDelete
                resource={{ name: "المشروع", exactName: projectName }} open={deleteOpen}
                disabled={isDeleting}
                onDelete={handleDelete} setDeleteOpen={setDeleteOpen} />
        </>
    )
}

export default DeleteProject