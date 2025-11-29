import RegionsTable from "../features/regions/RegionsTable"
import { Card, CardContent } from "../components/ui/card"
import AddEditRegion from "../features/regions/AddEditRegion"
import { Roles } from "../lib/utils/Entities"
import AuthGuard from "../components/gards/AuthGuard"


export default function Regions() {
  return (
    <AuthGuard roles={[Roles.MANAGER]}>
      <Card>
        <CardContent>
          <AddEditRegion />
          <RegionsTable />
        </CardContent>
      </Card>
    </AuthGuard>
  )
}


