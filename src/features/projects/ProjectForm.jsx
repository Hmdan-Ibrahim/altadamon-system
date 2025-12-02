import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import SelectCom from '@/src/components/SelectCom'
import { useUsers } from '@/src/hooks/useUsers'
import { useCreateProject } from './useCreateProject'
import { useEditProject } from './useEditProject'
import { useRegions } from '../regions/useRegions'
import { Roles } from '@/src/lib/utils/Entities'
import { useSearchParams } from 'react-router-dom'

function ProjectForm({
    open,
    onOpenChange,
    projectToEdit,
    title,
    onSubmit,
    submitText = "حفظ",
}) {
    const { isLoading, users, error } = useUsers({ role: Roles.PROJECT_MANAGER })
    const { isLoading: regLoading, regions, error: regError } = useRegions()
    const { isCreating, createNewProject } = useCreateProject();
    const { isEditing, editProject } = useEditProject();
    const isWorking = isCreating || isEditing;

    const [searchParams] = useSearchParams()
    const isEditSession = !!projectToEdit;


    const { control, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession
            ? {
                name: projectToEdit?.name || undefined,
                region: projectToEdit?.region._id || undefined,
                manager: projectToEdit?.manager?._id || undefined
            }
            : {
                // region: regions?.find(region => region.name === searchParams.get("region"))?._id,
            },
    });
    const { errors } = formState;

    function onSubmit(data) {
        if (isEditSession)
            editProject(
                { projectID: projectToEdit._id, project: { ...data } },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        else
            createNewProject(
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

    if (isLoading || regLoading) return <h1>Loading...</h1>
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{`${title}`}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">اسم المشروع</Label>
                        <Controller
                            control={control}
                            name="name"
                            disabled={isWorking}
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <Input {...field} placeholder="اسم المشروع" className={`${errors.name && "border-red-500"}`} />
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

export default ProjectForm