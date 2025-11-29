import { Card, CardContent } from "../components/ui/card"
import SchoolsTableOperations from "../features/schools/SchoolsTableOperations"
import SchoolsTable from "../features/schools/SchoolsTable"
import AuthFeature from "../components/gards/AuthFeature"
import { Roles } from "../lib/utils/Entities"


export default function ProjectsPage() {

  return (
    <>
      <Card>
        <CardContent>
          <AuthFeature roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
            <SchoolsTableOperations />
          </AuthFeature>
          <SchoolsTable />
        </CardContent>
      </Card>
    </>
  )
}
