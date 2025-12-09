import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import { useUsers } from '@/src/hooks/useUsers'
import { useCreateOrder } from './useCreateOrder'
import { useEditOrder } from './useEditOrder'
import SelectCom from '@/src/components/SelectCom'
import { useSchools } from '../schools/useSchools'
import { useSearchParams } from 'react-router-dom'
import { useProjects } from '../projects/useProjects'
import { StatusOrder } from '@/src/lib/utils/Entities'
import { useVehicles } from '../vehicles/useVehicles'
import { useWells } from '@/src/hooks/useWells'
import { isAfter, startOfDay } from 'date-fns'

const operators = [
    { key: "التضامن", label: "التضامن" },
    { key: "مقاول", label: "مقاول" },
    { key: "ي-كاش", label: "مشتريات" },
]
const status = [
    { key: StatusOrder.IMPLEMENTED, label: StatusOrder.IMPLEMENTED },
    { key: StatusOrder.NOT_IMPLEMENTED, label: StatusOrder.NOT_IMPLEMENTED },
]

function OrderForm({
    open,
    onOpenChange,
    orderToEdit,
    title,
    onSubmit,
    submitText = "حفظ",
}) {
    const { projects } = useProjects()
    const { isLoading: loadSchools, schools } = useSchools()
    const { isLoading: loadWells, wells } = useWells()
    const { isCreating, createNewOrder } = useCreateOrder();
    const { isEditing, editOrder } = useEditOrder();
    const isWorking = isCreating || isEditing;
    const isEditSession = !!orderToEdit;

    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")
    const projectId = projects?.find(project => project.name === searchParams.get("project"))?._id

    const { control, handleSubmit, watch, getValues, reset, formState } = useForm({
        defaultValues: isEditSession
            ? {
                school: orderToEdit?.school._id || undefined,
                operator: operators.find(op => orderToEdit?.operator == op.key)?.key || undefined,
                transporter: orderToEdit?.transporter._id || undefined,
                RequiredCapacity: orderToEdit?.RequiredCapacity || undefined,
                replyPrice: orderToEdit?.replyPrice || undefined,
                well: orderToEdit?.well._id || undefined,
                status: orderToEdit?.status || undefined,
                notes: orderToEdit?.notes || undefined,
            }
            : {
                project: projectId
            },
    });
    const { errors } = formState;
    const { isLoading: loadVehicles, vehicles } = useVehicles()
    const transporterRole = watch("operator") === "التضامن" ? "سائق" : "مقاول"
    const { isLoading, users: transporters, error } = useUsers({ project: projectId, role: transporterRole })
    const afterToday = isAfter(startOfDay(date), startOfDay(new Date()))
    console.log("|| isToday(startOfDay(date));", startOfDay(date), "getttt", getValues(), orderToEdit);


    function onSubmit(data) {


        if (isEditSession)
            editOrder(
                { orderID: orderToEdit._id, order: data },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        else
            createNewOrder(
                { ...data, sendingDate: date || new Date() },
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
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="w-[90%] h-[90%] overflow-auto rounded-xl max-w-md m-auto">
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
                                    disabled={isWorking || isEditSession}
                                    selectItems={schools.map(school => ({ key: school._id, label: school.name }))}
                                    className={`${errors.school && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.school && <p className="text-red-500 text-sm">{errors.school.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="operator"
                            rules={{ required: "هذا الحقل مطلوب" }}

                            render={({ field }) => (
                                <SelectCom
                                    label={"المشغل"}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking}
                                    selectItems={operators}
                                    className={`${errors.operator && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.operator && <p className="text-red-500 text-sm">{errors.operator.message}</p>}
                    </div>
                    {watch("operator") !== "ي-كاش" && <div className="space-y-2">
                        <Controller
                            control={control}
                            name="transporter"
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <SelectCom
                                    label={`ال${transporterRole}`}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking}
                                    selectItems={transporters.map(transporter => ({ key: transporter._id, label: transporter.name }))}
                                    className={`${errors.transporter && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.transporter && <p className="text-red-500 text-sm">{errors.transporter.message}</p>}
                    </div>}
                    {watch("operator") === "التضامن" &&
                        <div className="space-y-2">
                            <Controller
                                control={control}
                                name="vehicle"

                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (
                                    <SelectCom
                                        label={"السيارة"}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isWorking}
                                        selectItems={vehicles.map(vehicle => ({ key: vehicle._id, label: vehicle.plateNumber }))}
                                        className={`${errors.vehicle && "border-red-500"}`}
                                    />
                                )}
                            />
                            {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle.message}</p>}
                        </div>
                    }
                    {watch("operator") !== "التضامن" &&
                        <div className="space-y-2">
                            <Label htmlFor="RequiredCapacity">الكمية المطلوبة</Label>
                            <Controller
                                control={control}
                                name="RequiredCapacity"
                                disabled={isWorking}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input value={field.value} {...field} type="number" placeholder="الكمية المطلوبة" className={`${errors.RequiredCapacity && "border-red-500"}`} />
                                )}
                            />
                            {errors.RequiredCapacity && <p className="text-red-500 text-sm">{errors.RequiredCapacity.message}</p>}
                        </div>
                    }
                    {watch("operator") !== "التضامن" &&
                        <div className="space-y-2">
                            <Label htmlFor="replyPrice">السعر المحدد</Label>
                            <Controller
                                control={control}
                                name="replyPrice"
                                disabled={isWorking}
                                // rules={{ required: getValues.operator !== "التضامن" && "هذا الحقل مطلوب" }}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input value={field.value} {...field} type="number" placeholder="السعر المحدد" className={`${errors.replyPrice && "border-red-500"}`} />
                                )}
                            />
                            {errors.replyPrice && <p className="text-red-500 text-sm">{errors.replyPrice.message}</p>}
                        </div>
                    }
                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="well"

                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <SelectCom
                                    label={"البئر"}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking}
                                    selectItems={wells.map(well => ({ key: well._id, label: well.name }))}
                                    className={`${errors.well && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.well && <p className="text-red-500 text-sm">{errors.well.message}</p>}
                    </div>
                    {!afterToday && <div className="space-y-2">
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: "هذا الحقل مطلوب" }}

                            render={({ field }) => (
                                <SelectCom
                                    label={"الحالة"}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking}
                                    selectItems={status}
                                    className={`${errors.status && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>}
                    <div className="space-y-2">
                        <Label htmlFor="notes">ملاحظات</Label>
                        <Controller
                            control={control}
                            name="notes"
                            disabled={isWorking}
                            render={({ field }) => (
                                <Input {...field} value={field.value} placeholder="ملاحظات" className={`${errors.notes && "border-red-500"}`} />
                            )}
                        />
                        {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" disabled={isWorking} variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isWorking}>{submitText}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default OrderForm
