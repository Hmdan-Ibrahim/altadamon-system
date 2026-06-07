import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import React from 'react'
import { useReports } from './useReports'
import { handleError } from '@/src/services/api/api'
import AuthFeature from '@/src/components/gards/AuthFeature'
import { Roles } from '@/src/lib/utils/Entities'

function CardDetails({ title, total }) {
    return (
        < Card>
            <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium">{title}</p>
                <p className="text-3xl font-bold mt-2">{total}</p>
            </CardContent>
        </Card >
    )
}

function TotalMonthly() {
    const { isLoading, reports: { grandTotalCapacity = 0, grandTotalOrders = 0, grandTotalPrice = 0, grandTotalRevenue = 0 }, error } = useReports()

    if (isLoading) return <h1 className="m-auto font-bold text-6xl">جاري التحميل...</h1>
    if (error) return <Error text={handleError(error)} />
    return (
        <Card>
            <CardHeader className="text-xl font-bold pb-0">الإجمالي الشهري للمشروع</CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardDetails title="إجمالي الاطنان" total={grandTotalCapacity} />
                    <CardDetails title="إجمالي الردود" total={grandTotalOrders} />
                    <AuthFeature withoutRoles={[Roles.DRIVER, Roles.CONTRACTOR]} >
                        <CardDetails title="إجمالي الاستحقاق" total={grandTotalPrice} />
                        <CardDetails title="إجمالي الايرادات" total={grandTotalRevenue} />
                    </AuthFeature>
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalMonthly