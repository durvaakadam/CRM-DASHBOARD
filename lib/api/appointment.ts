const API_BASE_URL = "http://localhost:5000/api/appointments"

export async function fetchAppointments() {
  const res = await fetch(API_BASE_URL)
  if (!res.ok) {
    throw new Error("Failed to fetch appointments")
  }
  return res.json()
}

export async function createAppointment(data: {
  studentId: string
  counselorId: string
  date: string
  status?: string
  notes?: string
  title?: string
  type?: string
}) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create appointment")
  }
  return res.json()
}

export async function deleteAppointment(id: string) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete appointment")
  }
  return res.json()
}

export async function updateAppointment(id: string, data: {
  studentId?: string
  counselorId?: string
  date?: string
  status?: string
  notes?: string
  title?: string
  type?: string
}) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to update appointment")
  }
  return res.json()
}
