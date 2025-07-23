"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, ChevronRight, Clock, Download, FileCheck, Filter, Search } from "lucide-react"

export default function ApplicationsPage() {
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock applications data
  const applications = [
    {
      id: 1,
      student: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "/placeholder.svg",
      },
      destination: "USA",
      program: "Computer Science",
      university: "Stanford University",
      counsellor: "Sarah Miller",
      status: "Document Review",
      priority: "High",
      timeline: [
        {
          date: "2025-06-01",
          status: "Application Started",
          description: "Student initiated application process",
          completed: true,
        },
        {
          date: "2025-06-05",
          status: "Documents Submitted",
          description: "All required documents submitted for review",
          completed: true,
        },
        {
          date: "2025-06-10",
          status: "Document Review",
          description: "Documents under review by the counsellor",
          completed: false,
        },
        {
          date: "2025-06-15",
          status: "University Application",
          description: "Application to be submitted to the university",
          completed: false,
        },
        {
          date: "2025-06-30",
          status: "Interview Preparation",
          description: "Prepare for university interview",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      student: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "/placeholder.svg",
      },
      destination: "UK",
      program: "Business Administration",
      university: "University of Oxford",
      counsellor: "James Davis",
      status: "Interview Scheduled",
      priority: "High",
      timeline: [
        {
          date: "2025-05-15",
          status: "Application Started",
          description: "Student initiated application process",
          completed: true,
        },
        {
          date: "2025-05-20",
          status: "Documents Submitted",
          description: "All required documents submitted for review",
          completed: true,
        },
        {
          date: "2025-05-25",
          status: "Document Review",
          description: "Documents reviewed by the counsellor",
          completed: true,
        },
        {
          date: "2025-06-01",
          status: "University Application",
          description: "Application submitted to the university",
          completed: true,
        },
        {
          date: "2025-06-10",
          status: "Interview Scheduled",
          description: "University interview scheduled",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      student: {
        name: "Sophia Chen",
        email: "sophia.chen@example.com",
        avatar: "/placeholder.svg",
      },
      destination: "Canada",
      program: "Engineering",
      university: "University of Toronto",
      counsellor: "Amy Lee",
      status: "Visa Processing",
      priority: "Medium",
      timeline: [
        {
          date: "2025-04-10",
          status: "Application Started",
          description: "Student initiated application process",
          completed: true,
        },
        {
          date: "2025-04-15",
          status: "Documents Submitted",
          description: "All required documents submitted for review",
          completed: true,
        },
        {
          date: "2025-04-20",
          status: "Document Review",
          description: "Documents reviewed by the counsellor",
          completed: true,
        },
        {
          date: "2025-04-25",
          status: "University Application",
          description: "Application submitted to the university",
          completed: true,
        },
        {
          date: "2025-05-10",
          status: "Application Approved",
          description: "Application approved by the university",
          completed: true,
        },
        {
          date: "2025-05-20",
          status: "Visa Processing",
          description: "Visa application in process",
          completed: false,
        },
      ],
    },
    {
      id: 4,
      student: {
        name: "Daniel Kim",
        email: "daniel.kim@example.com",
        avatar: "/placeholder.svg",
      },
      destination: "Australia",
      program: "Medicine",
      university: "University of Melbourne",
      counsellor: "Robert Johnson",
      status: "Application Review",
      priority: "Medium",
      timeline: [
        {
          date: "2025-05-25",
          status: "Application Started",
          description: "Student initiated application process",
          completed: true,
        },
        {
          date: "2025-06-01",
          status: "Documents Submitted",
          description: "All required documents submitted for review",
          completed: true,
        },
        {
          date: "2025-06-05",
          status: "Application Review",
          description: "Application under review by the university",
          completed: false,
        },
        {
          date: "2025-06-20",
          status: "Interview",
          description: "University interview to be scheduled",
          completed: false,
        },
      ],
    },
  ]

  // Filter applications based on priority and status
  const filteredApplications = applications.filter((application) => {
    if (priorityFilter !== "all" && application.priority.toLowerCase() !== priorityFilter) {
      return false
    }
    if (statusFilter !== "all" && application.status !== statusFilter) {
      return false
    }
    return true
  })

  return (
    <DashboardLayout userType="ceo" userName="John Smith">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-muted-forground tracking-tight">Applications</h1>
            <p className="text-muted-foreground">Track and manage student applications</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        {/* Fixed filter layout */}
        <div className="grid gap-4 md:grid-cols-[1fr_auto] text-muted-foreground">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
            <Input type="search" placeholder="Search applications..." className="pl-8 w-full" />
          </div>
          <div className="flex flex-wrap gap-2 text-foreground">
            <Select defaultValue={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Document Review">Document Review</SelectItem>
                <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="Visa Processing">Visa Processing</SelectItem>
                <SelectItem value="Application Review">Application Review</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">More Filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              All Applications
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex-1 sm:flex-none">
              Recent Updates
            </TabsTrigger>
            <TabsTrigger value="priority" className="flex-1 sm:flex-none">
              Priority
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center p-6 text-center">
                  <FileCheck className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 text-lg font-medium">No applications found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={application.student.avatar || "/placeholder.svg"}
                            alt={application.student.name}
                          />
                          <AvatarFallback className="bg-brand-navy-medium text-white">
                            {application.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{application.student.name}</CardTitle>
                          <CardDescription>{application.student.email}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={application.priority === "High" ? "destructive" : "outline"}
                          className={application.priority === "High" ? "" : "bg-brand-navy-medium"}
                        >
                          {application.priority} Priority
                        </Badge>
                        <Badge variant="secondary" className="bg-brand-navy-lightest text">
                          {application.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-6 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Destination</p>
                        <p>{application.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Program</p>
                        <p>{application.program}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">University</p>
                        <p>{application.university}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-3 font-medium">Application Timeline</h4>
                      <div className="relative">
                        <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                        <div className="space-y-4">
                          {application.timeline.map((item, index) => (
                            <div key={index} className="relative flex gap-4">
                              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background">
                                {item.completed ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : index === application.timeline.findIndex((t) => !t.completed) ? (
                                  <Clock className="h-6 w-6 text-brand-navy-light" />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                                )}
                              </div>
                              <div className="flex-1 pt-0.5">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <p className="font-medium ">{item.status}</p>
                                  <p className="text-sm text-muted-foreground">{item.date}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" className="gap-1">
                        View Full Application <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            {/* Similar content as "all" but filtered for recent updates */}
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Recent updates will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="priority" className="mt-4">
            {/* Similar content as "all" but filtered for priority applications */}
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Priority applications will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
