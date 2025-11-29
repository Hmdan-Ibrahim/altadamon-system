import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React, { useState } from 'react'

import { Controller, useForm } from "react-hook-form";

import SelectCom from '@/src/components/SelectCom'
import { useSchools } from '../schools/useSchools'
import { useSearchParams } from 'react-router-dom'
import { useProjects } from '../projects/useProjects'
import { useWells } from '@/src/hooks/useWells'
import ReplaiesDistributionTable from './ReplaiesDistributionTable'

const operators = [
    { key: "التضامن", label: "التضامن" },
    { key: "مقاول", label: "مقاول" },
    { key: "مشتريات", label: "مشتريات" },
]

function ScheduleForm({
    open,
    onOpenChange,
    orderToEdit,
    title,
    onSubmit,
    submitText = "انشاء توزيع",
}) {
    const [openDistribution, setOpenDistribution] = useState(false)

    const { isLoading, projects } = useProjects()
    const { isLoading: loadSchools, schools } = useSchools()
    const { isLoading: loadWells, wells } = useWells()
    const isWorking = loadSchools || loadWells || isLoading;
    const isEditSession = !!orderToEdit;

    const [searchParams] = useSearchParams()
    const projectId = projects?.find(project => project.name === searchParams.get("project"))?._id


    const { control, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession
            ? {
                name: orderToEdit?.name || undefined,
                address: orderToEdit?.address || undefined
            }
            : {
                project: projectId
            },
    });
    const { errors } = formState;
    // const transporterRole = watch("operator") === "التضامن" ? "سائق" : "مقاول"
    // const { isLoading, users, error } = useUsers({ project: projectId })

    function onSubmit(data) {
        setOpenDistribution(true)
    }

    function onError(errors) {
        console.log("Form Errors:", errors);
    }
    return (
        <>
            {openDistribution && <ReplaiesDistributionTable title={schools.find(school => getValues().school === school._id).name} data={{ ...getValues(), project: projectId }} open={openDistribution} onOpenChange={setOpenDistribution} />}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{`${title}`}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                        <div className="space-y-2">
                            <Controller
                                control={control}
                                name="school"

                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (
                                    <SelectCom
                                        label={"المدرسة"}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isWorking}
                                        selectItems={schools.map(school => ({ key: school._id, label: school.name }))}
                                        className={`${errors.school && "border-red-500"}`}
                                    />
                                )}
                            />
                            {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="numOfReplies">عدد الردود</Label>
                            <Controller
                                control={control}
                                name="numOfReplies"

                                // rules={{ required: getValues.operator !== "التضامن" && "هذا الحقل مطلوب" }}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input {...field} type="number" placeholder="عدد الردود" className={`${errors.numOfReplies && "border-red-500"}`} />
                                )}
                            />
                            {errors.numOfReplies && <p className="text-red-500 text-sm">{errors.numOfReplies.message}</p>}
                        </div>
                        {/* } */}
                        {/* {watch("operator") !== "التضامن" && */}
                        <div className="space-y-2">
                            <Label htmlFor="RequiredCapacity">السعة المحددة</Label>
                            <Controller
                                control={control}
                                name="RequiredCapacity"

                                // rules={{ required: getValues.operator !== "التضامن" && "هذا الحقل مطلوب" }}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input {...field} type="number" placeholder="السعة المحددة" className={`${errors.RequiredCapacity && "border-red-500"}`} />
                                )}
                            />
                            {errors.RequiredCapacity && <p className="text-red-500 text-sm">{errors.RequiredCapacity.message}</p>}
                        </div>
                        <DialogFooter>
                            {/* <div className="flex gap-2 justify-end pt-4"> */}
                            <Button type="button" disabled={isWorking} variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                                إلغاء
                            </Button>
                            <Button type="submit" disabled={isWorking}>{submitText}</Button>
                            {/* </div> */}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default ScheduleForm