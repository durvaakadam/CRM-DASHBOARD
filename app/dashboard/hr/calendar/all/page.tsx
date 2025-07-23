"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const appointments = [
  {
    id: 1,
    title: "Visa Interview Prep - Sophia Chen",
    type: "interview",
    date: "2025-07-22",
    time: "2:00 PM",
    student: "Sophia Chen",
  },
  {
    id: 2,
    title: "Counselling Session - Emma Wilson",
    type: "counselling",
    date: "2025-07-22",
    time: "4:00 PM",
    student: "Emma Wilson",
  },
  {
    id: 3,
    title: "Mock Interview - Daniel Kim",
    type: "interview",
    date: "2025-07-23",
    time: "11:00 AM",
    student: "Daniel Kim",
  },
  {
    id: 4,
    title: "Follow-up Counselling - Alex Johnson",
    type: "counselling",
    date: "2025-07-24",
    time: "10:30 AM",
    student: "Alex Johnson",
  },
   {
    id: 4,
    title: "Follow-up Counselling - Alex Johnson",
    type: "interview",
    date: "2025-07-24",
    time: "10:30 AM",
    student: "Alex Johnson",
  },
]

export default function AllAppointmentsPage() {
  const interviewAppointments = appointments.filter((a) => a.type === "interview")
  const counsellingAppointments = appointments.filter((a) => a.type === "counselling")


return (
  <div className="p-6 space-y-8">
    {/* Blue Top Header */}
 

    <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow">
      <h1 className="text-3xl font-bold">All Appointments</h1>
    </div>

    {/* Interview Appointments Section */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2 border-gray-300">
        Interview Appointments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interviewAppointments.map((appt) => (
          <Card key={appt.id}>
            <CardHeader>
              <CardTitle>{appt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Student:</strong> {appt.student}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* Counselling Appointments Section */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2 border-gray-300">
        Counselling Appointments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counsellingAppointments.map((appt) => (
          <Card key={appt.id}>
            <CardHeader>
              <CardTitle>{appt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Student:</strong> {appt.student}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

}