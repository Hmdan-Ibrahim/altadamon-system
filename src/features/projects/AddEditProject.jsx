import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Edit, Plus } from 'lucide-react'
import ProjectForm from './ProjectForm'

function AddEditProject({ project }) {
    const [formOpen, setFormOpen] = useState(false)
    return (
        <div className="flex">
            <Button {...project && { variant: "ghost", size: "icon" }} className="cursor-cell" onClick={() => setFormOpen(true)}>
                {project ? <Edit className="w-4 h-4 cursor" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة مشروع
                    </>
                }
            </Button>
            <ProjectForm open={formOpen}
                projectToEdit={project}
                title={project ? "تعديل المشروع" : "إضافة مشروع"}
                onOpenChange={setFormOpen}
                submitText={project && "تعديل"}
            />
        </div>

    )
}

export default AddEditProject