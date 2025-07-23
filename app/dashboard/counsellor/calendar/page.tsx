"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CounsellorCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")

  // Mock appointments data - specific to this counsellor
  const appointments = [
    {
      id: 1,
      title: "Initial Consultation - Michael Brown",
      date: new Date(2025, 5, 13, 10, 0),
      endDate: new Date(2025, 5, 13, 11, 0),
      type: "consultation",
      student: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      program: "UK Business Administration",
      notes: "Discuss application requirements and timeline for Oxford University",
    },
    {
      id: 2,
      title: "Document Review - Emma Wilson",
      date: new Date(2025, 5, 13, 11, 30),
      endDate: new Date(2025, 5, 13, 12, 30),
      type: "document",
      student: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      program: "USA Computer Science",
      notes: "Review academic transcripts and statement of purpose for Stanford application",
    },
    {
      id: 3,
      title: "Visa Interview Prep - Sophia Chen",
      date: new Date(2025, 5, 13, 14, 0),
      endDate: new Date(2025, 5, 13, 15, 0),
      type: "interview",
      student: {
        name: "Sophia Chen",
        email: "sophia.chen@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      program: "Canada Engineering",
      notes: "Prepare for Canadian student visa interview with mock questions",
    },
    {
      id: 4,
      title: "Application Review - Daniel Kim",
      date: new Date(2025, 5, 13, 16, 15),
      endDate: new Date(2025, 5, 13, 17, 15),
      type: "application",
      student: {
        name: "Daniel Kim",
        email: "daniel.kim@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      program: "Australia Medicine",
      notes: "Review application before submission to University of Melbourne",
    },
    {
      id: 5,
      title: "Follow-up Meeting - Alex Johnson",
      date: new Date(2025, 5, 14, 9, 0),
      endDate: new Date(2025, 5, 14, 10, 0),
      type: "follow-up",
      student: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      program: "Germany Data Science",
      notes: "Follow up on document requirements and discuss university options",
    },
  ]

  // Function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Function to get appointments for the selected date
  const getAppointmentsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === selectedDate.getDate() &&
        appointment.date.getMonth() === selectedDate.getMonth() &&
        appointment.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // Function to get days with appointments
  const getDaysWithAppointments = (appointments: any[]) => {
    const days = new Set()
    appointments.forEach((appointment) => {
      const date = new Date(appointment.date)
      days.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    })
    return days
  }

  const daysWithAppointments = getDaysWithAppointments(appointments)

  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView)
  }

  // Get today's appointments
  const todaysAppointments = appointments.filter((appointment) => {
    const today = new Date()
    return (
      appointment.date.getDate() === today.getDate() &&
      appointment.date.getMonth() === today.getMonth() &&
      appointment.date.getFullYear() === today.getFullYear()
    )
  })

  // Sort today's appointments by time
  todaysAppointments.sort((a, b) => a.date.getTime() - b.date.getTime())

  // Get next appointment
  const nextAppointment = todaysAppointments.find((appointment) => appointment.date > new Date())

  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Calendar</h1>
            <p className="text-muted-foreground">Manage your appointments and schedule</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-brand-navy-dark hover:bg-brand-navy-medium">
                  <Plus className="h-4 w-4" /> New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Appointment</DialogTitle>
                  <DialogDescription>Schedule a new appointment with a student</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Appointment title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student">Student</Label>
                    <Select>
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma Wilson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                        <SelectItem value="sophia">Sophia Chen</SelectItem>
                        <SelectItem value="daniel">Daniel Kim</SelectItem>
                        <SelectItem value="alex">Alex Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Initial Consultation</SelectItem>
                        <SelectItem value="document">Document Review</SelectItem>
                        <SelectItem value="interview">Interview Preparation</SelectItem>
                        <SelectItem value="application">Application Review</SelectItem>
                        <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional notes here" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="google-calendar" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="google-calendar">Add to Google Calendar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-reminder" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="send-reminder">Send reminder to student</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Appointment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="hidden md:flex">
              <Tabs defaultValue={view} onValueChange={(value) => handleViewChange(value as "day" | "week" | "month")}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
                <TabsContent value="day" className="hidden" />
                <TabsContent value="week" className="hidden" />
                <TabsContent value="month" className="hidden" />
              </Tabs>
            </div>
          </div>
        </div>

        {nextAppointment && (
          <Card className="border-l-4 border-l-brand-navy-dark">
            <CardHeader className="pb-2">
              <CardTitle>Next Appointment</CardTitle>
              <CardDescription>Coming up soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={nextAppointment.student.avatar || "/placeholder.svg"}
                      alt={nextAppointment.student.name}
                    />
                    <AvatarFallback className="bg-brand-navy-medium text-white">
                      {nextAppointment.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{nextAppointment.title}</h3>
                    <p className="text-sm text-muted-foreground pt-5">
                      {formatTime(nextAppointment.date)} - {formatTime(nextAppointment.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button size="sm">Join Meeting</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-[320px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Calendar</span>
                <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Today</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  hasAppointment: (date) => {
                    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    return daysWithAppointments.has(dateKey)
                  },
                }}
                modifiersStyles={{
                  hasAppointment: {
                    fontWeight: "bold",
                    backgroundColor: "hsl(var(--brand-navy-lightest))",
                    color: "hsl(var(--brand-navy-dark))",
                  },
                }}
              />
              <div className="mt-6">
                <h3 className="mb-2 font-medium">Google Calendar Integration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sync your appointments with Google Calendar to receive notifications and reminders.
                </p>
                <Button variant="outline" className="w-full">
                  Connect Google Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {date?.toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription>{getAppointmentsForDate(date).length} appointments scheduled</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date)
                        newDate.setDate(date.getDate() - 1)
                        setDate(newDate)
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous day</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date)
                        newDate.setDate(date.getDate() + 1)
                        setDate(newDate)
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next day</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getAppointmentsForDate(date).length === 0 ? (
                    <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                      <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No appointments scheduled</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Add a new appointment to get started.</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4 gap-2">
                            <Plus className="h-4 w-4" /> New Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Create New Appointment</DialogTitle>
                            <DialogDescription>Schedule a new appointment with a student</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Title</Label>
                              <Input id="title" placeholder="Appointment title" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="date" defaultValue={date?.toISOString().split("T")[0]} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="time">Time</Label>
                                <Input id="time" type="time" />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="student">Student</Label>
                              <Select>
                                <SelectTrigger id="student">
                                  <SelectValue placeholder="Select student" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="emma">Emma Wilson</SelectItem>
                                  <SelectItem value="michael">Michael Brown</SelectItem>
                                  <SelectItem value="sophia">Sophia Chen</SelectItem>
                                  <SelectItem value="daniel">Daniel Kim</SelectItem>
                                  <SelectItem value="alex">Alex Johnson</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="type">Appointment Type</Label>
                              <Select>
                                <SelectTrigger id="type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consultation">Initial Consultation</SelectItem>
                                  <SelectItem value="document">Document Review</SelectItem>
                                  <SelectItem value="interview">Interview Preparation</SelectItem>
                                  <SelectItem value="application">Application Review</SelectItem>
                                  <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea id="notes" placeholder="Add any additional notes here" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="google-calendar" className="h-4 w-4 rounded border-gray-300" />
                              <Label htmlFor="google-calendar">Add to Google Calendar</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="send-reminder" className="h-4 w-4 rounded border-gray-300" />
                              <Label htmlFor="send-reminder">Send reminder to student</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Create Appointment</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    getAppointmentsForDate(date)
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-start"
                        >
                          <div className="flex items-center gap-3 sm:w-1/3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                appointment.type === "consultation"
                                  ? "bg-blue-100 text-blue-700"
                                  : appointment.type === "document"
                                    ? "bg-green-100 text-green-700"
                                    : appointment.type === "interview"
                                      ? "bg-purple-100 text-purple-700"
                                      : appointment.type === "application"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <CalendarIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <Badge variant="outline" className="bg-brand-navy-lightest text-brand-navy-dark">
                                {formatTime(appointment.date)} - {formatTime(appointment.endDate)}
                              </Badge>
                              <p className="mt-1 text-sm font-medium">{appointment.student.name}</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{appointment.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">Program: {appointment.program}</p>
                            <p className="mt-1 text-sm text-muted-foreground">Notes: {appointment.notes}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button size="sm">Join Meeting</Button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your schedule for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter((appointment) => {
                      const now = new Date()
                      const sevenDaysLater = new Date()
                      sevenDaysLater.setDate(now.getDate() + 7)
                      return appointment.date >= now && appointment.date <= sevenDaysLater
                    })
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              appointment.type === "consultation"
                                ? "bg-blue-500"
                                : appointment.type === "document"
                                  ? "bg-green-500"
                                  : appointment.type === "interview"
                                    ? "bg-purple-500"
                                    : appointment.type === "application"
                                      ? "bg-orange-500"
                                      : "bg-gray-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{appointment.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {appointment.date.toLocaleDateString(undefined, {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              at {formatTime(appointment.date)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
