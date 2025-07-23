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
  Treemap,
  Brush,
} from "recharts"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [animationKey, setAnimationKey] = useState(0)
  const [activeMetric, setActiveMetric] = useState("applications")

  // Trigger animation refresh when time range changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1)
  }, [timeRange])

  // Enhanced and diverse mock data
  const monthlyApplicationsData = [
    {
      month: "Jan",
      applications: 45,
      conversions: 32,
      revenue: 48000,
      satisfaction: 4.2,
      inquiries: 120,
      rejections: 13,
    },
    {
      month: "Feb",
      applications: 52,
      conversions: 36,
      revenue: 54000,
      satisfaction: 4.3,
      inquiries: 135,
      rejections: 16,
    },
    {
      month: "Mar",
      applications: 61,
      conversions: 42,
      revenue: 63000,
      satisfaction: 4.1,
      inquiries: 150,
      rejections: 19,
    },
    {
      month: "Apr",
      applications: 67,
      conversions: 45,
      revenue: 67500,
      satisfaction: 4.4,
      inquiries: 165,
      rejections: 22,
    },
    {
      month: "May",
      applications: 75,
      conversions: 52,
      revenue: 78000,
      satisfaction: 4.5,
      inquiries: 180,
      rejections: 23,
    },
    {
      month: "Jun",
      applications: 87,
      conversions: 61,
      revenue: 91500,
      satisfaction: 4.3,
      inquiries: 195,
      rejections: 26,
    },
    {
      month: "Jul",
      applications: 95,
      conversions: 68,
      revenue: 102000,
      satisfaction: 4.6,
      inquiries: 210,
      rejections: 27,
    },
    {
      month: "Aug",
      applications: 102,
      conversions: 73,
      revenue: 109500,
      satisfaction: 4.4,
      inquiries: 225,
      rejections: 29,
    },
    {
      month: "Sep",
      applications: 110,
      conversions: 79,
      revenue: 118500,
      satisfaction: 4.7,
      inquiries: 240,
      rejections: 31,
    },
    {
      month: "Oct",
      applications: 118,
      conversions: 85,
      revenue: 127500,
      satisfaction: 4.5,
      inquiries: 255,
      rejections: 33,
    },
    {
      month: "Nov",
      applications: 125,
      conversions: 91,
      revenue: 136500,
      satisfaction: 4.8,
      inquiries: 270,
      rejections: 34,
    },
    {
      month: "Dec",
      applications: 132,
      conversions: 97,
      revenue: 145500,
      satisfaction: 4.6,
      inquiries: 285,
      rejections: 35,
    },
  ]

  const heatmapData = [
    { day: "Mon", hour: "9AM", value: 15, applications: 12 },
    { day: "Mon", hour: "12PM", value: 25, applications: 20 },
    { day: "Mon", hour: "3PM", value: 35, applications: 28 },
    { day: "Mon", hour: "6PM", value: 20, applications: 16 },
    { day: "Tue", hour: "9AM", value: 18, applications: 14 },
    { day: "Tue", hour: "12PM", value: 30, applications: 24 },
    { day: "Tue", hour: "3PM", value: 40, applications: 32 },
    { day: "Tue", hour: "6PM", value: 25, applications: 20 },
    { day: "Wed", hour: "9AM", value: 22, applications: 18 },
    { day: "Wed", hour: "12PM", value: 35, applications: 28 },
    { day: "Wed", hour: "3PM", value: 45, applications: 36 },
    { day: "Wed", hour: "6PM", value: 30, applications: 24 },
    { day: "Thu", hour: "9AM", value: 20, applications: 16 },
    { day: "Thu", hour: "12PM", value: 32, applications: 26 },
    { day: "Thu", hour: "3PM", value: 42, applications: 34 },
    { day: "Thu", hour: "6PM", value: 28, applications: 22 },
    { day: "Fri", hour: "9AM", value: 25, applications: 20 },
    { day: "Fri", hour: "12PM", value: 38, applications: 30 },
    { day: "Fri", hour: "3PM", value: 48, applications: 38 },
    { day: "Fri", hour: "6PM", value: 35, applications: 28 },
  ]

  const treemapData = [
    {
      name: "USA Universities",
      size: 450,
      children: [
        { name: "Harvard", size: 85, value: 85 },
        { name: "MIT", size: 78, value: 78 },
        { name: "Stanford", size: 92, value: 92 },
        { name: "Yale", size: 65, value: 65 },
        { name: "Princeton", size: 58, value: 58 },
        { name: "Others", size: 72, value: 72 },
      ],
    },
    {
      name: "UK Universities",
      size: 320,
      children: [
        { name: "Oxford", size: 95, value: 95 },
        { name: "Cambridge", size: 88, value: 88 },
        { name: "Imperial", size: 67, value: 67 },
        { name: "UCL", size: 45, value: 45 },
        { name: "Others", size: 25, value: 25 },
      ],
    },
    {
      name: "Canada Universities",
      size: 280,
      children: [
        { name: "Toronto", size: 75, value: 75 },
        { name: "UBC", size: 68, value: 68 },
        { name: "McGill", size: 62, value: 62 },
        { name: "Waterloo", size: 45, value: 45 },
        { name: "Others", size: 30, value: 30 },
      ],
    },
    {
      name: "Australia Universities",
      size: 220,
      children: [
        { name: "Melbourne", size: 65, value: 65 },
        { name: "Sydney", size: 58, value: 58 },
        { name: "ANU", size: 42, value: 42 },
        { name: "UNSW", size: 35, value: 35 },
        { name: "Others", size: 20, value: 20 },
      ],
    },
  ]

  const bubbleChartData = [
    { country: "USA", applications: 450, avgFee: 45000, successRate: 78, students: 420 },
    { country: "UK", applications: 320, avgFee: 38000, successRate: 82, students: 300 },
    { country: "Canada", applications: 280, avgFee: 32000, successRate: 85, students: 240 },
    { country: "Australia", applications: 220, avgFee: 35000, successRate: 80, students: 180 },
    { country: "Germany", applications: 150, avgFee: 28000, successRate: 88, students: 130 },
    { country: "Netherlands", applications: 120, avgFee: 30000, successRate: 75, students: 90 },
    { country: "France", applications: 100, avgFee: 25000, successRate: 70, students: 70 },
    { country: "Singapore", applications: 80, avgFee: 40000, successRate: 90, students: 72 },
  ]

  const radarData = [
    { subject: "Communication", A: 85, B: 78, fullMark: 100 },
    { subject: "Process Speed", A: 78, B: 85, fullMark: 100 },
    { subject: "Documentation", A: 92, B: 88, fullMark: 100 },
    { subject: "Support Quality", A: 88, B: 82, fullMark: 100 },
    { subject: "Follow-up", A: 75, B: 90, fullMark: 100 },
    { subject: "Expertise", A: 95, B: 85, fullMark: 100 },
  ]

  const waterfallData = [
    { name: "Initial Inquiries", value: 1000, cumulative: 1000 },
    { name: "Qualified Leads", value: -250, cumulative: 750 },
    { name: "Consultations", value: -150, cumulative: 600 },
    { name: "Applications", value: -100, cumulative: 500 },
    { name: "Approvals", value: -150, cumulative: 350 },
    { name: "Final Enrollments", value: -70, cumulative: 280 },
  ]

  const funnelData = [
    { name: "Inquiries", value: 1000, fill: "#8884d8" },
    { name: "Consultations", value: 750, fill: "#83a6ed" },
    { name: "Applications", value: 500, fill: "#8dd1e1" },
    { name: "Approvals", value: 350, fill: "#82ca9d" },
    { name: "Enrollments", value: 280, fill: "#a4de6c" },
  ]

  const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"]
  const GRADIENT_COLORS = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-red-500 to-pink-600",
    "from-purple-500 to-indigo-600",
    "from-cyan-500 to-blue-600",
  ]

  return (
    <DashboardLayout userType="ceo" userName="John Smith">
      <div className="space-y-8 max-w-full overflow-x-auto min-w-0">
        {/* Header Section with Enhanced Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Analytics Hub
              </h1>
              <p className="text-lg text-muted-foreground mt-2">Advanced insights and performance metrics</p>
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
              { key: "applications", label: "Applications", icon: Users },
              { key: "revenue", label: "Revenue", icon: DollarSign },
              { key: "satisfaction", label: "Satisfaction", icon: Star },
              { key: "processing", label: "Processing", icon: Clock },
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

        {/* Hero KPI Section - Asymmetric Layout */}
        <div className="grid gap-6 lg:grid-cols-12 min-w-0">
          {/* Large Featured Metric */}
          <Card className="lg:col-span-5 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-0 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Total Applications</CardTitle>
                    <CardDescription>This year's performance</CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-4xl font-bold">2,853</div>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyApplicationsData.slice(-6)} key={`hero-${animationKey}`}>
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="applications"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        fill="url(#heroGradient)"
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">73%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">32</div>
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

          {/* Compact Metrics Grid */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Revenue",
                value: "$1.2M",
                change: "+22%",
                icon: DollarSign,
                color: "green",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                title: "Conversion Rate",
                value: "72.3%",
                change: "+5.2%",
                icon: Target,
                color: "blue",
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                title: "Processing Time",
                value: "32 Days",
                change: "-9.4%",
                icon: Clock,
                color: "purple",
                gradient: "from-purple-500 to-violet-600",
              },
              {
                title: "Satisfaction",
                value: "4.6/5",
                change: "+0.3",
                icon: Star,
                color: "yellow",
                gradient: "from-yellow-500 to-orange-600",
              },
            ].map((metric, index) => (
              <Card
                key={metric.title}
                className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.gradient}`}>
                      <metric.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs text-white ">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.title}</div>
                  </div>
                  <Progress value={Math.random() * 100} className="mt-3 h-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs with Enhanced Layout */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="geography" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Geography
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab - Mixed Layout */}
          <TabsContent value="overview" className="space-y-8">
            {/* Revenue Waterfall & Funnel Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    Revenue Waterfall
                  </CardTitle>
                  <CardDescription>Revenue breakdown and flow analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={waterfallData} key={`waterfall-${animationKey}`}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3B82F6" animationDuration={1500} />
                        <Line
                          type="monotone"
                          dataKey="cumulative"
                          stroke="#EF4444"
                          strokeWidth={3}
                          animationDuration={2000}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    Conversion Funnel
                  </CardTitle>
                  <CardDescription>Student journey optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart key={`funnel-${animationKey}`}>
                        <Tooltip />
                        <Funnel dataKey="value" data={funnelData} isAnimationActive={true} animationDuration={2000} />
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Heatmap - Full Width */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Application Activity Heatmap
                </CardTitle>
                <CardDescription>Peak application times throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <div className="grid grid-cols-4 gap-2 h-full">
                    {["9AM", "12PM", "3PM", "6PM"].map((hour) => (
                      <div key={hour} className="space-y-2">
                        <div className="text-xs font-medium text-center">{hour}</div>
                        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
                          const dataPoint = heatmapData.find((d) => d.day === day && d.hour === hour)
                          const intensity = dataPoint ? dataPoint.value / 50 : 0
                          return (
                            <div
                              key={`${day}-${hour}`}
                              className="h-6 rounded flex items-center justify-center text-xs font-medium transition-all duration-300 hover:scale-110"
                              style={{
                                backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                                color: intensity > 0.5 ? "white" : "black",
                              }}
                              title={`${day} ${hour}: ${dataPoint?.applications || 0} applications`}
                            >
                              {dataPoint?.applications || 0}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* University Treemap */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  University Application Distribution
                </CardTitle>
                <CardDescription>Applications by university and country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treemapData}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="#fff"
                      fill="#8884d8"
                      key={`treemap-${animationKey}`}
                    >
                      <Tooltip />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Radar Chart */}
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Performance Radar
                  </CardTitle>
                  <CardDescription>Multi-dimensional performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="20%"
                        outerRadius="80%"
                        data={radarData}
                        key={`radar-${animationKey}`}
                      >
                        <RadialBar dataKey="A" cornerRadius={10} fill="#8884d8" animationDuration={2000} />
                        <RadialBar dataKey="B" cornerRadius={10} fill="#82ca9d" animationDuration={2500} />
                        <Legend />
                        <Tooltip />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                  <CardDescription>Current performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Efficiency", value: 87, color: "bg-blue-500" },
                    { label: "Quality", value: 92, color: "bg-green-500" },
                    { label: "Speed", value: 78, color: "bg-yellow-500" },
                    { label: "Satisfaction", value: 95, color: "bg-purple-500" },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{metric.label}</span>
                        <span className="text-muted-foreground">{metric.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${metric.color} transition-all duration-1000`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-6">
            {/* Bubble Chart */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Global Application Distribution
                </CardTitle>
                <CardDescription>Applications by country with success rates and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={bubbleChartData} key={`bubble-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="applications" name="Applications" />
                      <YAxis dataKey="successRate" name="Success Rate %" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border rounded-lg shadow-lg">
                                <p className="font-semibold">{data.country}</p>
                                <p>Applications: {data.applications}</p>
                                <p>Success Rate: {data.successRate}%</p>
                                <p>Avg Fee: ${data.avgFee.toLocaleString()}</p>
                                <p>Students: {data.students}</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Scatter name="Countries" data={bubbleChartData} fill="#8884d8" animationDuration={2000} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Country Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {bubbleChartData.slice(0, 4).map((country, index) => (
                <Card
                  key={country.country}
                  className={`overflow-hidden bg-gradient-to-br ${GRADIENT_COLORS[index]} text-white`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <MapPin className="h-6 w-6" />
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{country.country}</h3>
                      <div className="text-sm opacity-90">
                        <div>{country.applications} Applications</div>
                        <div>{country.successRate}% Success Rate</div>
                        <div>${country.avgFee.toLocaleString()} Avg Fee</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Multi-Metric Trend Analysis
                </CardTitle>
                <CardDescription>Comprehensive trend analysis with brush selection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyApplicationsData} key={`trends-${animationKey}`}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="inquiries"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                        animationDuration={1500}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="applications"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.3}
                        animationDuration={1800}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#ff7300"
                        strokeWidth={3}
                        animationDuration={2000}
                      />
                      <Bar yAxisId="left" dataKey="rejections" fill="#ff4444" animationDuration={1200} />
                      <Brush dataKey="month" height={30} stroke="#8884d8" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { insight: "Peak application time is Wednesday 3PM", impact: "High", color: "text-red-600" },
                    { insight: "USA applications show 18% growth", impact: "Medium", color: "text-yellow-600" },
                    {
                      insight: "Customer satisfaction improved by 0.3 points",
                      impact: "High",
                      color: "text-green-600",
                    },
                    { insight: "Processing time reduced by 3 days", impact: "Medium", color: "text-blue-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{item.insight}</span>
                      <Badge variant="outline" className={item.color}>
                        {item.impact}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Focus marketing efforts on Wednesday afternoons",
                    "Expand USA university partnerships",
                    "Implement satisfaction feedback loop",
                    "Optimize document processing workflow",
                  ].map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
