import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 dark:from-blue-50 dark:to-white">
      <div className="container max-w-6xl animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-blue-900 md:text-6xl dark:text-blue-900">
            Study Abroad CRM
          </h1>
          <p className="text-xl text-blue-700 dark:text-blue-700">
            Comprehensive management system for your study abroad business
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden border-2 border-blue-800 transition-all duration-300 hover:shadow-lg dark:border-blue-800">
            <CardContent className="p-0">
              <div className="bg-blue-800 p-6 text-white dark:bg-blue-800">
                <h2 className="text-2xl font-bold">CEO Dashboard</h2>
                <p className="mt-2 text-blue-100 dark:text-blue-100">
                  Complete overview of your business with detailed insights and analytics
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-white">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Overall business insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Student management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Application tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Document verification</span>
                  </li>
                </ul>
                <Link href="/dashboard/ceo">
                  <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white">
                    Access CEO Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-blue-600 transition-all duration-300 hover:shadow-lg dark:border-blue-600">
            <CardContent className="p-0">
              <div className="bg-blue-600 p-6 text-white dark:bg-blue-600">
                <h2 className="text-2xl font-bold">Counsellor Dashboard</h2>
                <p className="mt-2 text-blue-100 dark:text-blue-100">
                  Manage students, appointments, and track applications efficiently
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-white">
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Student management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Calendar & appointments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Document processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-gray-700">Performance analytics</span>
                  </li>
                </ul>
                <Link href="/dashboard/counsellor">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Access Counsellor Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-blue-500 transition-all duration-300 hover:shadow-lg dark:border-blue-500">
    <CardContent className="p-0">
      <div className="bg-blue-500 p-6 text-white dark:bg-blue-500">
        <h2 className="text-2xl font-bold">HR Dashboard</h2>
        <p className="mt-2 text-blue-100 dark:text-blue-100">
          View appointments, manage interviews, and handle onboarding efficiently
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-white">
        <ul className="mb-6 space-y-2">
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-gray-700">Counselling appointments</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-gray-700">Interview scheduling</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-gray-700">Candidate tracking</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-gray-700">HR analytics</span>
          </li>
        </ul>
        <Link href="/dashboard/hr">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Access HR Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-600 dark:text-blue-600">
            Secure login required. Please use your credentials to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
