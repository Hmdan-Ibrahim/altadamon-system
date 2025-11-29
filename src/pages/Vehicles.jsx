import { Card, CardContent } from "../components/ui/card"
import VehiclesTableOperations from "../features/schools/SchoolsTableOperations"
import VehiclesTable from "../features/vehicles/VehiclesTable"

export default function VehiclesPage() {

  return (
    <>
      <Card>
        <CardContent>
          <VehiclesTableOperations />
          <VehiclesTable />
        </CardContent>
      </Card>
    </>
  )
}
