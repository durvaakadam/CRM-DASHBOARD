"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Clock,
  Target,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  Activity,
  BarChart3,
  Zap,
  Filter,
  RefreshCw,
  UserCheck,
  MessageCircle,
  FileText,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  TrendingDown,
} from "lucide-react"
import {
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  ScatterChart,
  Funnel,
  FunnelChart,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Brush,
} from "recharts"

export default function CounsellorAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [animationKey, setAnimationKey] = useState(0)
  const [activeMetric, setActiveMetric] = useState("students")

  // Trigger animation refresh when time range changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [timeRange])

  // Enhanced mock data for counsellor-specific metrics
  const monthlyStudentData = [
    {
      month: "Jan",
      newStudents: 5,
      conversions: 4,
      consultations: 8,
      followUps: 12,
      satisfaction: 4.2,
      commissionEarned: 2000,
      avgProcessingTime: 40,
      documentsProcessed: 15,
      callsCompleted: 25,
      emailsSent: 45,
    },
    {
      month: "Feb",
      newStudents: 7,
      conversions: 5,
      consultations: 12,
      followUps: 18,
      satisfaction: 4.3,
      commissionEarned: 2500,
      avgProcessingTime: 39,
      documentsProcessed: 20,
      callsCompleted: 32,
      emailsSent: 55,
    },
    {
      month: "Mar",
      newStudents: 8,
      conversions: 6,
      consultations: 15,
      followUps: 22,
      satisfaction: 4.1,
      commissionEarned: 3000,
      avgProcessingTime: 38,
      documentsProcessed: 24,
      callsCompleted: 38,
      emailsSent: 62,
    },
    {
      month: "Apr",
      newStudents: 10,
      conversions: 7,
      consultations: 18,
      followUps: 25,
      satisfaction: 4.4,
      commissionEarned: 3500,
      avgProcessingTime: 37,
      documentsProcessed: 28,
      callsCompleted: 45,
      emailsSent: 70,
    },
    {
      month: "May",
      newStudents: 12,
      conversions: 9,
      consultations: 22,
      followUps: 30,
      satisfaction: 4.5,
      commissionEarned: 4500,
      avgProcessingTime: 36,
      documentsProcessed: 35,
      callsCompleted: 55,
      emailsSent: 85,
    },
    {
      month: "Jun",
      newStudents: 15,
      conversions: 12,
      consultations: 25,
      followUps: 35,
      satisfaction: 4.3,
      commissionEarned: 6000,
      avgProcessingTime: 35,
      documentsProcessed: 42,
      callsCompleted: 65,
      emailsSent: 95,
    },
    {
      month: "Jul",
      newStudents: 14,
      conversions: 11,
      consultations: 28,
      followUps: 38,
      satisfaction: 4.6,
      commissionEarned: 5500,
      avgProcessingTime: 34,
      documentsProcessed: 38,
      callsCompleted: 72,
      emailsSent: 105,
    },
    {
      month: "Aug",
      newStudents: 16,
      conversions: 13,
      consultations: 30,
      followUps: 42,
      satisfaction: 4.4,
      commissionEarned: 6500,
      avgProcessingTime: 33,
      documentsProcessed: 45,
      callsCompleted: 78,
      emailsSent: 115,
    },
    {
      month: "Sep",
      newStudents: 18,
      conversions: 14,
      consultations: 35,
      followUps: 48,
      satisfaction: 4.7,
      commissionEarned: 7000,
      avgProcessingTime: 32,
      documentsProcessed: 52,
      callsCompleted: 85,
      emailsSent: 125,
    },
    {
      month: "Oct",
      newStudents: 17,
      conversions: 13,
      consultations: 32,
      followUps: 45,
      satisfaction: 4.5,
      commissionEarned: 6500,
      avgProcessingTime: 31,
      documentsProcessed: 48,
      callsCompleted: 82,
      emailsSent: 122,
    },
    {
      month: "Nov",
      newStudents: 19,
      conversions: 15,
      consultations: 38,
      followUps: 52,
      satisfaction: 4.8,
      commissionEarned: 7500,
      avgProcessingTime: 30,
      documentsProcessed: 55,
      callsCompleted: 92,
      emailsSent: 135,
    },
    {
      month: "Dec",
      newStudents: 20,
      conversions: 16,
      consultations: 40,
      followUps: 55,
      satisfaction: 4.6,
      commissionEarned: 8000,
      avgProcessingTime: 29,
      documentsProcessed: 58,
      callsCompleted: 98,
      emailsSent: 145,
    },
  ]

  const studentJourneyData = [
    { stage: "Initial Contact", students: 250, conversion: 100 },
    { stage: "Consultation", students: 200, conversion: 80 },
    { stage: "Documentation", students: 160, conversion: 70 },
    { stage: "Application", students: 140, conversion: 85 },
    { stage: "Interview Prep", students: 120, conversion: 90 },
    { stage: "Final Submission", students: 110, conversion: 95 },
    { stage: "Acceptance", students: 97, conversion: 88 },
  ]

  const communicationHeatmap = [
    { day: "Mon", hour: "9AM", calls: 3, emails: 8 },
    { day: "Mon", hour: "12PM", calls: 5, emails: 12 },
    { day: "Mon", hour: "3PM", calls: 7, emails: 15 },
    { day: "Mon", hour: "6PM", calls: 4, emails: 6 },
    { day: "Tue", hour: "9AM", calls: 4, emails: 10 },
    { day: "Tue", hour: "12PM", calls: 6, emails: 14 },
    { day: "Tue", hour: "3PM", calls: 8, emails: 18 },
    { day: "Tue", hour: "6PM", calls: 5, emails: 8 },
    { day: "Wed", hour: "9AM", calls: 5, emails: 12 },
    { day: "Wed", hour: "12PM", calls: 7, emails: 16 },
    { day: "Wed", hour: "3PM", calls: 9, emails: 20 },
    { day: "Wed", hour: "6PM", calls: 6, emails: 10 },
    { day: "Thu", hour: "9AM", calls: 4, emails: 9 },
    { day: "Thu", hour: "12PM", calls: 6, emails: 13 },
    { day: "Thu", hour: "3PM", calls: 8, emails: 17 },
    { day: "Thu", hour: "6PM", calls: 5, emails: 7 },
    { day: "Fri", hour: "9AM", calls: 6, emails: 11 },
    { day: "Fri", hour: "12PM", calls: 8, emails: 15 },
    { day: "Fri", hour: "3PM", calls: 10, emails: 22 },
    { day: "Fri", hour: "6PM", calls: 7, emails: 12 },
  ]

  const destinationPerformance = [
    { country: "USA", students: 45, successRate: 78, avgFee: 45000, satisfaction: 4.5, processingTime: 35 },
    { country: "UK", students: 32, successRate: 82, avgFee: 38000, satisfaction: 4.3, processingTime: 28 },
    { country: "Canada", students: 28, successRate: 85, avgFee: 32000, satisfaction: 4.6, processingTime: 25 },
    { country: "Australia", students: 22, successRate: 80, avgFee: 35000, satisfaction: 4.4, processingTime: 30 },
    { country: "Germany", students: 15, successRate: 88, avgFee: 28000, satisfaction: 4.7, processingTime: 32 },
    { country: "Netherlands", students: 12, successRate: 75, avgFee: 30000, satisfaction: 4.2, processingTime: 27 },
  ]

  const studentStatusBreakdown = [
    { name: "Active Applications", value: 45, fill: "#3B82F6" },
    { name: "Under Review", value: 28, fill: "#F59E0B" },
    { name: "Awaiting Documents", value: 18, fill: "#EF4444" },
    { name: "Interview Scheduled", value: 15, fill: "#8B5CF6" },
    { name: "Accepted", value: 35, fill: "#10B981" },
    { name: "Rejected", value: 8, fill: "#6B7280" },
  ]

  const performanceVsTargets = [
    { metric: "New Students", actual: 124, target: 120, percentage: 103 },
    { metric: "Conversions", actual: 97, target: 90, percentage: 108 },
    { metric: "Satisfaction", actual: 4.6, target: 4.5, percentage: 102 },
    { metric: "Processing Time", actual: 29, target: 35, percentage: 83 },
    { metric: "Commission", actual: 12500, target: 12000, percentage: 104 },
  ]

  const weeklyActivityData = [
    { day: "Mon", consultations: 8, followUps: 12, documents: 5, calls: 15 },
    { day: "Tue", consultations: 10, followUps: 15, documents: 7, calls: 18 },
    { day: "Wed", consultations: 12, followUps: 18, documents: 8, calls: 22 },
    { day: "Thu", consultations: 9, followUps: 14, documents: 6, calls: 16 },
    { day: "Fri", consultations: 11, followUps: 16, documents: 9, calls: 20 },
    { day: "Sat", consultations: 4, followUps: 8, documents: 3, calls: 6 },
    { day: "Sun", consultations: 2, followUps: 5, documents: 1, calls: 3 },
  ]

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"]
  const GRADIENT_COLORS = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-red-500 to-pink-600",
    "from-purple-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
  ]

  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-8 max-w-full overflow-x-auto min-w-0">
        {/* Header Section with Enhanced Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Performance Hub
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Track your student success and personal metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "students", label: "Students", icon: Users },
              { key: "commission", label: "Commission", icon: DollarSign },
              { key: "satisfaction", label: "Satisfaction", icon: Star },
              { key: "activity", label: "Activity", icon: Activity },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeMetric === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMetric(key)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Hero KPI Section - Counsellor Focused */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          {/* Large Featured Metric */}
          <Card className="lg:col-span-6 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Active Students</CardTitle>
                    <CardDescription>Your student portfolio</CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-4xl font-bold">124</div>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyStudentData.slice(-6)} key={`hero-${animationKey}`}>
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="newStudents"
                        stroke="#10B981"
                        strokeWidth={3}
                        fill="url(#heroGradient)"
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">78%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">29</div>
                    <div className="text-xs text-muted-foreground">Avg Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.6</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Card */}
          <Card className="lg:col-span-3 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950 dark:to-orange-900 border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Commission</CardTitle>
                  <CardDescription>This year</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">$12.5K</div>
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyStudentData.slice(-4)}>
                      <defs>
                        <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="commissionEarned"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        fill="url(#commissionGradient)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <Badge variant="secondary" className="w-full justify-center text-brand-navy-lightest">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% vs last month
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="lg:col-span-3 grid gap-4">
            {[
              { title: "Conversions", value: "97", icon: Target, color: "text-blue-600" },
              { title: "Consultations", value: "340", icon: MessageCircle, color: "text-green-600" },
            ].map((stat) => (
              <Card key={stat.title} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.title}</div>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Communication
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Student Journey & Performance vs Targets */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Student Journey Funnel
                  </CardTitle>
                  <CardDescription>Track student progress through your pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart key={`funnel-${animationKey}`}>
                        <Tooltip />
                        <Funnel 
                          dataKey="students" 
                          data={studentJourneyData.map((item, index) => ({
                            ...item,
                            fill: COLORS[index % COLORS.length]
                          }))} 
                          isAnimationActive={true} 
                          animationDuration={2000} 
                        />
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Performance vs Targets
                  </CardTitle>
                  <CardDescription>How you're performing against your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={performanceVsTargets} key={`targets-${animationKey}`}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#3B82F6" animationDuration={1500} />
                        <ReferenceLine y={100} stroke="#10B981" strokeDasharray="5 5" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Activity Breakdown */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Weekly Activity Breakdown
                </CardTitle>
                <CardDescription>Your daily activity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={weeklyActivityData} key={`weekly-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultations" stackId="a" fill="#3B82F6" animationDuration={1200} />
                      <Bar dataKey="followUps" stackId="a" fill="#10B981" animationDuration={1400} />
                      <Bar dataKey="documents" stackId="a" fill="#F59E0B" animationDuration={1600} />
                      <Line 
                        type="monotone" 
                        dataKey="calls" 
                        stroke="#EF4444" 
                        strokeWidth={3} 
                        animationDuration={2000} 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Student Status Pie Chart */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  Current Student Status Distribution
                </CardTitle>
                <CardDescription>Breakdown of your student portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart key={`pie-${animationKey}`}>
                      <Pie
                        data={studentStatusBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        animationDuration={2000}
                      >
                        {studentStatusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Destination Performance Bubble Chart */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Destination Performance Analysis
                </CardTitle>
                <CardDescription>Student success by destination country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={destinationPerformance} key={`destinations-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="students" name="Students" />
                      <YAxis dataKey="successRate" name="Success Rate %" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.country}</p>
                                <p>Students: {data.students}</p>
                                <p>Success Rate: {data.successRate}%</p>
                                <p>Avg Fee: ${data.avgFee.toLocaleString()}</p>
                                <p>Processing: {data.processingTime} days</p>
                                <p>Satisfaction: {data.satisfaction}/5</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter name="A" dataKey="avgFee" fill="#3B82F6" animationDuration={2000}>
                        {destinationPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Student Metrics */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Monthly Student Metrics
                </CardTitle>
                <CardDescription>Track your student acquisition and conversion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyStudentData} key={`monthly-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="newStudents" 
                        fill="#3B82F6" 
                        name="New Students"
                        animationDuration={1500}
                      />
                      <Bar 
                        yAxisId="left" 
                        dataKey="conversions" 
                        fill="#10B981" 
                        name="Conversions"
                        animationDuration={1700}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        name="Satisfaction"
                        animationDuration={2000}
                      />
                      <Brush dataKey="month" height={30} stroke="#8884d8" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            {/* Performance Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Conversion Rate",
                  value: "78%",
                  change: "+5%",
                  icon: Target,
                  color: "text-green-600",
                  bgColor: "bg-green-100 dark:bg-green-900"
                },
                {
                  title: "Avg Processing Time",
                  value: "29 days",
                  change: "-6 days",
                  icon: Clock,
                  color: "text-blue-600",
                  bgColor: "bg-blue-100 dark:bg-blue-900"
                },
                {
                  title: "Customer Satisfaction",
                  value: "4.6/5",
                  change: "+0.2",
                  icon: Star,
                  color: "text-yellow-600",
                  bgColor: "bg-yellow-100 dark:bg-yellow-900"
                },
                {
                  title: "Documents Processed",
                  value: "453",
                  change: "+12%",
                  icon: FileText,
                  color: "text-purple-600",
                  bgColor: "bg-purple-100 dark:bg-purple-900"
                }
              ].map((metric) => (
                <Card key={metric.title} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <Badge variant="secondary" className="text-xs">
                          {metric.change.startsWith('+') ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {metric.change}
                        </Badge>
                      </div>
                      <div className={`p-3 rounded-full ${metric.bgColor}`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Trends */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Track your key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyStudentData} key={`performance-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="commissionEarned"
                        fill="#3B82F6"
                        stroke="#3B82F6"
                        fillOpacity={0.3}
                        name="Commission ($)"
                        animationDuration={2000}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="avgProcessingTime"
                        stroke="#EF4444"
                        strokeWidth={3}
                        name="Processing Time (days)"
                        animationDuration={2500}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Satisfaction Rating"
                        animationDuration={3000}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Radial Performance Chart */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold-500" />
                  Goal Achievement
                </CardTitle>
                <CardDescription>Your progress towards annual targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      data={performanceVsTargets}
                      key={`radial-${animationKey}`}
                    >
                      <RadialBar
                        label={{ position: "insideStart", fill: "#fff" }}
                        background
                        dataKey="percentage"
                        animationDuration={2000}
                      />
                      <Legend
                        iconSize={18}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            {/* Communication Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total Calls", value: "892", icon: Phone, color: "text-blue-600" },
                { title: "Emails Sent", value: "1,234", icon: Mail, color: "text-green-600" },
                { title: "Response Time", value: "2.3h", icon: Clock, color: "text-yellow-600" },
                { title: "Follow-ups", value: "456", icon: RefreshCw, color: "text-purple-600" }
              ].map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Communication Activity Heatmap */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Communication Activity Heatmap
                </CardTitle>
                <CardDescription>When you're most active with students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={communicationHeatmap} key={`heatmap-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis dataKey="day" />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.day} {data.hour}</p>
                                <p>Calls: {data.calls}</p>
                                <p>Emails: {data.emails}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter
                        name="Calls"
                        dataKey="calls"
                        fill="#3B82F6"
                        animationDuration={1500}
                      />
                      <Scatter
                        name="Emails"
                        dataKey="emails"
                        fill="#10B981"
                        animationDuration={2000}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Communication Trends */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Monthly Communication Trends
                </CardTitle>
                <CardDescription>Track your communication volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyStudentData} key={`comm-trends-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="callsCompleted"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        name="Calls"
                        animationDuration={1500}
                      />
                      <Area
                        type="monotone"
                        dataKey="emailsSent"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        name="Emails"
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            {/* Key Insights Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <CheckCircle className="h-5 w-5" />
                    Top Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Month</span>
                      <Badge variant="secondary" className="text-white">November</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peak Success Rate</span>
                      <Badge variant="secondary" className="text-white">88%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Top Destination</span>
                      <Badge variant="secondary" className="text-white">Germany</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <TrendingUp className="h-5 w-5" />
                    Growth Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Student Growth</span>
                      <Badge variant="secondary" className="text-white">+45%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Commission Growth</span>
                      <Badge variant="secondary" className="text-white">+62%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Efficiency Gain</span>
                      <Badge variant="secondary" className="text-white">+18%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950 dark:to-orange-900 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                    <AlertCircle className="h-5 w-5" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Document Speed</span>
                      <Badge variant="outline">Improve</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekend Activity</span>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Follow-up Rate</span>
                      <Badge variant="outline">Monitor</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Predictive Analytics */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>AI-powered insights for next quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Projected Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Expected New Students</span>
                        <span className="font-semibold">85-95</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span>Projected Commission</span>
                        <span className="font-semibold">$15,000</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span>Success Rate Target</span>
                        <span className="font-semibold">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Focus on Germany applications
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          88% success rate, fastest processing
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">
                          Increase weekend activity
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Untapped potential for growth
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                          Optimize document flow
                        </p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">
                          Reduce processing time by 15%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold-500" />
                  Recent Success Stories
                </CardTitle>
                <CardDescription>Your latest achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      student: "Rahul Sharma",
                      achievement: "Accepted to MIT for MS Computer Science",
                      date: "2 days ago",
                      icon: GraduationCap,
                      color: "text-blue-600"
                    },
                    {
                      student: "Priya Patel",
                      achievement: "Full scholarship to University of Toronto",
                      date: "1 week ago",
                      icon: Star,
                      color: "text-yellow-600"
                    },
                    {
                      student: "Arjun Mehta",
                      achievement: "Visa approved for TU Munich",
                      date: "2 weeks ago",
                      icon: CheckCircle,
                      color: "text-green-600"
                    }
                  ].map((story, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className={`p-2 rounded-full bg-background`}>
                        <story.icon className={`h-5 w-5 ${story.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{story.student}</p>
                        <p className="text-sm text-muted-foreground">{story.achievement}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {story.date}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}