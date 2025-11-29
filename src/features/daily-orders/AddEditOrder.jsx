import React, { useState } from 'react'
import { Edit, Plus } from 'lucide-react'
import OrderForm from './OrderForm';
import { Button } from '@/src/components/ui/button';

function AddEditOrder({ dailyOrder }) {
    const [formOpen, setFormOpen] = useState(false)

    return (
        <div className="flex justify-end">
            <Button {...dailyOrder && { variant: "ghost", size: "icon" }} onClick={() => setFormOpen(true)}>
                {dailyOrder ? <Edit className="w-4 h-4" /> :
                    <>
                        <Plus className="w-4 h-4" />
                        إضافة طلب جديد
                    </>
                }
            </Button>
            <OrderForm open={formOpen}
                orderToEdit={dailyOrder}
                title={dailyOrder ? "تعديل الطلب" : "إضافة طلب"}
                onOpenChange={setFormOpen}
                submitText={dailyOrder && "تعديل"}
            />
        </div>

    )
}

export default AddEditOrder