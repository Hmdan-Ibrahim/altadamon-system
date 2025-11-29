
import { Card, CardContent } from "../components/ui/card"
import DailyOrdersTable from "../features/daily-orders/DailyOrdersTable"
import DailyOrdersTableOperations from "../features/daily-orders/DailyOrdersTableOperations"

export default function DailyOrdersPage() {

    return (
        <Card>
            <CardContent className="p-6">
                <DailyOrdersTableOperations />
                <DailyOrdersTable />
            </CardContent>
        </Card>
    )
}
