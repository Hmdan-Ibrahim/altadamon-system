import React, { useState } from 'react'
import RegionForm from './RegionForm'
import { Button } from '@/src/components/ui/button'
import { Edit, Plus } from 'lucide-react'

function AddEditRegion({ region }) {
    const [formOpen, setFormOpen] = useState(false)
    return (
        <div className="flex justify-end">
            <Button {...region ? { variant: "ghost", size: "icon" } : { className: "mb-2 " }} onClick={() => setFormOpen(true)}>
                {region ? <Edit className="w-4 h-4" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة منطقة
                    </>
                }
            </Button>
            <RegionForm open={formOpen}
                regionToEdit={region}
                title={region ? "تعديل المنطقة" : "إضافة منطقة"}
                onOpenChange={setFormOpen}
                submitText={region && "تعديل"}
            />
        </div>

    )
}

export default AddEditRegion