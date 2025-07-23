'use client'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Calendar, FileCheck, LineChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function CEODashboard() {
  const handleViewAll = () => {
    // Navigate to students page
    window.location.href = 'http://localhost:3000/dashboard/ceo/students';
  };

  return (
    <DashboardLayout userType="ceo" userName="John Smith">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CEO Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,853</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
              <div className="mt-4">
                <Progress value={75} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
              <div className="mt-4">
                <Progress value={65} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
              <div className="mt-4">
                <Progress value={45} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.8%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              <div className="mt-4">
                <Progress value={80} className="h-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 animate-fade-in [animation-delay:400ms]">
            <CardHeader>
              <CardTitle>Popular Destinations</CardTitle>
              <CardDescription>Top countries students are applying to this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-[30%]">United States</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Progress value={84} className="h-2" />
                      <span className="ml-2 text-sm">84%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[30%]">United Kingdom</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Progress value={72} className="h-2" />
                      <span className="ml-2 text-sm">72%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[30%]">Canada</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Progress value={65} className="h-2" />
                      <span className="ml-2 text-sm">65%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[30%]">Australia</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Progress value={52} className="h-2" />
                      <span className="ml-2 text-sm">52%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-[30%]">Germany</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Progress value={38} className="h-2" />
                      <span className="ml-2 text-sm">38%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 animate-fade-in [animation-delay:500ms]">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="mt-1 h-8 w-8 border">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">SM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sarah Miller approved 5 applications</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="mt-1 h-8 w-8 border">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-brand-navy-dark text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">James Davis scheduled 3 new appointments</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="mt-1 h-8 w-8 border">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-brand-navy-light text-white">AL</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Amy Lee uploaded 12 new documents</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="mt-1 h-8 w-8 border">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-brand-navy-medium text-white">RJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Robert Johnson verified 8 student documents</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 1:20 PM</p>
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
              <Button size="sm" variant="outline" className="gap-1" onClick={handleViewAll}>
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
            <TabsContent value="priority" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div>Student</div>
                      <div>Destination</div>
                      <div>Program</div>
                      <div>Counsellor</div>
                      <div>Status</div>
                      <div className="text-right">Priority</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Emma Wilson",
                          destination: "USA",
                          program: "Computer Science",
                          counsellor: "Sarah Miller",
                          status: "Document Review",
                          priority: "High",
                        },
                        {
                          name: "Michael Brown",
                          destination: "UK",
                          program: "Business Administration",
                          counsellor: "James Davis",
                          status: "Interview Scheduled",
                          priority: "High",
                        },
                        {
                          name: "Sophia Chen",
                          destination: "Canada",
                          program: "Engineering",
                          counsellor: "Amy Lee",
                          status: "Visa Processing",
                          priority: "Medium",
                        },
                        {
                          name: "Daniel Kim",
                          destination: "Australia",
                          program: "Medicine",
                          counsellor: "Robert Johnson",
                          status: "Application Review",
                          priority: "Medium",
                        },
                      ].map((application, i) => (
                        <div key={i} className="grid grid-cols-6 items-center p-3 text-sm">
                          <div className="font-medium">{application.name}</div>
                          <div>{application.destination}</div>
                          <div>{application.program}</div>
                          <div>{application.counsellor}</div>
                          <div>{application.status}</div>
                          <div className="text-right">
                            <Badge
                              variant={application.priority === "High" ? "destructive" : "outline"}
                              className={application.priority === "High" ? "" : "bg-brand-navy-light text-black"}
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
                    <div className="grid grid-cols-6 border-b bg-muted/50 p-3 text-sm font-medium">
                      <div>Student</div>
                      <div>Destination</div>
                      <div>Program</div>
                      <div>Counsellor</div>
                      <div>Status</div>
                      <div className="text-right">Date</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Alex Johnson",
                          destination: "Germany",
                          program: "Data Science",
                          counsellor: "Sarah Miller",
                          status: "New Application",
                          date: "Today",
                        },
                        {
                          name: "Jessica Lee",
                          destination: "France",
                          program: "Fine Arts",
                          counsellor: "James Davis",
                          status: "New Application",
                          date: "Today",
                        },
                        {
                          name: "Ryan Smith",
                          destination: "Japan",
                          program: "International Relations",
                          counsellor: "Amy Lee",
                          status: "New Application",
                          date: "Yesterday",
                        },
                        {
                          name: "Olivia Garcia",
                          destination: "Spain",
                          program: "Architecture",
                          counsellor: "Robert Johnson",
                          status: "New Application",
                          date: "Yesterday",
                        },
                      ].map((application, i) => (
                        <div key={i} className="grid grid-cols-6 items-center p-3 text-sm">
                          <div className="font-medium">{application.name}</div>
                          <div>{application.destination}</div>
                          <div>{application.program}</div>
                          <div>{application.counsellor}</div>
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