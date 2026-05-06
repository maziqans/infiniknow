"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Download,
  ArrowLeft,
  UserPlus,
  UploadCloud,
  Trash2,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface OnboardingItem {
  id: string
  title: string
  description: string
  file?: {
    name: string
    size: string
    uploadedAt: string
  }
}

const defaultOnboardingItems: OnboardingItem[] = [
  { id: "employment_letter", title: "Letter of Employment", description: "Your official employment confirmation letter." },
  { id: "onboarding_checklist", title: "Onboarding Checklist", description: "A step-by-step guide for your first week." },
  { id: "job_application", title: "Job Application", description: "The submitted job application form for our records." },
]

interface OnboardingContentProps {
  userPosition?: string
  userDepartment?: string
  onBack: () => void
}

export function OnboardingContent({ userPosition, userDepartment, onBack }: OnboardingContentProps) {
  const [onboardingItems, setOnboardingItems] = useState<OnboardingItem[]>([])

  const canManageOnboarding = 
    userDepartment?.toLowerCase().includes("admin") ||
    userPosition?.toLowerCase().includes("chief") ||
    userPosition?.toLowerCase().includes("c-level") ||
    userPosition?.toLowerCase().includes("ceo") ||
    userPosition?.toLowerCase().includes("cto")

  useEffect(() => {
    const stored = localStorage.getItem("portal_onboarding_docs")
    if (stored) {
      setOnboardingItems(JSON.parse(stored))
    } else {
      setOnboardingItems(defaultOnboardingItems)
      // Do not set in local storage on first load, let an admin action do it.
    }
  }, [])

  const handleUpload = (itemId: string) => {
    const updatedItems = onboardingItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          file: {
            name: `${item.title.replace(/\s/g, '_')}_${Date.now()}.pdf`,
            size: `${(Math.random() * 800 + 100).toFixed(0)} KB`,
            uploadedAt: new Date().toISOString(),
          }
        }
      }
      return item
    })
    setOnboardingItems(updatedItems)
    localStorage.setItem("portal_onboarding_docs", JSON.stringify(updatedItems))
  }

  const handleRemoveFile = (itemId: string) => {
    const updatedItems = onboardingItems.map(item => {
      if (item.id === itemId) {
        const { file, ...rest } = item
        return rest
      }
      return item
    })
    setOnboardingItems(updatedItems)
    localStorage.setItem("portal_onboarding_docs", JSON.stringify(updatedItems))
  }

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
              Download your essential employment documents here.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {defaultOnboardingItems.length} Items
          </Badge>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {(onboardingItems.length > 0 ? onboardingItems : defaultOnboardingItems).map((item) => (
          <Card key={item.id} className="border-0 card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.file ? 'bg-red/10' : 'bg-secondary'}`}>
                    <FileText className={`h-6 w-6 ${item.file ? 'text-red' : 'text-muted-foreground/50'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                
                {item.file ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        File Uploaded
                      </div>
                      <p className="text-xs text-muted-foreground">{item.file.name} ({item.file.size})</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {canManageOnboarding && (
                      <Button size="sm" variant="ghost" className="text-red hover:text-red" onClick={() => handleRemoveFile(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Not Uploaded</Badge>
                    {canManageOnboarding && (
                      <Button size="sm" onClick={() => handleUpload(item.id)}>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Upload File
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
