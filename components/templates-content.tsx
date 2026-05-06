"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Download,
  Search,
  Star,
  Eye,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TemplateDocument {
  id: string
  title: string
  description: string
  template_type: string
  file?: string | null
  is_new: boolean
  uploaded_at: string
}

interface TemplatesContentProps {
  templateType: "word" | "excel" | "ppt"
  onBack: () => void
}

export function TemplatesContent({ templateType, onBack }: TemplatesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [templates, setTemplates] = useState<TemplateDocument[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [viewDocument, setViewDocument] = useState<{title: string, url: string} | null>(null)

  const titleMap = {
    word: "Word Templates",
    excel: "Excel Templates",
    ppt: "PowerPoint Templates",
  }

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/template-documents/?type=${templateType}`);
        if (response.ok) {
          setTemplates(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
      const token = sessionStorage.getItem("auth_token")
      if (token) {
        try {
          const favRes = await fetch("http://localhost:8000/api/favorites/", { headers: { 'Authorization': `Bearer ${token}` } })
          if (favRes.ok) setFavorites(await favRes.json())
        } catch (error) {
          console.error("Failed to fetch favorites:", error)
        }
      }
    };
    fetchTemplates();
  }, [templateType])

  const toggleFavorite = async (template: TemplateDocument) => {
    const token = sessionStorage.getItem("auth_token")
    const existing = favorites.find(f => f.item_id === template.id.toString() && f.item_type === `template_${templateType}`)
    if (existing) {
      const res = await fetch(`http://localhost:8000/api/favorites/${existing.id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.status === 204) setFavorites(favorites.filter(f => f.id !== existing.id))
    } else {
      const res = await fetch("http://localhost:8000/api/favorites/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          title: template.title,
          item_type: `template_${templateType}`,
          item_id: template.id.toString(),
          file_url: template.file || ""
        })
      })
      if (res.ok) setFavorites([await res.json(), ...favorites])
    }
  }

  const filteredTemplates = templates.filter((template) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-2xl font-bold text-foreground mb-2">{titleMap[templateType]}</h1>
            <p className="text-muted-foreground">
              Download official company templates for your documents.
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {templates.length} Templates
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card className="border-0 card-elevated mb-6">
        <CardContent className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${titleMap[templateType].toLowerCase()}...`}
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
            <div className="p-2.5 icon-glow-red rounded-lg">
              <FileText className="h-5 w-5 text-red" />
            </div>
            <CardTitle className="text-lg">All Templates</CardTitle>
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
                  <div className="w-12 h-12 rounded-lg bg-red/10 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-red" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
                        {template.title}
                      </h3>
                      {template.is_new && (
                        <Badge className="bg-red text-white text-xs px-1.5 py-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{template.description}</p>
                    {template.file && (
                      <div className="mt-1">
                        <span className="text-xs text-green-600 font-medium">Template available</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0" onClick={() => toggleFavorite(template)}>
                    <Star className={`h-4 w-4 ${favorites.some(f => f.item_id === template.id.toString() && f.item_type === `template_${templateType}`) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} />
                  </Button>
                  {template.file && (
                    <>
                      <Button size="sm" variant="ghost" className="h-9 w-9 p-0" onClick={() => setViewDocument({title: template.title, url: template.file!})}>
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-red" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-9 w-9 p-0" asChild>
                        <a href={template.file} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 text-muted-foreground hover:text-red" />
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No templates found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
      {viewDocument && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-background border border-border w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <h2 className="text-lg font-semibold text-foreground truncate pr-4">{viewDocument.title}</h2>
              <Button variant="ghost" size="sm" onClick={() => setViewDocument(null)}>Close</Button>
            </div>
            <div className="flex-1 bg-white">
              <iframe src={viewDocument.url} className="w-full h-full border-0" />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
