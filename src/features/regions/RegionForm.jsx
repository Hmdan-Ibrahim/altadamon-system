import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import SelectCom from '@/src/components/SelectCom'
import { useUsers } from '@/src/hooks/useUsers'
import { useCreateRegion } from './useCreateRegion'
import { useEditRegion } from './useEditRegion'
import { Roles } from '@/src/lib/utils/Entities'


function RegionForm({
    open,
    onOpenChange,
    regionToEdit,
    title,
    onSubmit,
    submitText = "حفظ",
}) {
    const { isLoading, users, error } = useUsers({ role: Roles.REGION_MANAGER })
    const { isCreating, createNewRegion } = useCreateRegion();
    const { isEditing, editRegion } = useEditRegion();
    const isWorking = isCreating || isEditing || isLoading;

    // const { _id: editId, ...editValues } = regionToEdit;
    const isEditSession = !!regionToEdit;

    const { control, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession
            ? { name: regionToEdit?.name || undefined, manager: regionToEdit?.manager?._id || undefined }
            : {},
    });
    const { errors } = formState;

    function onSubmit(data) {
        if (isEditSession)
            editRegion(
                { regionID: regionToEdit._id, region: data },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        else
            createNewRegion(
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
                        <Label htmlFor="name">اسم المنطقة</Label>
                        <Controller
                            control={control}
                            name="name"
                            disabled={isWorking}
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="اسم المنطقة" className={`${errors.name && "border-red-500"}`} />
                            )}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <Controller
                        control={control}
                        name="manager"
                        render={({ field }) => (
                            <SelectCom label={"المدير"}
                                onValueChange={field.onChange}
                                disabled={isWorking}
                                value={field.value}
                                selectItems={users.map(user => ({ key: user._id, label: user.name }))} />
                        )}
                    />
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

export default RegionForm