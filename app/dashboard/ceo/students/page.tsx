"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Filter, Plus, Search, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

interface Student {
  name: string
  email: string
  destination: string
  program: string
  counsellor: string
  status: "Active" | "Pending" | "Completed"
}

export default function StudentsPage() {
  const initialStudents: Student[] = [
    {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      destination: "USA",
      program: "Computer Science",
      counsellor: "Sarah Miller",
      status: "Active",
    },
      {
                      name: "Michael Brown",
                      email: "michael.brown@example.com",
                      destination: "UK",
                      program: "Business Administration",
                      counsellor: "James Davis",
                      status: "Active",
                    },
                    {
                      name: "Sophia Chen",
                      email: "sophia.chen@example.com",
                      destination: "Canada",
                      program: "Engineering",
                      counsellor: "Amy Lee",
                      status: "Active",
                    },
                    {
                      name: "Daniel Kim",
                      email: "daniel.kim@example.com",
                      destination: "Australia",
                      program: "Medicine",
                      counsellor: "Robert Johnson",
                      status: "Active",
                    },
                    {
                      name: "Alex Johnson",
                      email: "alex.johnson@example.com",
                      destination: "Germany",
                      program: "Data Science",
                      counsellor: "Sarah Miller",
                      status: "Pending",
                    },
                    {
                      name: "Jessica Lee",
                      email: "jessica.lee@example.com",
                      destination: "France",
                      program: "Fine Arts",
                      counsellor: "James Davis",
                      status: "Pending",
                    },
                    {
                      name: "Ryan Smith",
                      email: "ryan.smith@example.com",
                      destination: "Japan",
                      program: "International Relations",
                      counsellor: "Amy Lee",
                      status: "Pending",
                    },
                    {
                      name: "Olivia Garcia",
                      email: "olivia.garcia@example.com",
                      destination: "Spain",
                      program: "Architecture",
                      counsellor: "Robert Johnson",
                      status: "Completed",
                    },
  ]

  // States
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    email: "",
    destination: "",
    program: "",
    counsellor: "",
    status: "Active",
  })
  const [editStudent, setEditStudent] = useState<Student>({
    name: "",
    email: "",
    destination: "",
    program: "",
    counsellor: "",
    status: "Active",
  })

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.counsellor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Status badge CSS helper
  function getStatusClasses(status: Student["status"]) {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return ""
    }
  }

  // Form input change handlers
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setNewStudent((prev) => ({ ...prev, [name]: value }))
  }

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setEditStudent((prev) => ({ ...prev, [name]: value }))
  }

  function handleSelectChange(
    name: keyof Student,
    value: string
  ) {
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as Student["status"]) : value === "none" ? "" : value,
    }))
  }

  function handleEditSelectChange(
    name: keyof Student,
    value: string
  ) {
    setEditStudent((prev) => ({
      ...prev,
      [name]: name === "status" ? (value as Student["status"]) : value === "none" ? "" : value,
    }))
  }

  // Add student handler
  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault()

    if (!newStudent.name.trim() || !newStudent.email.trim()) {
      alert("Name and Email are required fields.")
      return
    }

    // Update frontend immediately
    setStudents((prev) => [newStudent, ...prev])
    setIsDialogOpen(false)
    setNewStudent({
      name: "",
      email: "",
      destination: "",
      program: "",
      counsellor: "",
      status: "Active",
    })

    // Optional backend save - errors logged but don't block UI
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      })
      if (!response.ok) {
        console.error("Failed to save student to backend:", await response.text())
        return
      }
      const savedStudent = await response.json()
      // Replace local entry with backend returned student if needed
      setStudents((prev) => {
        const filtered = prev.filter((s) => s.email !== newStudent.email)
        return [savedStudent, ...filtered]
      })
    } catch (error) {
      console.error("Error saving student to backend:", error)
    }
  }

  // Edit student handler
  function handleEditClick(index: number) {
    setEditingIndex(index)
    setEditStudent({ ...students[index] })
    setIsEditDialogOpen(true)
  }

  async function handleEditStudent(e: React.FormEvent) {
    e.preventDefault()

    if (!editStudent.name.trim() || !editStudent.email.trim()) {
      alert("Name and Email are required fields.")
      return
    }

    if (editingIndex === null) return

    // Update frontend immediately
    setStudents((prev) => {
      const updated = [...prev]
      updated[editingIndex] = editStudent
      return updated
    })
    setIsEditDialogOpen(false)
    setEditingIndex(null)
    setEditStudent({
      name: "",
      email: "",
      destination: "",
      program: "",
      counsellor: "",
      status: "Active",
    })

    // Optional backend save - errors logged but don't block UI
    try {
      const response = await fetch(`/api/students/${editStudent.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editStudent),
      })
      if (!response.ok) {
        console.error("Failed to update student in backend:", await response.text())
        return
      }
      const updatedStudent = await response.json()
      // Replace local entry with backend returned student if needed
      setStudents((prev) => {
        const updated = [...prev]
        updated[editingIndex] = updatedStudent
        return updated
      })
    } catch (error) {
      console.error("Error updating student in backend:", error)
    }
  }

  // Delete student handler
  function handleDeleteClick(index: number) {
    setDeletingIndex(index)
    setIsDeleteDialogOpen(true)
  }

  async function handleDeleteStudent() {
    if (deletingIndex === null) return

    const studentToDelete = students[deletingIndex]

    // Update frontend immediately
    setStudents((prev) => prev.filter((_, i) => i !== deletingIndex))
    setIsDeleteDialogOpen(false)
    setDeletingIndex(null)

    // Optional backend delete - errors logged but don't block UI
    try {
      const response = await fetch(`/api/students/${studentToDelete.email}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        console.error("Failed to delete student from backend:", await response.text())
        return
      }
    } catch (error) {
      console.error("Error deleting student from backend:", error)
    }
  }

  return (
    <DashboardLayout userType="ceo" userName="John Smith">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground">
              Manage and view all student information
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-2 bg-brand-navy-dark text-white hover:bg-brand-navy-medium"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4" /> Add Student
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
        
        {/* Add Student Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg sm:mx-auto">
            <form onSubmit={handleAddStudent} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={newStudent.name}
                    onChange={handleInputChange}
                    placeholder="Student's full name"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    name="destination"
                    type="text"
                    value={newStudent.destination}
                    onChange={handleInputChange}
                    placeholder="Country destination"
                  />
                </div>
                <div>
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    name="program"
                    type="text"
                    value={newStudent.program}
                    onChange={handleInputChange}
                    placeholder="Program of study"
                  />
                </div>
                <div>
                  <Label htmlFor="counsellor">Counsellor</Label>
                  <Select
                    value={newStudent.counsellor || "none"}
                    onValueChange={(val) => handleSelectChange("counsellor", val)}
                  >
                    <SelectTrigger id="counsellor" className="w-full">
                      <SelectValue placeholder="Select counsellor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                      <SelectItem value="James Davis">James Davis</SelectItem>
                      <SelectItem value="Amy Lee">Amy Lee</SelectItem>
                      <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newStudent.status}
                    onValueChange={(val) => handleSelectChange("status", val)}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-navy-dark text-white hover:bg-brand-navy-medium"
                >
                  Add Student
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Student Modal */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-lg sm:mx-auto">
            <form onSubmit={handleEditStudent} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogDescription>
                  Update the student's information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    type="text"
                    value={editStudent.name}
                    onChange={handleEditInputChange}
                    placeholder="Student's full name"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    value={editStudent.email}
                    onChange={handleEditInputChange}
                    placeholder="student@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-destination">Destination</Label>
                  <Input
                    id="edit-destination"
                    name="destination"
                    type="text"
                    value={editStudent.destination}
                    onChange={handleEditInputChange}
                    placeholder="Country destination"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-program">Program</Label>
                  <Input
                    id="edit-program"
                    name="program"
                    type="text"
                    value={editStudent.program}
                    onChange={handleEditInputChange}
                    placeholder="Program of study"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-counsellor">Counsellor</Label>
                  <Select
                    value={editStudent.counsellor || "none"}
                    onValueChange={(val) => handleEditSelectChange("counsellor", val)}
                  >
                    <SelectTrigger id="edit-counsellor" className="w-full">
                      <SelectValue placeholder="Select counsellor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                      <SelectItem value="James Davis">James Davis</SelectItem>
                      <SelectItem value="Amy Lee">Amy Lee</SelectItem>
                      <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editStudent.status}
                    onValueChange={(val) => handleEditSelectChange("status", val)}
                  >
                    <SelectTrigger id="edit-status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-navy-dark text-white hover:bg-brand-navy-medium"
                >
                  Update Student
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the student
                {deletingIndex !== null && ` "${students[deletingIndex]?.name}"`} from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteStudent}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Students</CardTitle>
            <CardDescription>
              A total of {students.length.toLocaleString()} students in the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8 sm:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Counsellor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Counsellors</SelectItem>
                    <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                    <SelectItem value="James Davis">James Davis</SelectItem>
                    <SelectItem value="Amy Lee">Amy Lee</SelectItem>
                    <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  More Filters
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Counsellor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg"
                              alt={student.name}
                            />
                            <AvatarFallback className=" bg-brand-navy-medium text-white">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{student.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.email}
                      </TableCell>
                      <TableCell>{student.destination}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.counsellor}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditClick(students.findIndex(s => s.email === student.email))}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteClick(students.findIndex(s => s.email === student.email))}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}