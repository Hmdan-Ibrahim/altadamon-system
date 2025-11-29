import { Card, CardContent, CardHeader } from '@/src/components/ui/card'
import React from 'react'
import { useReports } from './useReports'
import { handleError } from '@/src/services/api/api'

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
    const { isLoading, reports: { grandTotalCapacity = 0, grandTotalOrders = 0, grandTotalPrice = 0 }, error } = useReports()

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />
    return (
        <Card>
            <CardHeader className="text-xl font-bold pb-0">الإجمالي الشهري للمشروع</CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CardDetails title="إجمالي السعة" total={grandTotalCapacity} />
                    <CardDetails title="إجمالي الأطنان" total={grandTotalOrders} />
                    <CardDetails title="السعر الإجمالي" total={grandTotalPrice} />
                </div>
            </CardContent>
        </Card>
    )
}

export default TotalMonthly