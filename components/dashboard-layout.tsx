import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "ceo" | "counsellor" | "hr"  
  userName: string
}

export function DashboardLayout({ children, userType, userName }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar userType={userType} userName={userName} />
        <SidebarInset className="flex-1 min-w-0">
          <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden max-w-full bg-muted/30 p-4 md:p-6 elegant-scrollbar">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}