
import { useState } from "react"
import EntitiesPage from "../components/EntitiesPage"
import SelectCom from "../components/SelectCom"

const regions = [
  { key: "nourth", label: "منطقة الشمال" },
  { key: "nourth2", label: "منطقة الجنوب" },
  { key: "nourth3", label: "منطقة الشرق" }
]

const projects = [
  { key: "nourth", label: "مشروع توريد المياه - الشمال" },
  { key: "nourth2", label: "مشروع صيانة الآبار" },
  { key: "nourth3", label: "مشروع توسعة الشبكة" }
]

const mockVehicles = [
  { id: 1, plateNumber: "أ ب ج 1234", type: "شاحنة", capacity: 10000, project: "مشروع صيانة الآبار", driver: "3", status: "available" },
  { id: 2, plateNumber: "د هـ و 5678", type: "صهريج", capacity: 15000, driver: "3", status: "in-use" },
  { id: 3, plateNumber: "ز ح ط 9012", type: "شاحنة", capacity: 8000, driver: "3", status: "maintenance" },
]
const columns = [
  { key: "plateNumber", label: "رقم اللوحة" },
  // { key: "type", label: "النوع" },
  {
    key: "capacity",
    label: "السعة",
    render: (vehicle) => `${vehicle.capacity.toLocaleString()} لتر`,
  },
  {
    key: "driver",
    label: "السائق",
    render: (driver) => driver.name,
  }
]

const formFields = [
  { name: "plateNumber", label: "رقم اللوحة", type: "text", required: true },
  {
    name: "type",
    label: "النوع",
    type: "select",
    required: true,
    options: [
      { value: "شاحنة", label: "شاحنة" },
      { value: "صهريج", label: "صهريج" },
    ],
  },
  { name: "capacity", label: "السعة (لتر)", type: "number", required: true },
  {
    name: "driverId",
    label: "السائق",
    type: "select",
    required: true,
    options: [{ value: "3", label: "سائق 1" }],
  }
]

export default function VehiclesPage() {

  const [regionFilter, setRegionFilter] = useState(regions[0])
  const [projectFilter, setProjectFilter] = useState(projects[0])
  console.log("projectFilter", projectFilter);

  const filteredProjects = mockVehicles.filter(project => project.project === projectFilter.label)


  return (
    <EntitiesPage
      entityName={"سيارة"}
      mockEntity={filteredProjects}
      columns={columns}
      formFields={formFields}
    >
      <SelectCom label={"المنطقة"}
        value={regionFilter.label}
        onValueChange={setRegionFilter}
        selectItems={regions}
      />

      <SelectCom label={"المشروع"}
        value={projectFilter.label}
        onValueChange={setProjectFilter}
        selectItems={projects}
      />
    </EntitiesPage>
  )
}
