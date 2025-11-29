import { Routes, Route, Navigate } from "react-router-dom"
import React, { Suspense, lazy } from "react"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import DashboardLayout from "./components/layout/DashboardLayout"
import LoginPage from "./pages/LoginPage"

// Lazy load الصفحات الكبيرة
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Regions = lazy(() => import("./pages/Regions"))
const Projects = lazy(() => import("./pages/Projects"))
const Schools = lazy(() => import("./pages/Schools"))
const WellsList = lazy(() => import("./pages/Wells"))
const ReportsPage = lazy(() => import("./pages/Reports"))
const DailyOrdersPage = lazy(() => import("./pages/DailyOrders"))
const VehiclesPage = lazy(() => import("./pages/Vehicles"))
const ScheduleTablePage = lazy(() => import("./pages/ScheduleTablePage"))


function App() {
  return (
    <Suspense fallback={<h1 className="m-auto font-bold text-6xl">Loading...</h1>}>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Navigate replace to={"dashboard"} />} />

          <Route path="dashboard" >
            <Route index element={<Dashboard />} />
            <Route path="regions" element={<Regions />} />
            <Route path="projects" element={<Projects />} />
            <Route path="schools" element={<Schools />} />
            <Route path="vehicles" element={<VehiclesPage />} />
            <Route path="wells" element={<WellsList />} />
            <Route path="daily-orders" element={<DailyOrdersPage />} />
            <Route path="schedule-table" element={<ScheduleTablePage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>this resourse is not found</h1>} />
      </Routes>
    </Suspense>
  )
}

export default App
