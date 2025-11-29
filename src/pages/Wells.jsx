import EntitiesPage from "../components/EntitiesPage"

const mockWells = [
  { id: 1, name: "بئر الشمال 1" },
  { id: 2, name: "بئر الجنوب 1" },
  { id: 3, name: "بئر الشرق 1", pricePerUnit: 1, depth: 180, capacity: 60000, status: "maintenance" },
]

const columns = [
  { key: "name", label: "اسم البئر" },

  { key: "pricePerUnit", label: "السعر/وحدة" },
]

const formFields = [
  { name: "name", label: "اسم البئر", type: "text", required: true },
  { name: "pricePerUnit", label: "السعر/وحدة", type: "text", required: true },

]

export default function WellsPage() {

  return (
    <EntitiesPage
      entityName={"بئر"}
      mockEntity={mockWells}
      columns={columns}
      formFields={formFields}
    />
  )
}
