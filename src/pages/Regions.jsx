import RegionsTable from "../features/regions/RegionsTable"
import { Card, CardContent } from "../components/ui/card"
import AddEditRegion from "../features/regions/AddEditRegion"
import { Roles } from "../lib/utils/Entities"
import AuthGuard from "../components/gards/AuthGuard"
import AuthFeature from "../components/gards/AuthFeature"


export default function Regions() {
  return (
    <AuthGuard roles={[Roles.MANAGER]}>
      <Card>
        <CardContent>
          <AuthFeature roles={[Roles.ADMIN]}>
            <AddEditRegion />
          </AuthFeature>

          <RegionsTable />
        </CardContent>
      </Card>
    </AuthGuard>
  )
}


