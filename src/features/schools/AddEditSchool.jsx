import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Edit, Plus } from 'lucide-react'
import SchoolForm from './SchoolForm';

function AddEditSchool({ school }) {
    const [formOpen, setFormOpen] = useState(false)
    return (
        <div className="flex justify-end">
            <Button {...school && { variant: "ghost", size: "icon" }} onClick={() => setFormOpen(true)}>
                {school ? <Edit className="w-4 h-4" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة مدرسة
                    </>
                }
            </Button>
            <SchoolForm open={formOpen}
                schoolToEdit={school}
                title={school ? "تعديل المدرسة" : "إضافة مدرسة"}
                onOpenChange={setFormOpen}
                submitText={school && "تعديل"}
            />
        </div>

    )
}

export default AddEditSchool