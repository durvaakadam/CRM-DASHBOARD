"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"

export default function CounsellorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock counsellor data
  const counsellor = {
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Experienced education counsellor with over 8 years of experience helping students achieve their study abroad dreams. Specialized in US and UK university applications with a focus on STEM programs.",
    avatar: "/placeholder.svg",
    joinDate: "January 2020",
    specializations: ["US Universities", "UK Universities", "STEM Programs", "Scholarship Applications"],
    education: [
      {
        degree: "Master of Education",
        institution: "Columbia University",
        year: "2015",
      },
      {
        degree: "Bachelor of Arts in Psychology",
        institution: "New York University",
        year: "2012",
      },
    ],
    certifications: [
      {
        name: "Certified Education Counsellor",
        issuer: "International Association of College Admission Counseling",
        year: "2016",
      },
      {
        name: "UCAS Advisor Certification",
        issuer: "Universities and Colleges Admissions Service",
        year: "2017",
      },
    ],
    performance: {
      studentsAssigned: 124,
      activeApplications: 87,
      completedApplications: 432,
      conversionRate: "78.3%",
    },
  }

  return (
    <DashboardLayout userType="counsellor" userName="Sarah Miller">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and manage your profile information</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "" : "bg-brand-navy-dark hover:bg-brand-navy-medium"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            {isEditing && <Button>Save Changes</Button>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-2 border-brand-navy-light">
                <AvatarImage src={counsellor.avatar || "/placeholder.svg"} alt={counsellor.name} />
                <AvatarFallback className="bg-brand-navy-dark text-white text-2xl">
                  {counsellor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{counsellor.name}</h2>
              <p className="text-sm text-muted-foreground">Education Counsellor</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {counsellor.joinDate}</span>
              </div>
              <div className="mt-6 space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{counsellor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{counsellor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{counsellor.location}</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-bg-branc">
                {counsellor.specializations.map((specialization, index) => (
                  <Badge key={index} variant="outline" className="bg-brand-navy-medium text-white">
                    {specialization}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Change Profile Picture
                </Button>
              </CardFooter>
            )}
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue="about">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="about" className="flex-1 sm:flex-none">
                  About
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex-1 sm:flex-none">
                  Performance
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 sm:flex-none">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                    <CardDescription>Tell us about yourself</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        className="min-h-[150px]"
                        placeholder="Write your bio here..."
                        defaultValue={counsellor.bio}
                      />
                    ) : (
                      <p>{counsellor.bio}</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        {counsellor.education.map((edu, index) => (
                          <div key={index} className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                              <Label htmlFor={`degree-${index}`}>Degree</Label>
                              <Input id={`degree-${index}`} defaultValue={edu.degree} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`institution-${index}`}>Institution</Label>
                              <Input id={`institution-${index}`} defaultValue={edu.institution} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`year-${index}`}>Year</Label>
                              <Input id={`year-${index}`} defaultValue={edu.year} />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm">
                          + Add Education
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {counsellor.education.map((edu, index) => (
                          <div key={index}>
                            <h3 className="font-medium">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                              {edu.institution}, {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>Your professional certifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        {counsellor.certifications.map((cert, index) => (
                          <div key={index} className="grid gap-4 md:grid-cols-2">
                            <div className="grid gap-2">
                              <Label htmlFor={`cert-name-${index}`}>Certification</Label>
                              <Input id={`cert-name-${index}`} defaultValue={cert.name} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                              <Input id={`cert-issuer-${index}`} defaultValue={cert.issuer} />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor={`cert-year-${index}`}>Year</Label>
                              <Input id={`cert-year-${index}`} defaultValue={cert.year} />
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm">
                          + Add Certification
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {counsellor.certifications.map((cert, index) => (
                          <div key={index}>
                            <h3 className="font-medium">{cert.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cert.issuer}, {cert.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="performance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Your performance statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <div className="text-sm font-medium text-muted-foreground">Students Assigned</div>
                        <div className="mt-1 text-2xl font-bold">{counsellor.performance.studentsAssigned}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="text-sm font-medium text-muted-foreground">Active Applications</div>
                        <div className="mt-1 text-2xl font-bold">{counsellor.performance.activeApplications}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="text-sm font-medium text-muted-foreground">Completed Applications</div>
                        <div className="mt-1 text-2xl font-bold">{counsellor.performance.completedApplications}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
                        <div className="mt-1 text-2xl font-bold">{counsellor.performance.conversionRate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={counsellor.name} disabled={!isEditing} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={counsellor.email} disabled={!isEditing} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={counsellor.phone} disabled={!isEditing} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={counsellor.location} disabled={!isEditing} />
                    </div>
                    {isEditing && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button className="w-full">Save Settings</Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
