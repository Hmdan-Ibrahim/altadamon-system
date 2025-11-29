
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { MapPin, FolderKanban, School, Truck } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Roles } from "../lib/utils/Entities"

// Mock data
const stats = [
  { name: "المناطق", key: "regions", veiwFor: [Roles.MANAGER], icon: MapPin, color: "text-blue-600" },
  { name: "المشاريع", key: "projects", veiwFor: [Roles.MANAGER, Roles.REGION_MANAGER], icon: FolderKanban, color: "text-purple-600" },
  { name: "المدارس", key: "schools", veiwFor: [Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER], icon: School, color: "text-green-600" },
  { name: "المركبات", key: "vehicles", veiwFor: [Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER, Roles.SUPERVISOR], icon: Truck, color: "text-orange-600" },

]

const ordersData = [
  { day: "السبت", orders: 120 },
  { day: "الأحد", orders: 145 },
  { day: "الاثنين", orders: 132 },
  { day: "الثلاثاء", orders: 168 },
  { day: "الأربعاء", orders: 156 },
  { day: "الخميس", orders: 142 },
  { day: "الجمعة", orders: 98 },
]

const deliveryData = [
  { month: "يناير", delivered: 3200 },
  { month: "فبراير", delivered: 3400 },
  { month: "مارس", delivered: 3100 },
  { month: "أبريل", delivered: 3600 },
  { month: "مايو", delivered: 3800 },
  { month: "يونيو", delivered: 3500 },
]

function CountDucs() {
  const user = { name: "ahmed", role: Roles.MANAGER }
  return (
    <>
      {
        stats.map((stat) => (
          < Card key={stat.key}>

            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold mt-2">{stat.key}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card >
        ))
      }
    </>
  )
}

export default function Dashboard() {
  return (

    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CountDucs />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>الطلبات الأسبوعية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Chart */}
        <Card>
          <CardHeader>
            <CardTitle>التوصيلات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="delivered"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--accent))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>


  )
}
