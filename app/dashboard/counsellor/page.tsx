import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar, CheckCircle, Clock, FileCheck, GraduationCap, LineChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function CounsellorDashboard() {
  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Counsellor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Sarah! Here's your daily overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">My Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+8 new this month</p>
              <div className="mt-4">
                <Progress value={65} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
              <div className="mt-4">
                <Progress value={70} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Next one in 45 minutes</p>
              <div className="mt-4">
                <Progress value={40} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.3%</div>
              <p className="text-xs text-muted-foreground">+3.2% from last month</p>
              <div className="mt-4">
                <Progress value={85} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 animate-fade-in [animation-delay:400ms]">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Michael Brown</p>
                      <Badge variant="outline" className="bg-brand-navy-lightest text-black">
                        10:00 AM
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Initial Consultation - UK Business Administration</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Emma Wilson</p>
                      <Badge variant="outline" className="bg-brand-navy-lightest text-black">
                        11:30 AM
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Document Review - USA Computer Science</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Sophia Chen</p>
                      <Badge variant="outline" className="bg-brand-navy-lightest text-black">
                        2:00 PM
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa Interview Preparation - Canada Engineering</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-md border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Daniel Kim</p>
                      <Badge variant="outline" className="bg-brand-navy-lightest text-black">
                        4:15 PM
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Application Review - Australia Medicine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 animate-fade-in [animation-delay:500ms]">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You approved Jessica Lee's application</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You scheduled an appointment with Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You added Ryan Smith as a new student</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy-lightest text-brand-navy-dark">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You verified documents for Olivia Garcia</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fade-in [animation-delay:600ms]">
          <Tabs defaultValue="priority">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="priority">Priority Applications</TabsTrigger>
                <TabsTrigger value="recent">Recent Applications</TabsTrigger>
              </TabsList>
              <Button size="sm" variant="outline" className="gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <TabsContent value="priority" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div>Student</div>
                      <div>Destination</div>
                      <div>Program</div>
                      <div>Status</div>
                      <div className="text-right">Priority</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Emma Wilson",
                          destination: "USA",
                          program: "Computer Science",
                          status: "Document Review",
                          priority: "High",
                        },
                        {
                          name: "Michael Brown",
                          destination: "UK",
                          program: "Business Administration",
                          status: "Interview Scheduled",
                          priority: "High",
                        },
                        {
                          name: "Sophia Chen",
                          destination: "Canada",
                          program: "Engineering",
                          status: "Visa Processing",
                          priority: "Medium",
                        },
                        {
                          name: "Daniel Kim",
                          destination: "Australia",
                          program: "Medicine",
                          status: "Application Review",
                          priority: "Medium",
                        },
                      ].map((application, i) => (
                        <div key={i} className="grid grid-cols-5 items-center p-3 text-sm">
                          <div className="font-medium">{application.name}</div>
                          <div>{application.destination}</div>
                          <div>{application.program}</div>
                          <div>{application.status}</div>
                          <div className="text-right">
                            <Badge
                              variant={application.priority === "High" ? "destructive" : "outline"}
                              className={application.priority === "High" ? "" : "bg-brand-navy-lightest text-black"}
                            >
                              {application.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div>Student</div>
                      <div>Destination</div>
                      <div>Program</div>
                      <div>Status</div>
                      <div className="text-right">Date</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Alex Johnson",
                          destination: "Germany",
                          program: "Data Science",
                          status: "New Application",
                          date: "Today",
                        },
                        {
                          name: "Jessica Lee",
                          destination: "France",
                          program: "Fine Arts",
                          status: "New Application",
                          date: "Today",
                        },
                        {
                          name: "Ryan Smith",
                          destination: "Japan",
                          program: "International Relations",
                          status: "New Application",
                          date: "Yesterday",
                        },
                        {
                          name: "Olivia Garcia",
                          destination: "Spain",
                          program: "Architecture",
                          status: "New Application",
                          date: "Yesterday",
                        },
                      ].map((application, i) => (
                        <div key={i} className="grid grid-cols-5 items-center p-3 text-sm">
                          <div className="font-medium">{application.name}</div>
                          <div>{application.destination}</div>
                          <div>{application.program}</div>
                          <div>
                            <Badge variant="secondary" className="bg-brand-navy-lightest">
                              {application.status}
                            </Badge>
                          </div>
                          <div className="text-right text-muted-foreground">{application.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
