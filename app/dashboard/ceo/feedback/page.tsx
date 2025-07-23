"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, ThumbsDown, ThumbsUp } from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")

  // Mock feedback data
  const feedbacks = [
    {
      id: 1,
      student: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "/placeholder.svg",
      },
      counsellor: "Sarah Miller",
      date: "2025-06-01",
      type: "Service",
      sentiment: "Positive",
      rating: 5,
      comment:
        "Sarah was extremely helpful throughout the entire application process. She was always available to answer my questions and provided valuable guidance. I'm very satisfied with the service.",
    },
    {
      id: 2,
      student: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "/placeholder.svg",
      },
      counsellor: "James Davis",
      date: "2025-05-28",
      type: "Process",
      sentiment: "Neutral",
      rating: 3,
      comment:
        "The application process was straightforward, but I think it could be improved. Some steps were confusing and took longer than expected. Overall, it was an average experience.",
    },
    {
      id: 3,
      student: {
        name: "Sophia Chen",
        email: "sophia.chen@example.com",
        avatar: "/placeholder.svg",
      },
      counsellor: "Amy Lee",
      date: "2025-05-25",
      type: "Service",
      sentiment: "Negative",
      rating: 2,
      comment:
        "I was disappointed with the lack of communication. My emails often went unanswered for days, and I had to follow up multiple times. This caused unnecessary stress during an already stressful process.",
    },
    {
      id: 4,
      student: {
        name: "Daniel Kim",
        email: "daniel.kim@example.com",
        avatar: "/placeholder.svg",
      },
      counsellor: "Robert Johnson",
      date: "2025-06-02",
      type: "Website",
      sentiment: "Positive",
      rating: 4,
      comment:
        "The website is well-designed and easy to navigate. I could find all the information I needed without any trouble. The document upload feature was particularly useful.",
    },
    {
      id: 5,
      student: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "/placeholder.svg",
      },
      counsellor: "Sarah Miller",
      date: "2025-06-03",
      type: "Process",
      sentiment: "Positive",
      rating: 5,
      comment:
        "The entire process was smooth and efficient. I was impressed by how quickly my application was processed. The step-by-step guidance made everything clear and straightforward.",
    },
  ]

  // Filter feedbacks based on type and sentiment
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (feedbackType !== "all" && feedback.type !== feedbackType) {
      return false
    }
    if (sentimentFilter !== "all" && feedback.sentiment.toLowerCase() !== sentimentFilter.toLowerCase()) {
      return false
    }
    return true
  })

  // Calculate sentiment distribution
  const sentimentData = [
    { name: "Positive", value: feedbacks.filter((f) => f.sentiment === "Positive").length },
    { name: "Neutral", value: feedbacks.filter((f) => f.sentiment === "Neutral").length },
    { name: "Negative", value: feedbacks.filter((f) => f.sentiment === "Negative").length },
  ]

  // Calculate feedback type distribution
  const typeData = [
    { name: "Service", value: feedbacks.filter((f) => f.type === "Service").length },
    { name: "Process", value: feedbacks.filter((f) => f.type === "Process").length },
    { name: "Website", value: feedbacks.filter((f) => f.type === "Website").length },
  ]

  // Calculate average rating by counsellor
  const counsellorRatings = [
    { name: "Sarah Miller", rating: 5.0 },
    { name: "James Davis", rating: 3.0 },
    { name: "Amy Lee", rating: 2.0 },
    { name: "Robert Johnson", rating: 4.0 },
  ]

  // Monthly sentiment trends
  const sentimentTrends = [
    { month: "Jan", positive: 15, neutral: 5, negative: 2 },
    { month: "Feb", positive: 18, neutral: 6, negative: 3 },
    { month: "Mar", positive: 20, neutral: 7, negative: 2 },
    { month: "Apr", positive: 22, neutral: 5, negative: 4 },
    { month: "May", positive: 25, neutral: 8, negative: 3 },
    { month: "Jun", positive: 28, neutral: 6, negative: 2 },
  ]

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"]

  return (
    <DashboardLayout userType="ceo" userName="John Smith">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
            <p className="text-muted-foreground">Review and analyze student feedback</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
              <ThumbsUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.filter((f) => f.sentiment === "Positive").length}</div>
              <p className="text-xs text-muted-foreground">
                {((feedbacks.filter((f) => f.sentiment === "Positive").length / feedbacks.length) * 100).toFixed(1)}% of
                total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Negative Feedback</CardTitle>
              <ThumbsDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.filter((f) => f.sentiment === "Negative").length}</div>
              <p className="text-xs text-muted-foreground">
                {((feedbacks.filter((f) => f.sentiment === "Negative").length / feedbacks.length) * 100).toFixed(1)}% of
                total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Breakdown of feedback sentiment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} feedback(s)`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback by Type</CardTitle>
              <CardDescription>Distribution of feedback categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={typeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} feedback(s)`} />
                    <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Sentiment Trends</CardTitle>
            <CardDescription>Feedback sentiment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="neutral" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Feedback</CardTitle>
              <CardDescription>Review and respond to student feedback</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Process">Process</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search feedback..." className="pl-8" />
            </div>

            <div className="space-y-4">
              {filteredFeedbacks.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No feedback found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                filteredFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={feedback.student.avatar || "/placeholder.svg"}
                            alt={feedback.student.name}
                          />
                          <AvatarFallback className="bg-brand-navy-medium text-white">
                            {feedback.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{feedback.student.name}</p>
                            <Badge
                              variant={
                                feedback.sentiment === "Positive"
                                  ? "outline"
                                  : feedback.sentiment === "Negative"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={
                                feedback.sentiment === "Positive"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : feedback.sentiment === "Neutral"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : ""
                              }
                            >
                              {feedback.sentiment}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feedback.date} • {feedback.type} • Counsellor: {feedback.counsellor}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">{feedback.comment}</p>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
