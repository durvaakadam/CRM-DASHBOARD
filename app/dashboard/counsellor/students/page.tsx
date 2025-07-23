"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Filter, Plus, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CounsellorStudentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")

  // Mock students data - only showing students assigned to this counsellor
  const students = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      avatar: "/placeholder.svg",
      destination: "USA",
      program: "Computer Science",
      university: "Stanford University",
      status: "Active",
      applicationStage: "Document Review",
      nextAppointment: "Jun 15, 2025",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/placeholder.svg",
      destination: "UK",
      program: "Business Administration",
      university: "University of Oxford",
      status: "Active",
      applicationStage: "Interview Scheduled",
      nextAppointment: "Jun 10, 2025",
    },
    {
      id: 3,
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      avatar: "/placeholder.svg",
      destination: "Canada",
      program: "Engineering",
      university: "University of Toronto",
      status: "Active",
      applicationStage: "Visa Processing",
      nextAppointment: "Jun 20, 2025",
    },
    {
      id: 4,
      name: "Daniel Kim",
      email: "daniel.kim@example.com",
      avatar: "/placeholder.svg",
      destination: "Australia",
      program: "Medicine",
      university: "University of Melbourne",
      status: "Active",
      applicationStage: "Application Review",
      nextAppointment: "Jun 18, 2025",
    },
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg",
      destination: "Germany",
      program: "Data Science",
      university: "Technical University of Munich",
      status: "Pending",
      applicationStage: "Initial Consultation",
      nextAppointment: "Jun 12, 2025",
    },
    {
      id: 6,
      name: "Jessica Lee",
      email: "jessica.lee@example.com",
      avatar: "/placeholder.svg",
      destination: "France",
      program: "Fine Arts",
      university: "Sorbonne University",
      status: "Pending",
      applicationStage: "Document Collection",
      nextAppointment: "Jun 14, 2025",
    },
    {
      id: 7,
      name: "Ryan Smith",
      email: "ryan.smith@example.com",
      avatar: "/placeholder.svg",
      destination: "Japan",
      program: "International Relations",
      university: "University of Tokyo",
      status: "Pending",
      applicationStage: "Initial Consultation",
      nextAppointment: "Jun 16, 2025",
    },
    {
      id: 8,
      name: "Olivia Garcia",
      email: "olivia.garcia@example.com",
      avatar: "/placeholder.svg",
      destination: "Spain",
      program: "Architecture",
      university: "Polytechnic University of Madrid",
      status: "Completed",
      applicationStage: "Visa Approved",
      nextAppointment: "None",
    },
  ]

  // Filter students based on status and program
  const filteredStudents = students.filter((student) => {
    if (statusFilter !== "all" && student.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }
    if (programFilter !== "all" && student.program !== programFilter) {
      return false
    }
    return true
  })

  // Get unique programs for filter
  const uniquePrograms = Array.from(new Set(students.map((student) => student.program)))

  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
            <p className="text-muted-foreground">Manage and track your assigned students</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-brand-navy-dark hover:bg-brand-navy-medium">
                  <Plus className="h-4 w-4" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter the details of the new student</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="First name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Last name" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email address" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Phone number" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Select>
                        <SelectTrigger id="destination">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">USA</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                          <SelectItem value="spain">Spain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="program">Program</Label>
                      <Select>
                        <SelectTrigger id="program">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="business">Business Administration</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="fine-arts">Fine Arts</SelectItem>
                          <SelectItem value="international-relations">International Relations</SelectItem>
                          <SelectItem value="architecture">Architecture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes about the student" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search students..." className="pl-8 w-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {uniquePrograms.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">More Filters</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>My Students</CardTitle>
            <CardDescription>You have {students.length} students assigned to you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead className="hidden md:table-cell">Application Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Next Appointment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No students found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback className="bg-brand-navy-medium text-white">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="hidden text-xs text-muted-foreground sm:block">{student.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.destination}</TableCell>
                        <TableCell>{student.program}</TableCell>
                        <TableCell className="hidden md:table-cell">{student.applicationStage}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              student.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : student.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {student.status}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{student.nextAppointment}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates with your students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="Emma Wilson" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">EW</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">Emma Wilson submitted new documents</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Passport and academic transcripts uploaded for review
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="Michael Brown" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">MB</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">Michael Brown's interview scheduled</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">University interview scheduled for June 10, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="Sophia Chen" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">SC</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">Sophia Chen's visa application submitted</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Visa application submitted to Canadian embassy</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="Alex Johnson" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">AJ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">Alex Johnson added as new student</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Initial consultation scheduled for June 12, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
