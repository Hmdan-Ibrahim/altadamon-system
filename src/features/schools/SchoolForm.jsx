import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import { useCreateSchool } from './useCreateSchool'
import { useEditSchool } from './useEditSchool'
import { useProjects } from '../projects/useProjects'
import { useSearchParams } from 'react-router-dom'
import { useUsers } from '@/src/hooks/useUsers'
import { Roles } from '@/src/lib/utils/Entities'
import { FieldSelect } from '@/src/components/FieldSelect'

function SchoolForm({
    open,
    onOpenChange,
    schoolToEdit,
    title,
    onSubmit,
    submitText = "حفظ",
}) {
    const { projects, error } = useProjects()
    const { isCreating, createNewSchool } = useCreateSchool();
    const { isEditing, editSchool } = useEditSchool();


    const [searchParams] = useSearchParams()
    const projectId = projects?.find(project => project.name === searchParams.get("project"))?._id
    const { users: supervisors } = useUsers({ project: projectId, role: Roles.SUPERVISOR })

    const isEditSession = !!schoolToEdit;

    const { control, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession
            ? {
                name: schoolToEdit?.name || undefined,
                district: schoolToEdit?.district || undefined,
                neighborhood: schoolToEdit?.neighborhood || undefined,
                ministerialNumber: schoolToEdit?.ministerialNumber || undefined,
                supervisor: schoolToEdit?.supervisor?._id || undefined
            }
            : {
                project: projectId
            },
    });
    const { errors, isSubmitting, dirtyFields } = formState;
    const editingFields = Object.keys(dirtyFields);
    const isWorking = isCreating || isEditing || isSubmitting;

    function onSubmit(data) {
        if (isEditSession) {
            const changedData = {};
            editingFields.forEach((key) => {
                changedData[key] = data[key];
            });
            editSchool(
                { schoolID: schoolToEdit._id, school: changedData },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        }
        else
            createNewSchool(
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
        console.error("Form Errors:", errors);
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{`${title}`}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">اسم المدرسة</Label>
                        <Controller
                            control={control}
                            name="name"

                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="اسم المدرسة" disabled={isWorking} className={`${errors.name && "border-red-500"}`} />
                            )}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="district">المنطقة</Label>
                        <Controller
                            control={control}
                            name="district"

                            // rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="المنطقة" disabled={isWorking} className={`${errors.district && "border-red-500"}`} />
                            )}
                        />
                        {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="neighborhood">الحي</Label>
                        <Controller
                            control={control}
                            name="neighborhood"

                            // rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="اسم الحي" disabled={isWorking} className={`${errors.neighborhood && "border-red-500"}`} />
                            )}
                        />
                        {errors.neighborhood && <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ministerialNumber">الرقم الوزاري</Label>
                        <Controller
                            control={control}
                            name="ministerialNumber"
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="الرقم الوزاري" disabled={isWorking} className={`${errors.ministerialNumber && "border-red-500"}`} />
                            )}
                        />
                        {errors.ministerialNumber && <p className="text-red-500 text-sm">{errors.ministerialNumber.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="supervisor"
                            render={({ field }) => (
                                <FieldSelect label={"المشرف"}
                                    onChange={field.onChange}
                                    value={field.value}
                                    fields={supervisors.map(supervisor => ({ key: supervisor._id, label: supervisor.name }))} />
                            )}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isWorking || editingFields.length == 0}>{isWorking
                            ? isEditSession
                                ? "جارٍ حفظ التعديلات..."
                                : "جارٍ إنشاء المدرسة..."
                            : submitText}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SchoolForm
