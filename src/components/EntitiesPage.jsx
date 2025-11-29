import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import SelectCom from "./SelectCom"
import { useUsers } from "../hooks/useUsers"
import { Card, CardContent } from "./ui/card"
import { DataTable } from "./data-table"
import { FormDialog } from "./form-dialog"

export default function EntitiesPage(props) {
  const { entityName, mockEntity, columns, formFields, children } = props

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEntity, setEditingEntity] = useState(null)
  const [fieldFilter, setFieldFilter] = useState(columns[0])
  const [searchTerm, setSearchTerm] = useState("")

  const isRegion = entityName.includes("منطقة" || "بئر")

  const filteredData = mockEntity.filter((item) => String(item[fieldFilter.key]).toLowerCase().includes(searchTerm.toLowerCase()))

  const { isLoading, users, error } = useUsers({ role: "مدير عام" }, { enabled: dialogOpen })

  if (dialogOpen && !isLoading) {
    formFields.map((field, index) => {
      if (field.type === "select") {
        console.log("formField", field);
        console.log("users", users);

        formFields[index].options = users.data.map(user => ({ key: user._id, label: user.name }))
      }
    })
  }

  const handleAdd = () => {
    setEditingEntity(null)
    setDialogOpen(true)
  }

  const handleEdit = (entity) => {
    setEditingEntity(entity)
    setDialogOpen(true)
  }

  const handleDelete = (entity) => {
    if (confirm(`هل أنت متأكد من حذف ${entity.name}؟`)) {
      // setEntity(entity.filter((e) => e.id !== entity.id))
    }
  }

  const handleSubmit = (data) => {
    console.log(data);

    if (editingEntity) {
      console.log("editingEntity", editingEntity, data);
      // setEntity(entity.map((e) => (e.id === editingEntity.id ? { ...e, ...data } : e)))
    } else {
      console.log("Not");

    }
  }

  return (
    <Card className="py-0">
      <CardContent className="p-6 space-y-4">
        <div className={`flex items-end gap-4`}>
          {children}
          {!isRegion && <SelectCom label={"حقل البحث"}
            value={fieldFilter.label}
            onValueChange={setFieldFilter}
            selectItems={columns}
          />}
        </div>
        <div className={`flex items-end justify-end gap-4`}>
          {!isRegion &&
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`بحث عن ${entityName} ...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>}
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            {`إضافة ${entityName}`}
          </Button>
        </div>
        <DataTable
          data={filteredData}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showSelect={false}
        // render= 
        />
      </CardContent>

      {dialogOpen && <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingEntity ? `تعديل ${entityName}` : `إضافة ${entityName} جديدة`}
        fields={formFields}
        initialData={editingEntity || {}}
        onSubmit={handleSubmit}
      />}
    </Card>
  )
}
