"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Search,
  Eye,
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  FileCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface OnboardingDocument {
  id: string
  title: string
  description: string
  version: string
  size: string
  required?: boolean
}

const onboardingDocuments: OnboardingDocument[] = [
  { id: "1", title: "Letter of Employment", description: "Official employment confirmation letter", version: "v2.1", size: "245 KB", required: true },
  { id: "2", title: "Offer Letter Template", description: "Standard offer letter for new hires", version: "v3.0", size: "320 KB", required: true },
  { id: "3", title: "Onboarding Checklist", description: "Step-by-step guide for your first week", version: "v4.2", size: "180 KB", required: true },
  { id: "4", title: "Employee Information Form", description: "Personal details and emergency contacts", version: "v2.0", size: "420 KB", required: true },
  { id: "5", title: "IT Access Request Form", description: "Request for system access and equipment", version: "v1.5", size: "156 KB", required: true },
  { id: "6", title: "Company Introduction Deck", description: "Welcome presentation about Infinicore", version: "v5.0", size: "8.2 MB" },
  { id: "7", title: "Benefits Enrollment Guide", description: "Guide to employee benefits and enrollment", version: "v2.3", size: "1.1 MB" },
  { id: "8", title: "Office Map & Directory", description: "Floor plans and department locations", version: "v1.8", size: "2.4 MB" },
  { id: "9", title: "Security Badge Request", description: "Application for building access card", version: "v1.2", size: "98 KB", required: true },
  { id: "10", title: "Parking Registration Form", description: "Register for office parking access", version: "v1.0", size: "75 KB" },
]

interface OnboardingContentProps {
  onBack: () => void
}

export function OnboardingContent({ onBack }: OnboardingContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = onboardingDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const requiredDocs = filteredDocs.filter(doc => doc.required)
  const optionalDocs = filteredDocs.filter(doc => !doc.required)

  return (
    <main className="flex-1 bg-background p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <div className="p-2 icon-glow-red rounded-lg">
                <UserPlus className="h-6 w-6 text-red" />
              </div>
              New Hire Onboarding
            </h1>
            <p className="text-muted-foreground">
              Essential documents and forms for new employees joining Infinicore.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {onboardingDocuments.length} Documents
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 card-elevated mb-6">
        <CardContent className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search onboarding documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border bg-secondary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      {requiredDocs.length > 0 && (
        <Card className="border-0 card-elevated mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 icon-glow-red rounded-lg">
                <FileCheck className="h-5 w-5 text-red" />
              </div>
              <CardTitle className="text-lg">Required Documents</CardTitle>
              <Badge className="bg-red text-white">{requiredDocs.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {requiredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 group cursor-pointer border-l-3 border-red"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-red" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
                          {doc.title}
                        </h3>
                        <CheckCircle2 className="h-4 w-4 text-red" />
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{doc.version}</span>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <Card className="border-0 card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 icon-glow-navy rounded-lg">
                <FileText className="h-5 w-5 text-navy" />
              </div>
              <CardTitle className="text-lg">Additional Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {optionalDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{doc.version}</span>
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredDocs.length === 0 && (
        <Card className="border-0 card-elevated">
          <CardContent className="py-12">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No documents found matching your search.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
