"use client"

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Sun,
  Users,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Briefcase,
} from "lucide-react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardSidebarProps {
  userType: "ceo" | "counsellor" | "hr"
  userName: string
}

export function DashboardSidebar({ userType, userName }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const { state, toggleSidebar } = useSidebar()
  const basePath = `/dashboard/${userType}`
  const isCollapsed = state === "collapsed"

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const normalizePath = (path: string) => path.replace(/\/+$/, "")
  const isActive = (path: string) => normalizePath(pathname) === normalizePath(`${basePath}${path}`)

  const handleLogout = () => router.push("/")
  const handleThemeToggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  const commonMenuItems = [
    { path: "", icon: Home, label: "Dashboard" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/students", icon: Users, label: "Students" }, // This will be overridden for HR
    { path: "/feedback", icon: MessageSquare, label: "Feedback" },
  ]

  const menuItems =
    userType === "hr"
      ? [
          // For HR, explicitly define items to change "Students" to "Interns"
          { path: "", icon: Home, label: "Dashboard" },
          { path: "/calendar", icon: Calendar, label: "Calendar" },
          { path: "/students", icon: Users, label: "Interns" }, // Changed label to "Interns"
        ]
      : [
          // For other user types, show common items plus specific ones
          ...commonMenuItems,
          { path: "/applications", icon: FileText, label: "Applications" },
          { path: "/documents", icon: FileText, label: "Documents" },
          { path: "/analytics", icon: BarChart3, label: "Analytics" },
          ...(userType === "counsellor" ? [{ path: "/profile", icon: Settings, label: "Profile" }] : []),
        ]

  return (
    <Sidebar className="fixed left-0 top-0 h-screen border-r border-border bg-sidebar custom-sidebar-bg z-40" collapsible="icon">
      {/* Sidebar Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border-2 bg-sidebar shadow-lg hover:bg-muted z-50 transition-all duration-200"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Header */}
      <SidebarHeader>
        <div className={`flex flex-col items-center px-2 transition-all ${isCollapsed ? "py-4" : "py-6"}`}>
          <Avatar
            className={`border-2 border-brand-navy-light cursor-pointer transition-all duration-300 ${
              isCollapsed ? "h-10 w-10" : "h-16 w-16"
            }`}
            onClick={toggleSidebar}
          >
            <AvatarImage src="" alt={userName} />
            <AvatarFallback className="bg-brand-navy-dark text-white">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="text-center transition-opacity duration-300">
              <p className="text-lg font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground capitalize">{userType}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className={`flex-1 overflow-y-auto ${isCollapsed ? "hide-scrollbar" : ""}`}>
        <SidebarMenu className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <SidebarMenuItem key={item.path}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        className={`flex items-center w-full transition-all ${
                          active
                            ? "bg-brand-navy-dark text-white hover:bg-brand-navy-medium"
                            : "hover:bg-brand-navy-dark"
                        } ${isCollapsed ? "justify-center" : "justify-start gap-5"}`}
                      >
                        <Link href={`${basePath}${item.path}`} className="flex items-center w-full">
                          <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
                          {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" align="center">
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 space-y-4">
        {/* Theme Toggle */}
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed && <span className="text-sm text-sidebar-foreground">Theme</span>}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleThemeToggle}
                  className="custom-logout-button h-8 w-8"
                  disabled={!mounted}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side={isCollapsed ? "right" : "top"}>
                <p>Toggle {resolvedTheme === "dark" ? "light" : "dark"} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <SidebarSeparator />

        {/* Logout */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={`custom-logout-button ${
                  isCollapsed ? "w-8 h-8 p-0 justify-center" : "w-full justify-start gap-2"
                }`}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span>Log out</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    </Sidebar>
  )
}
