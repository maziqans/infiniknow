"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Search,
  Eye,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface PolicyDocument {
  id: string
  title: string
  version: string
  size: string
  isNew?: boolean
}

const policies: PolicyDocument[] = [
  { id: "1", title: "Employee Handbook 2026", version: "v3.0", size: "2.4 MB", isNew: true },
  { id: "2", title: "Code of Conduct", version: "v2.5", size: "856 KB" },
  { id: "3", title: "Remote Work Policy", version: "v3.2", size: "1.1 MB", isNew: true },
  { id: "4", title: "Data Classification Guidelines", version: "v1.0", size: "945 KB", isNew: true },
  { id: "5", title: "Information Security Policy", version: "v4.1", size: "1.8 MB" },
  { id: "6", title: "Travel & Expense Policy", version: "v2.0", size: "1.2 MB" },
  { id: "7", title: "Acceptable Use Policy", version: "v3.0", size: "678 KB" },
  { id: "8", title: "Anti-Harassment Policy", version: "v2.2", size: "540 KB" },
  { id: "9", title: "Intellectual Property Policy", version: "v1.5", size: "720 KB" },
  { id: "10", title: "Business Continuity Plan", version: "v2.0", size: "3.2 MB" },
  { id: "11", title: "Confidentiality Agreement", version: "v1.8", size: "320 KB" },
  { id: "12", title: "IT Security Guidelines", version: "v2.3", size: "1.5 MB" },
]

interface PoliciesContentProps {
  onBack: () => void
}

export function PoliciesContent({ onBack }: PoliciesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPolicies = policies.filter((policy) =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold text-foreground mb-2">Policies & Handbooks</h1>
            <p className="text-muted-foreground">
              Access all company policies, handbooks, and compliance documents.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {policies.length} Documents
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 card-elevated mb-6">
        <CardContent className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search policies and handbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border bg-secondary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="border-0 card-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 icon-glow-red rounded-lg">
              <FileText className="h-5 w-5 text-red" />
            </div>
            <CardTitle className="text-lg">All Documents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-red" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
                        {policy.title}
                      </h3>
                      {policy.isNew && (
                        <Badge className="bg-red text-white text-xs px-1.5 py-0">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {policy.version}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {policy.size}
                      </span>
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
          
          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No policies found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
