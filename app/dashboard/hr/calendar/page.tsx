
"use client"

import { useEffect, useState,useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion"
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
import { Textarea } from "@/components/ui/textarea"
import {
  fetchAppointments,
  createAppointment as createAppointmentAPI,
  deleteAppointment as deleteAppointmentAPI,
  updateAppointment as updateAppointmentAPI,
} from "@/lib/api/appointment"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("month")
  const [appointments, setAppointments] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAllDialogOpen, setIsAllDialogOpen] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const [monthKey, setMonthKey] = useState(`${date?.getFullYear()}-${date?.getMonth()}`)
  const [visibleMonth, setVisibleMonth] = useState(new Date())
  const [flipDirection, setFlipDirection] = useState<"up" | "down">("down")
  const [selectedType, setSelectedType] = useState("all");

const categories = [
  { key: "all", label: "All" },
  { key: "consultation", label: "Consultation" },
  { key: "document", label: "Document Review" },
  { key: "interview", label: "Interview " },
  { key: "application", label: "Application Review" },
  { key: "follow-up", label: "Follow-up" },
];
  useEffect(() => {
    if (date) {
      setMonthKey(`${date.getFullYear()}-${date.getMonth()}`)
    }
  }, [date])

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    student: "",
    type: "",
    notes: "",
  })

const fetchAndSetAppointments = async () => {
    try {
      const data = await fetchAppointments()
      const parsed = data.map((appt: any) => ({
        ...appt,
        date: new Date(appt.date),
        id: appt._id,
      }))
      setAppointments(parsed)
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    }
  }

  useEffect(() => {
    fetchAndSetAppointments()
  }, [])

  const handleFormChange = (e: any) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

const handleCreateAppointment = async () => {
  if (!formData.title || !formData.date || !formData.time) return

  const [year, month, day] = formData.date.split("-").map(Number)
  const [hour, minute] = formData.time.split(":").map(Number)
  const start = new Date(year, month - 1, day, hour, minute)

  const appointmentData = {
    title: formData.title,
    date: start.toISOString(),
    studentId: formData.student,
    counselorId: "No counselor",
    notes: formData.notes,
    status: "scheduled",
    type: formData.type,
  }

  try {
    if (editMode && editId) {
      await updateAppointmentAPI(editId, appointmentData)
    } else {
      await createAppointmentAPI(appointmentData)
    }

    await fetchAndSetAppointments()
    setIsDialogOpen(false)
    setFormData({ title: "", date: "", time: "", student: "", type: "", notes: "" })
    setEditMode(false)
    setEditId(null)
  } catch (err) {
    console.error(editMode ? "Error updating appointment:" : "Error creating appointment:", err)
  }
}


  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const getAppointmentsForView = () => {
    if (!date) return []

    const selectedDate = new Date(date)
    return appointments
      .filter((a) => {
        const apptDate = new Date(a.date)

        if (view === "day") {
          return (
            apptDate.getDate() === selectedDate.getDate() &&
            apptDate.getMonth() === selectedDate.getMonth() &&
            apptDate.getFullYear() === selectedDate.getFullYear()
          )
        }

        if (view === "week") {
          const startOfWeek = new Date(selectedDate)
          startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
          const endOfWeek = new Date(startOfWeek)
          endOfWeek.setDate(startOfWeek.getDate() + 6)
          return apptDate >= startOfWeek && apptDate <= endOfWeek
        }

        if (view === "month") {
          return (
            apptDate.getMonth() === selectedDate.getMonth() &&
            apptDate.getFullYear() === selectedDate.getFullYear()
          )
        }

        return false
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const getUpcomingAppointments = () => {
    const now = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)
    return appointments
      .filter((a) => a.date >= now && a.date <= nextWeek)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const getDaysWithAppointments = (appointments: any[]) => {
    const days = new Set()
    appointments.forEach((appointment) => {
      const date = new Date(appointment.date)
      days.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    })
    return days
  }

  const daysWithAppointments = getDaysWithAppointments(appointments)

 const typeColors: Record<string, string> = {
  consultation: "bg-blue-500",
  document: "bg-green-500",
  interview: "bg-purple-500",
  application: "bg-yellow-500",
  "follow-up": "bg-pink-500", // ✅ Fixed with quotes
};

const filteredAppointments = useMemo(() => {
  if (selectedType === "all") return appointments;
  return appointments.filter((a) => a.type === selectedType);
}, [appointments, selectedType]);

    const handleEditAppointment = (id: string) => {
    const appt = appointments.find((a) => a.id === id)
    if (!appt) return

    const apptDate = new Date(appt.date)
    const formattedDate = apptDate.toISOString().split("T")[0]
    const formattedTime = apptDate.toTimeString().split(":").slice(0, 2).join(":")

    setFormData({
      title: appt.title || "",
      type: appt.type || "",
      date: formattedDate,
      time: formattedTime,
      student: appt.studentId || "",
      notes: appt.notes || "",
    })
    setEditMode(true)
    setEditId(id)
    setIsDialogOpen(true)
  }

  const handleDeleteAppointment = async (id: string) => {
    try {
      await deleteAppointmentAPI(id)
      await fetchAndSetAppointments()
    } catch (err) {
      console.error("Failed to delete appointment:", err)
    }
  }

return (
  <DashboardLayout userType="hr" userName="Durva Kadam">
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your appointments and schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-brand-navy-dark hover:bg-brand-navy-medium text-white">
                <Plus className="h-4 w-4" /> New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={handleFormChange} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleFormChange} />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" value={formData.time} onChange={handleFormChange} />
                  </div>
                </div>
                <Label htmlFor="student">Student</Label>
                <Input id="student" value={formData.student} onChange={handleFormChange} placeholder="Type student name" />
                <Label>Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleFormChange(e)}
                  className="border p-2 rounded-md"
                >
                  <option value="">Select type</option>
                  <option value="consultation">Consultation</option>
                  <option value="interview">Interview </option>


                </select>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={formData.notes} onChange={handleFormChange} />
              </div>
              <DialogFooter>
<Button onClick={handleCreateAppointment} className="bg-blue-600 hover:bg-blue-700 text-white">
  {editMode ? "Update Appointment" : "Create Appointment"}
</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

           <Dialog open={isAllDialogOpen} onOpenChange={setIsAllDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-base font-semibold px-4 py-2 bg-slate-800 text-white hover:bg-slate-700">
          All Appointments
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] max-h-[90vh] overflow-y-auto bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">All Appointments</DialogTitle>
          <DialogDescription className="text-slate-300">
            View, edit, or delete all scheduled appointments categorized by type.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedType === category.key ? "default" : "secondary"}
              className={`capitalize ${selectedType === category.key ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-200"}`}
              onClick={() => setSelectedType(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-slate-400 text-sm mt-6">No appointments available.</p>
        ) : (
          <div className="grid gap-6 mt-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredAppointments
              .slice()
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col justify-between h-full border border-slate-700 p-6 rounded-xl bg-slate-800 shadow hover:shadow-lg transition-all"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white">{appointment.title}</p>
                    <p className="text-sm text-slate-300">
                      {new Date(appointment.date).toLocaleString("en-IN")} &mdash; <span className="capitalize">{appointment.type}</span>
                    </p>
                    <p className="text-sm text-slate-300">Student: {appointment.student}</p>
                    {appointment.notes && (
                      <p className="text-sm text-slate-200">Notes: {appointment.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <Button variant="ghost" size="icon" onClick={() => handleEditAppointment(appointment.id)}>
                      <Pencil className="h-5 w-5 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAppointment(appointment.id)}>
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </DialogContent>
    </Dialog>


          <Tabs defaultValue={view} onValueChange={(value) => setView(value as any)}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

        <div className="grid gap-6 md:grid-cols-[360px_1fr]">
          <Card className="bg-[#0F172A]/50 backdrop-blur-md border border-blue-900/40 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="flex justify-between text-white">
                Calendar
                <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                  <CalendarIcon className="h-4 w-4 text-white" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center overflow-hidden min-h-[360px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()}
                    initial={{ rotateX: -90, opacity: 0, transformOrigin: "bottom center" }}
                    animate={{ rotateX: 0, opacity: 1, transformOrigin: "bottom center" }}
                    exit={{ rotateX: 90, opacity: 0, transformOrigin: "top center" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      month={visibleMonth}
                      onMonthChange={(newMonth) => {
                        if (newMonth.getTime() !== visibleMonth.getTime()) {
                          setFlipDirection(newMonth > visibleMonth ? "down" : "up")
                          setVisibleMonth(newMonth)
                        }
                      }}
                      className="rounded-xl p-4 text-base"
                      modifiers={{
                        hasAppointment: (date) => {
                          const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                          return daysWithAppointments.has(key)
                        },
                      }}
                      modifiersStyles={{
                        hasAppointment: {
                          backgroundColor: "#0ea5e9",
                          fontWeight: "bold",
                          color: "#fff",
                        },
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>
                    {view === "day" && `Appointments for ${date?.toDateString()}`}
                    {view === "week" && `This Week's Appointments`}
                    {view === "month" && `This Month's Appointments`}
                  </CardTitle>
                  <CardDescription>
                    {getAppointmentsForView().length} appointments scheduled
                  </CardDescription>
                </div>
                {view === "day" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDate(new Date(date!.setDate(date!.getDate() - 1)))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDate(new Date(date!.setDate(date!.getDate() + 1)))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
  {getAppointmentsForView().length === 0 ? (
    <div className="flex flex-col items-center justify-center border border-dashed p-8 rounded-md text-center">
      <CalendarIcon className="h-10 w-10 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">No appointments scheduled</h3>
      <p className="text-sm text-muted-foreground">Add a new appointment to get started.</p>
    </div>
  ) : (
  getAppointmentsForView().map((appointment) => {
    const bgColor =
      appointment.type === "consultation"
        ? "bg-blue-500"
        : appointment.type === "document"
        ? "bg-green-500"
        : appointment.type === "interview"
        ? "bg-purple-500"
        : appointment.type === "application"
        ? "bg-yellow-500"
        : appointment.type === "follow-up"
        ? "bg-pink-500"
        : "bg-slate-500";


      return (
        <div
          key={appointment.id}
          className={`p-4 rounded-xl shadow-sm mb-3 text-white ${bgColor}`}
        >
          <p className="text-lg font-semibold">Student: {appointment.studentId}</p>
          <p className="text-sm">
            {appointment.date.toLocaleDateString("en-IN")} at {formatTime(appointment.date)}
          </p>
        </div>
      )
    })
  )}
</CardContent>

            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getUpcomingAppointments().length === 0 ? (
                  <p className="text-muted-foreground text-sm">No upcoming appointments.</p>
                ) : (
                  getUpcomingAppointments().map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center border p-3 rounded-md">
                      <div>
                        <p className="font-medium">{appointment.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.date.toLocaleDateString()} at {formatTime(appointment.date)}
                        </p>
                      </div>
                      <Badge className={typeColors[appointment.type] || "bg-gray-500"}>{appointment.type}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}