"use client"

import { useState } from "react"
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Download,
  Search,
  Eye,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TemplateFile {
  id: string
  title: string
  type: "word" | "excel" | "ppt"
  version: string
  size: string
}

const templates: Record<string, TemplateFile[]> = {
  word: [
    { id: "w1", title: "Project Proposal Template", type: "word", version: "v2.1", size: "156 KB" },
    { id: "w2", title: "Meeting Minutes Template", type: "word", version: "v1.5", size: "89 KB" },
    { id: "w3", title: "Technical Report Template", type: "word", version: "v3.0", size: "245 KB" },
    { id: "w4", title: "Business Letter Template", type: "word", version: "v1.2", size: "78 KB" },
    { id: "w5", title: "Policy Document Template", type: "word", version: "v2.0", size: "112 KB" },
    { id: "w6", title: "Standard Operating Procedure", type: "word", version: "v1.8", size: "134 KB" },
  ],
  excel: [
    { id: "e1", title: "Project Timeline Tracker", type: "excel", version: "v3.2", size: "456 KB" },
    { id: "e2", title: "Budget Planning Template", type: "excel", version: "v2.5", size: "320 KB" },
    { id: "e3", title: "Risk Assessment Matrix", type: "excel", version: "v1.4", size: "189 KB" },
    { id: "e4", title: "Inventory Tracking Sheet", type: "excel", version: "v2.0", size: "234 KB" },
    { id: "e5", title: "Expense Report Template", type: "excel", version: "v1.6", size: "145 KB" },
  ],
  ppt: [
    { id: "p1", title: "Company Presentation Template", type: "ppt", version: "v4.0", size: "2.4 MB" },
    { id: "p2", title: "Project Kickoff Template", type: "ppt", version: "v2.1", size: "1.8 MB" },
    { id: "p3", title: "Quarterly Review Template", type: "ppt", version: "v3.0", size: "1.5 MB" },
    { id: "p4", title: "Training Presentation Template", type: "ppt", version: "v1.5", size: "1.2 MB" },
    { id: "p5", title: "Sales Pitch Deck Template", type: "ppt", version: "v2.3", size: "2.1 MB" },
  ],
}

const typeConfig = {
  word: {
    icon: FileText,
    label: "Word Templates",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  excel: {
    icon: FileSpreadsheet,
    label: "Excel Templates",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  ppt: {
    icon: Presentation,
    label: "PowerPoint Templates",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
}

interface TemplatesContentProps {
  templateType: "word" | "excel" | "ppt"
  onBack: () => void
}

export function TemplatesContent({ templateType, onBack }: TemplatesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const config = typeConfig[templateType]
  const Icon = config.icon

  const filteredTemplates = templates[templateType].filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <div className={`p-2 ${config.bgColor} rounded-lg`}>
                <Icon className={`h-6 w-6 ${config.color}`} />
              </div>
              {config.label}
            </h1>
            <p className="text-muted-foreground">
              Download and use standardized {config.label.toLowerCase()} for your work.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {templates[templateType].length} Templates
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 card-elevated mb-6">
        <CardContent className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${config.label.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border bg-secondary/30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates List */}
      <Card className="border-0 card-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${config.bgColor} rounded-lg`}>
              <Icon className={`h-5 w-5 ${config.color}`} />
            </div>
            <CardTitle className="text-lg">Available Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{template.version}</span>
                      <span className="text-xs text-muted-foreground">{template.size}</span>
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
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Icon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No templates found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
