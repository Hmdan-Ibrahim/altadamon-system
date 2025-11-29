import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Edit, Plus } from 'lucide-react'
import ScheduleForm from './ScheduleForm';

function AddEditScheduleSchool({ dailyOrder }) {
    const [formOpen, setFormOpen] = useState(false)

    return (
        <div className="flex justify-end">
            <Button {...dailyOrder && { variant: "ghost", size: "icon" }} onClick={() => setFormOpen(true)}>
                {dailyOrder ? <Edit className="w-4 h-4" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة جدول زمني لمدرسة
                    </>
                }
            </Button>
            <ScheduleForm open={formOpen}
                dailyOrderToEdit={dailyOrder}
                title={dailyOrder ? "تعديل الطلب" : "إضافة طلب"}
                onOpenChange={setFormOpen}
                submitText={dailyOrder && "تعديل"}
            />
        </div>

    )
}

export default AddEditScheduleSchool