import React, { useState } from 'react'
import { Edit, Plus } from 'lucide-react'
import OrderForm from './OrderForm';
import { Button } from '@/src/components/ui/button';
import AuthFeature from '@/src/components/gards/AuthFeature';
import { Roles } from '@/src/lib/utils/Entities';

function AddEditOrder({ dailyOrder }) {
    const [formOpen, setFormOpen] = useState(false)

    return (
        <div className="flex">
            <Button {...dailyOrder && { variant: "ghost", size: "icon" }} onClick={() => setFormOpen(true)}>
                {dailyOrder ? <Edit className="w-4 h-4" /> :
                    <AuthFeature withoutRoles={[Roles.DRIVER]}>
                        <Plus className="w-4 h-4" />
                        إضافة طلب جديد
                    </AuthFeature>
                }
            </Button>
            {formOpen && <OrderForm open={formOpen}
                orderToEdit={dailyOrder}
                title={dailyOrder ? "تعديل الطلب" : "إضافة طلب"}
                onOpenChange={setFormOpen}
                submitText={dailyOrder && "تعديل"}
            />}
        </div>

    )
}

export default AddEditOrder