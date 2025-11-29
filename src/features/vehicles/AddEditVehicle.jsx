import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Edit, Plus } from 'lucide-react'
import VehicleForm from './VehicleForm'

function AddEditVehicle({ vehicle }) {
    const [formOpen, setFormOpen] = useState(false)
    return (
        <div className="flex justify-end">
            <Button {...vehicle && { variant: "ghost", size: "icon" }} onClick={() => setFormOpen(true)}>
                {vehicle ? <Edit className="w-4 h-4" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة سيارة
                    </>
                }
            </Button>
            <VehicleForm open={formOpen}
                vehicleToEdit={vehicle}
                title={vehicle ? "تعديل السيارة" : "إضافة سيارة"}
                onOpenChange={setFormOpen}
                submitText={vehicle && "تعديل"}
            />
        </div>

    )
}

export default AddEditVehicle