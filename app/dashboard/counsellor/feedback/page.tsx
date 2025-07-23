"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CounsellorFeedbackPage() {
  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
            <p className="text-muted-foreground">View and respond to student feedback</p>
          </div>
          <Button className="bg-brand-navy-dark hover:bg-brand-navy-medium">Respond to Feedback</Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Feedback</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="responded">Responded</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Input placeholder="Search feedback..." className="max-w-xs" />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {feedbackData.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {feedbackData
              .filter((feedback) => !feedback.responded)
              .map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
          </TabsContent>

          <TabsContent value="responded" className="space-y-4">
            {feedbackData
              .filter((feedback) => feedback.responded)
              .map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

interface Feedback {
  id: string
  student: {
    name: string
    avatar?: string
  }
  date: string
  message: string
  category: string
  responded: boolean
  response?: string
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={feedback.student.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-brand-navy-medium text-white">
              {feedback.student.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{feedback.student.name}</CardTitle>
            <CardDescription>{feedback.date}</CardDescription>
          </div>
        </div>
        <Badge
          variant={feedback.responded ? "outline" : "default"}
          className={feedback.responded ? "" : "bg-brand-navy-medium"}
        >
          {feedback.responded ? "Responded" : "New"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Badge variant="outline" className="mb-2 border-brand-navy-light text-muted-foreground">
            {feedback.category}
          </Badge>
          <p className="text-sm leading-relaxed">{feedback.message}</p>
        </div>

        {feedback.responded && feedback.response && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-1 text-brand-navy-medium dark:text-brand-navy-light">Your Response:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{feedback.response}</p>
          </div>
        )}

        {!feedback.responded && (
          <div className="space-y-2">
            <Textarea placeholder="Write your response..." className="min-h-[80px]" />
            <div className="flex justify-end">
              <Button size="sm" className="bg-brand-navy-dark hover:bg-brand-navy-medium">
                Send Response
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const feedbackData: Feedback[] = [
  {
    id: "1",
    student: {
      name: "Emma Johnson",
      avatar: "/placeholder.svg",
    },
    date: "June 10, 2023",
    message:
      "I found the application process very straightforward. The guidance provided was extremely helpful. Thank you for your support throughout the process!",
    category: "Application Process",
    responded: true,
    response:
      "Thank you for your feedback, Emma! We're glad to hear that the application process was smooth for you. Please let us know if you need any further assistance.",
  },
  {
    id: "2",
    student: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
    },
    date: "June 8, 2023",
    message:
      "I'm having trouble uploading my transcript documents. The system keeps giving me an error message. Could you please help?",
    category: "Technical Issue",
    responded: false,
  },
  {
    id: "3",
    student: {
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg",
    },
    date: "June 5, 2023",
    message:
      "The visa application guidance was very helpful. However, I would appreciate more information about the interview process.",
    category: "Visa Process",
    responded: false,
  },
  {
    id: "4",
    student: {
      name: "James Wilson",
      avatar: "/placeholder.svg",
    },
    date: "June 1, 2023",
    message:
      "I wanted to express my gratitude for your help with my university selection. Your recommendations were spot on!",
    category: "University Selection",
    responded: true,
    response:
      "We're thrilled to hear that our recommendations were helpful, James! Best of luck with your studies abroad.",
  },
]
