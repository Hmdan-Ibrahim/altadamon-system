import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import React, { useState } from "react"
import { Button } from "../ui/button"
import {
    LayoutDashboard,
    MapPin,
    FolderKanban,
    School,
    Users,
    Truck,
    Droplet,
    ClipboardList,
    BarChart3,
    Menu,
    X,
} from "lucide-react"
import AuthFeature from '../gards/AuthFeature'
import { useAuth } from '@/src/hooks/useAuth'
import { Roles } from '@/src/lib/utils/Entities'

const navigation = [
    { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
    { name: "المناطق", href: "/dashboard/regions", icon: MapPin, viewFor: [Roles.MANAGER] },
    { name: "المشاريع", href: "/dashboard/projects", icon: FolderKanban, viewFor: [Roles.MANAGER, Roles.REGION_MANAGER] },
    { name: "المدارس", href: "/dashboard/schools", icon: School, viewFor: [Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER] },
    { name: "المستخدمين", href: "/dashboard/users", icon: Users, viewFor: [Roles.MANAGER] },
    { name: "السيارات", href: "/dashboard/vehicles", icon: Truck, viewFor: [Roles.MANAGER] },
    { name: "الآبار", href: "/dashboard/wells", icon: Droplet, viewFor: [Roles.MANAGER] },
    { name: "الطلبات اليومية", href: "/dashboard/daily-orders", icon: ClipboardList },
    { name: "الجدول الزمني", href: "/dashboard/schedule-table", icon: ClipboardList, viewFor: [Roles.MANAGER, Roles.REGION_MANAGER, Roles.PROJECT_MANAGER] },
    { name: "التقارير", href: "/dashboard/reports", icon: BarChart3 },
]

export function DashboardLayout() {
    const pathname = useLocation().pathname;
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, logout } = useAuth()


    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Droplet className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">توريد المياه</h1>
                                <p className="text-xs text-muted-foreground">نظام الإدارة</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <AuthFeature roles={item.viewFor}>
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                                            }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </AuthFeature>
                            )
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-border">
                        <Button variant="outline" className="w-full justify-start gap-3 hover:bg-destructive" onClick={handleLogout}>
                            {/* < className="w-5 h-5" /> */}
                            <span>تسجيل الخروج</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:mr-64">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-card border-b border-border">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-8">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                        <div className="flex-1 lg:flex-none">
                            <h2 className="text-xl font-bold">
                                {navigation.find((item) => item.href === pathname)?.name || "لوحة التحكم"}
                            </h2>
                        </div>
                        {user && (
                            <div className="px-6 py-1  ">
                                <p className="text-sm font-medium">{user?.name}</p>
                                <p className="text-xs text-primary mt-1">{user?.role}</p>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8"><Outlet /></main>
            </div>
        </div>
    )
}


export default DashboardLayout