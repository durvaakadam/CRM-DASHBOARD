"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Download, Eye, FileCheck, FileText, Filter, Search, Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CounsellorDocumentsPage() {
  const [verificationStatus, setVerificationStatus] = useState("all")
  const [documentType, setDocumentType] = useState("all")

  // Mock documents data - only showing documents for this counsellor's students
  const documents = [
    {
      id: 1,
      name: "Passport.pdf",
      type: "Passport",
      student: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        avatar: "/placeholder.svg",
      },
      uploadDate: "2025-06-01",
      status: "Verified",
      verificationDetails: {
        method: "Auto",
        date: "2025-06-01",
        extractedInfo: {
          name: "Emma Wilson",
          passportNumber: "AB1234567",
          dateOfBirth: "1998-05-15",
          expiryDate: "2030-05-14",
          nationality: "United States",
        },
      },
    },
    {
      id: 2,
      name: "Academic_Transcript.pdf",
      type: "Academic Transcript",
      student: {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "/placeholder.svg",
      },
      uploadDate: "2025-05-28",
      status: "Verified",
      verificationDetails: {
        method: "Manual",
        date: "2025-05-29",
        extractedInfo: {
          institution: "Lincoln High School",
          graduationDate: "2024-05-15",
          gpa: "3.8/4.0",
          subjects: ["Mathematics", "Physics", "English", "History"],
        },
      },
    },
    {
      id: 3,
      name: "Statement_of_Purpose.pdf",
      type: "Statement of Purpose",
      student: {
        name: "Sophia Chen",
        email: "sophia.chen@example.com",
        avatar: "/placeholder.svg",
      },
      uploadDate: "2025-05-25",
      status: "Pending",
      verificationDetails: {
        method: "Pending",
        date: "-",
      },
    },
    {
      id: 4,
      name: "Recommendation_Letter.pdf",
      type: "Recommendation Letter",
      student: {
        name: "Daniel Kim",
        email: "daniel.kim@example.com",
        avatar: "/placeholder.svg",
      },
      uploadDate: "2025-06-02",
      status: "Rejected",
      verificationDetails: {
        method: "Auto",
        date: "2025-06-02",
        reason: "Signature verification failed",
      },
    },
    {
      id: 5,
      name: "English_Proficiency.pdf",
      type: "Language Proficiency",
      student: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "/placeholder.svg",
      },
      uploadDate: "2025-06-03",
      status: "Verified",
      verificationDetails: {
        method: "Auto",
        date: "2025-06-03",
        extractedInfo: {
          test: "IELTS",
          overallScore: "7.5",
          listeningScore: "8.0",
          readingScore: "7.5",
          writingScore: "7.0",
          speakingScore: "7.5",
          testDate: "2025-05-15",
        },
      },
    },
  ]

  // Filter documents based on verification status and document type
  const filteredDocuments = documents.filter((document) => {
    if (verificationStatus !== "all" && document.status.toLowerCase() !== verificationStatus.toLowerCase()) {
      return false
    }
    if (documentType !== "all" && document.type !== documentType) {
      return false
    }
    return true
  })

  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground">Manage and verify student documents</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-brand-navy-dark hover:bg-brand-navy-medium">
                  <Upload className="h-4 w-4" /> Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>Upload a new document for verification</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="student" className="text-sm font-medium">
                      Student
                    </label>
                    <Select>
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma Wilson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                        <SelectItem value="sophia">Sophia Chen</SelectItem>
                        <SelectItem value="daniel">Daniel Kim</SelectItem>
                        <SelectItem value="alex">Alex Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="document-type" className="text-sm font-medium">
                      Document Type
                    </label>
                    <Select>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="academic">Academic Transcript</SelectItem>
                        <SelectItem value="statement">Statement of Purpose</SelectItem>
                        <SelectItem value="recommendation">Recommendation Letter</SelectItem>
                        <SelectItem value="language">Language Proficiency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="file" className="text-sm font-medium">
                      File
                    </label>
                    <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-muted/50 px-4 py-8 text-center">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG (max 10MB)</p>
                      <input type="file" className="hidden" id="file" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="auto-verify" className="flex items-center gap-2 text-sm font-medium">
                      <input type="checkbox" id="auto-verify" className="h-4 w-4 rounded border-gray-300" />
                      Auto-verify document
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Our system will automatically verify and extract information from the document
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Upload & Process</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search documents..." className="pl-8 w-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue={verificationStatus} onValueChange={setVerificationStatus}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="w-[140px] md:w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Passport">Passport</SelectItem>
                <SelectItem value="Academic Transcript">Academic Transcript</SelectItem>
                <SelectItem value="Statement of Purpose">Statement of Purpose</SelectItem>
                <SelectItem value="Recommendation Letter">Recommendation Letter</SelectItem>
                <SelectItem value="Language Proficiency">Language Proficiency</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">More Filters</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Document Verification</CardTitle>
            <CardDescription>
              Auto-verification system has processed{" "}
              {documents.filter((d) => d.verificationDetails.method === "Auto").length} documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verified</p>
                      <p className="text-2xl font-bold">{documents.filter((d) => d.status === "Verified").length}</p>
                    </div>
                  </div>
                  <Progress value={70} className="h-2 w-16" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                      <FileText className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{documents.filter((d) => d.status === "Pending").length}</p>
                    </div>
                  </div>
                  <Progress value={20} className="h-2 w-16" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                      <p className="text-2xl font-bold">{documents.filter((d) => d.status === "Rejected").length}</p>
                    </div>
                  </div>
                  <Progress value={10} className="h-2 w-16" />
                </CardContent>
              </Card>
            </div>

            <div className="overflow-x-auto rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap p-3 text-left font-medium">Document</th>
                    <th className="whitespace-nowrap p-3 text-left font-medium">Student</th>
                    <th className="whitespace-nowrap p-3 text-left font-medium hidden md:table-cell">Upload Date</th>
                    <th className="whitespace-nowrap p-3 text-left font-medium">Status</th>
                    <th className="whitespace-nowrap p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <FileCheck className="h-10 w-10 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No documents found</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Try adjusting your filters to find what you're looking for.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((document) => (
                      <tr key={document.id}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">{document.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={document.student.avatar || "/placeholder.svg"}
                                alt={document.student.name}
                              />
                              <AvatarFallback className="bg-brand-navy-medium text-white">
                                {document.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{document.student.name}</p>
                              <p className="hidden text-xs text-muted-foreground sm:block">{document.student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">
                          <p>{document.uploadDate}</p>
                          <p className="text-xs text-muted-foreground">
                            {document.verificationDetails.method === "Auto"
                              ? "Auto-verified"
                              : document.verificationDetails.method === "Manual"
                                ? "Manually verified"
                                : "Awaiting verification"}
                          </p>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              document.status === "Verified"
                                ? "outline"
                                : document.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              document.status === "Verified"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : document.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : ""
                            }
                          >
                            {document.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Eye className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Document Details</DialogTitle>
                                <DialogDescription>
                                  {document.name} - {document.type}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-between rounded-md border p-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage
                                        src={document.student.avatar || "/placeholder.svg"}
                                        alt={document.student.name}
                                      />
                                      <AvatarFallback className="bg-brand-navy-medium text-white">
                                        {document.student.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{document.student.name}</p>
                                      <p className="text-sm text-muted-foreground">{document.student.email}</p>
                                    </div>
                                  </div>
                                  <Badge
                                    variant={
                                      document.status === "Verified"
                                        ? "outline"
                                        : document.status === "Pending"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                    className={
                                      document.status === "Verified"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : document.status === "Pending"
                                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                          : ""
                                    }
                                  >
                                    {document.status}
                                  </Badge>
                                </div>

                                <div className="rounded-md border p-4">
                                  <h3 className="mb-2 font-medium">Document Information</h3>
                                  <div className="grid gap-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Type:</span>
                                      <span>{document.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Upload Date:</span>
                                      <span>{document.uploadDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Verification Method:</span>
                                      <span>{document.verificationDetails.method}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Verification Date:</span>
                                      <span>{document.verificationDetails.date}</span>
                                    </div>
                                  </div>
                                </div>

                                {document.status === "Verified" && document.verificationDetails.extractedInfo && (
                                  <div className="rounded-md border p-4">
                                    <h3 className="mb-2 font-medium">Extracted Information</h3>
                                    <div className="grid gap-2">
                                      {Object.entries(document.verificationDetails.extractedInfo).map(
                                        ([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">
                                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
                                            </span>
                                            <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                )}

                                {document.status === "Rejected" && document.verificationDetails.reason && (
                                  <div className="rounded-md border border-red-200 bg-red-50 p-4">
                                    <h3 className="mb-2 font-medium text-red-800">Rejection Reason</h3>
                                    <p className="text-red-700">{document.verificationDetails.reason}</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-end gap-2">
                                {document.status === "Pending" && (
                                  <>
                                    <Button variant="outline">Verify Manually</Button>
                                    <Button>Auto-Verify</Button>
                                  </>
                                )}
                                {document.status === "Rejected" && <Button>Request New Document</Button>}
                                {document.status === "Verified" && <Button>Download</Button>}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
