import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import { useUsers } from '@/src/hooks/useUsers'
import { useCreateVehicle } from './useCreateVehicle'
import { useEditVehicle } from './useEditVehicle'

function VehicleForm({
    open,
    onOpenChange,
    vehicleToEdit,
    title,
    onSubmit,
    submitText = "حفظ",
}) {
    const { isLoading, users, error } = useUsers()
    const { isCreating, createNewVehicle } = useCreateVehicle();
    const { isEditing, editVehicle } = useEditVehicle();
    const isWorking = isCreating || isEditing;

    // const { _id: editId, ...editValues } = vehicleToEdit;
    const isEditSession = !!vehicleToEdit;
    console.log("isEditSession", vehicleToEdit);


    const { control, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession
            ? {
                plateNumber: vehicleToEdit?.plateNumber || undefined,
                capacity: vehicleToEdit?.capacity || undefined,
                driver: vehicleToEdit?.driver || undefined
            }
            : {},
    });
    console.log("getValues", getValues());
    const { errors } = formState;

    function onSubmit(data) {
        console.log("onSubmit", data);

        if (isEditSession)
            editVehicle(
                { vehicleID: vehicleToEdit._id, vehicle: data },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        else
            createNewVehicle(
                { ...data },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
    }

    function onError(errors) {
        console.log("Form Errors:", errors);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{`${title}`}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="plateNumber">رقم السيارة</Label>
                        <Controller
                            control={control}
                            name="plateNumber"

                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="ادخل رقم السيارة" className={`${errors.plateNumber && "border-red-500"}`} />
                            )}
                        />
                        {errors.plateNumber && <p className="text-red-500 text-sm">{errors.plateNumber.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="capacity">السعة</Label>
                        <Controller
                            control={control}
                            name="capacity"

                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="السعة" className={`${errors.capacity && "border-red-500"}`} />
                            )}
                        />
                        {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                            إلغاء
                        </Button>
                        <Button type="submit">{submitText}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default VehicleForm