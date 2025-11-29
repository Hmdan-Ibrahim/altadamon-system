import { Card, CardContent } from "../components/ui/card"
import ProjectsTable from "../features/projects/ProjectsTable"
import ProjectTableOperations from "../features/projects/ProjectTableOperations"
import AuthFeature from "../components/gards/AuthFeature"
import { Roles } from "../lib/utils/Entities"
import AuthGuard from "../components/gards/AuthGuard"

export default function ProjectsPage() {

  return (
    <AuthGuard roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
      <Card>
        <CardContent>
          <AuthFeature roles={[Roles.MANAGER]}>
            <ProjectTableOperations />
          </AuthFeature>
          <ProjectsTable />
        </CardContent>
      </Card>
    </AuthGuard>
  )
}
{/* <DataTable
          data={projects}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder="بحث في المشاريع..."
          addButtonText="إضافة مشروع"
        />
      

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}
        fields={formFields}
        initialData={editingProject || {}}
        onSubmit={handleSubmit}
      /> */}