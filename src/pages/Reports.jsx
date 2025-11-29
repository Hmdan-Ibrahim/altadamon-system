import { Card, CardContent } from "../components/ui/card"
import ReportsTable from "../features/reports/ReportsTable"
import ReportsTableOperations from "../features/reports/ReportsTableOperations"
import TotalMonthly from "../features/reports/TotalMonthly"

export default function ReportsPag() {

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card>
                <CardContent>
                    <ReportsTableOperations />
                    <ReportsTable />
                </CardContent>
            </Card>
            <TotalMonthly />
        </div>
    )
}
