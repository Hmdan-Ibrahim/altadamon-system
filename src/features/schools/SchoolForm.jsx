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
import SelectCom from '@/src/components/SelectCom'

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
                supervisor: schoolToEdit?.supervisor?._id || undefined
            }
            : {
                // project: projectId
            },
    });
    const { errors, isSubmitting } = formState;
    const isWorking = isCreating || isEditing || isSubmitting;

    function onSubmit(data) {
        if (isEditSession)
            editSchool(
                { schoolID: schoolToEdit._id, school: data },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
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
                        <Label htmlFor="name">اسم المدرسة</Label>
                        <Controller
                            control={control}
                            name="name"

                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="اسم المنطقة" disabled={isWorking} className={`${errors.name && "border-red-500"}`} />
                            )}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="supervisor"

                            // rules={{ required: "هذا الحقل مطلوب" }}
                            //     render={({ field }) => (
                            //         <Input {...field} placeholder="العنوان" disabled={isWorking} className={`${errors.address && "border-red-500"}`} />
                            //     )}
                            // />
                            render={({ field }) => (
                                <SelectCom label={"المشرف"}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    selectItems={supervisors.map(supervisor => ({ key: supervisor._id, label: supervisor.name }))} />
                            )}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isWorking}>{isWorking
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