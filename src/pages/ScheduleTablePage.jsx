import { Card, CardContent } from "../components/ui/card"
import ScheduleTable from "../features/schedule's table/ScheduleTable"
import ScheduleTableOperations from "../features/schedule's table/ScheduleTableOperations"
import AuthGuard from "../components/gards/AuthGuard"
import { Roles } from "../lib/utils/Entities"


export default function ScheduleTablePage() {
    return (
        <AuthGuard roles={[Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER]}>
            <div className="space-y-6">
                {/* Filters */}
                <Card>
                    <CardContent>
                        <ScheduleTableOperations />
                        <ScheduleTable />
                    </CardContent>
                </Card>
            </div>
        </AuthGuard>
    )
}
