import { Button } from '@/src/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import React from 'react'

import { Controller, useForm } from "react-hook-form";

import { useUsers } from '@/src/hooks/useUsers'
import { useCreateOrder } from './useCreateOrder'
import { useEditOrder } from './useEditOrder'
import SelectBySearch from '@/src/components/SelectBySearch'
import { useSchools } from '../schools/useSchools'
import { useSearchParams } from 'react-router-dom'
import { useProjects } from '../projects/useProjects'
import { Roles, StatusOrder } from '@/src/lib/utils/Entities'
import { useVehicles } from '../vehicles/useVehicles'
import { useWells } from '@/src/hooks/useWells'
import { isAfter, startOfDay } from 'date-fns'
import { useAuth } from '@/src/hooks/useAuth'
import { getImageUrl } from '@/src/lib/utils'

const operators = [
    { key: "التضامن", label: "التضامن" },
    { key: "مقاول", label: "مقاول" },
    { key: "ي-كاش", label: "مشتريات" },
]
const orderTypes = [
    { key: "توريد", label: "توريد" },
    { key: "نزح", label: "نزح" },
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
    const { user } = useAuth()
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

    const { control, handleSubmit, watch, reset, formState } = useForm({
        defaultValues: isEditSession
            ? {
                school: orderToEdit?.school._id,
                operator: operators.find(op => orderToEdit?.operator == op.key)?.key,
                transporter: orderToEdit.transporter?._id,
                vehicle: orderToEdit?.vehicle?._id,
                RequiredCapacity: orderToEdit?.RequiredCapacity,
                replyPrice: orderToEdit?.replyPrice,
                driverTrip: orderToEdit?.driverTrip,
                orderType: orderToEdit?.orderType,
                well: orderToEdit?.well?._id,
                status: orderToEdit?.status,
                notes: orderToEdit?.notes,
                buildingImage: orderToEdit?.buildingImage,
                images: orderToEdit?.images,
            }
            : {
                project: projectId,
                status: StatusOrder.NOT_IMPLEMENTED
            },
    });

    const { errors, dirtyFields } = formState;
    const editingFields = Object.keys(dirtyFields);
    const operator = watch("operator");
    const buildingImage = watch("buildingImage")
    const images = watch("images");
    const well = watch("well");

    const { isLoading: loadVehicles, vehicles } = useVehicles()
    const transporterRole = operator === "التضامن" ? Roles.DRIVER : Roles.CONTRACTOR
    const { isLoading: loadTransporters, users: transporters, error } = useUsers({ project: projectId, role: transporterRole })
    const afterToday = isAfter(startOfDay(date), startOfDay(new Date()))

    function onSubmit(data) {
        if (isEditSession) {
            const changedData = {};
            editingFields.forEach((key) => {
                changedData[key] = data[key];
            });

            editOrder(
                {
                    projectId, orderID: orderToEdit._id, order: {
                        ...changedData,
                        oldImages: changedData.images && orderToEdit.images,
                        oldBuildingImage: changedData.buildingImage && orderToEdit.buildingImage,
                        sendingDate: orderToEdit.sendingDate
                    }
                },
                {
                    onSuccess: (data) => {
                        reset();
                        onOpenChange(false)
                    },
                }
            );
        }
        else
            createNewOrder(
                { order: { ...data, sendingDate: date || new Date() }, projectId },
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
                                <SelectBySearch
                                    label={"المدرسة"}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking || loadSchools}
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
                                <SelectBySearch
                                    label={"المشغل"}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking || user.role === transporterRole}
                                    selectItems={operators}
                                    className={`${errors.operator && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.operator && <p className="text-red-500 text-sm">{errors.operator.message}</p>}
                    </div>
                    {operator !== "ي-كاش" && <div className="space-y-2">
                        <Controller
                            control={control}
                            name="transporter"
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <SelectBySearch
                                    label={`ال${transporterRole}`}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking || loadTransporters || user.role === transporterRole}
                                    selectItems={transporters.map(transporter => ({ key: transporter._id, label: transporter.name }))}
                                    className={`${errors.transporter && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.transporter && <p className="text-red-500 text-sm">{errors.transporter.message}</p>}
                    </div>}
                    {operator === "التضامن" &&
                        <>
                            <div className="space-y-2">
                                <Controller
                                    control={control}
                                    name="vehicle"

                                    rules={{ required: "هذا الحقل مطلوب" }}
                                    render={({ field }) => (
                                        <SelectBySearch
                                            label={"السيارة"}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={isWorking || loadVehicles || user.role === transporterRole}
                                            selectItems={vehicles.map(vehicle => ({ key: vehicle._id, label: vehicle.plateNumber }))}
                                            className={`${errors.vehicle && "border-red-500"}`}
                                        />
                                    )}
                                />
                                {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="RequiredCapacity">ترب السائق</Label>
                                <Controller
                                    control={control}
                                    name="driverTrip"
                                    disabled={isWorking || user.role === transporterRole}
                                    render={({ field }) => (
                                        <Input {...field} type="number" placeholder="الترب" className={`${errors.driverTrip && "border-red-500"}`} />
                                    )}
                                />
                                {errors.driverTrip && <p className="text-red-500 text-sm">{errors.driverTrip.message}</p>}
                            </div>
                        </>
                    }
                    {operator !== "التضامن" &&
                        <div className="space-y-2">
                            <Label htmlFor="RequiredCapacity">الكمية المطلوبة</Label>
                            <Controller
                                control={control}
                                name="RequiredCapacity"
                                disabled={isWorking || user.role === transporterRole}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input  {...field} type="number" placeholder="الكمية المطلوبة" className={`${errors.RequiredCapacity && "border-red-500"}`} />
                                )}
                            />
                            {errors.RequiredCapacity && <p className="text-red-500 text-sm">{errors.RequiredCapacity.message}</p>}
                        </div>
                    }
                    {(operator !== "التضامن" || !wells.find(w => w._id == well)?.pricePerUnit) &&
                        <div className="space-y-2">
                            <Label htmlFor="replyPrice">السعر المحدد</Label>
                            <Controller
                                control={control}
                                name="replyPrice"
                                disabled={isWorking || user.role === transporterRole}
                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (

                                    <Input {...field} type="number" placeholder="السعر المحدد" className={`${errors.replyPrice && "border-red-500"}`} />
                                )}
                            />
                            {errors.replyPrice && <p className="text-red-500 text-sm">{errors.replyPrice.message}</p>}
                        </div>
                    }
                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="orderType"
                            rules={{ required: "هذا الحقل مطلوب" }}
                            render={({ field }) => (
                                <SelectBySearch
                                    label={`نوع الطلب`}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isWorking || user.role === transporterRole}
                                    selectItems={orderTypes.map(orderType => ({ key: orderType.key, label: orderType.label }))}
                                    className={`${errors.orderType && "border-red-500"}`}
                                />
                            )}
                        />
                        {errors.orderType && <p className="text-red-500 text-sm">{errors.orderType.message}</p>}
                    </div>
                    {(operator === "التضامن" && watch("orderType") !== "نزح") &&
                        <div className="space-y-2">
                            <Controller
                                control={control}
                                name="well"

                                rules={{ required: "هذا الحقل مطلوب" }}
                                render={({ field }) => (
                                    <SelectBySearch
                                        label={"التحلية"}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={isWorking || loadWells || user.role === transporterRole}
                                        selectItems={wells?.map(well => ({ key: well._id, label: well.name })) || []}
                                        className={`${errors.well && "border-red-500"}`}
                                    />
                                )}
                            />
                            {errors.well && <p className="text-red-500 text-sm">{errors.well.message}</p>}
                        </div>
                    }
                    {!afterToday && <div className="space-y-2">
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: "هذا الحقل مطلوب" }}

                            render={({ field }) => (
                                <SelectBySearch
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
                    {watch("status") == StatusOrder.IMPLEMENTED && <>
                        <div className="space-y-2">
                            <Label>صورة المبنى / اللوحة</Label>
                            <Controller
                                control={control}
                                name="buildingImage"
                                rules={{ required: "هذا الحقل مطلوب في حالة التنفيذ" }}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            field.onChange(e.target.files)
                                        }
                                    />
                                )}
                            />
                            {errors.buildingImage && (
                                <p className="text-red-500 text-sm">
                                    {errors.buildingImage.message}
                                </p>
                            )}
                            {buildingImage && (

                                <img
                                    src={typeof buildingImage === "string" ? getImageUrl(buildingImage) : (URL.createObjectURL(buildingImage[0]))}
                                    alt="building"
                                    className="w-full h-52 object-center rounded-lg border"
                                />

                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>الصور</Label>
                            <Controller
                                control={control}
                                name="images"
                                rules={{ required: "الصور مطلوبة في حالة التنفيذ" }}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) =>
                                            field.onChange(e.target.files)
                                        }
                                    />
                                )}
                            />
                            {errors.images && (
                                <p className="text-red-500 text-sm">
                                    {errors.images.message}
                                </p>
                            )}
                            {images?.length > 0 && (

                                <div className="grid grid-cols-2 gap-2">

                                    {Array.from(images).map((file, index) => (
                                        file && <img
                                            key={index}
                                            src={typeof file === "string" ? getImageUrl(file) : URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-full h-40 object-center rounded-lg border"
                                        />
                                    ))}

                                </div>
                            )}
                        </div>
                    </>}

                    <div className="flex gap-2 justify-end pt-4">
                        <Button type="button" disabled={isWorking} variant="outline" onClick={() => { reset(); onOpenChange(false) }}>
                            إلغاء
                        </Button>
                        <Button type="submit" disabled={isWorking || editingFields.length == 0}>{isWorking ? `جار ال${submitText}` : submitText}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default OrderForm
