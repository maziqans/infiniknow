"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Download,
  Search,
  Eye,
  Star,
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
  file?: string | null
  is_new: boolean
  uploaded_at: string
}

interface PoliciesContentProps {
  onBack: () => void
}

export function PoliciesContent({ onBack }: PoliciesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [policies, setPolicies] = useState<PolicyDocument[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [viewDocument, setViewDocument] = useState<{title: string, url: string} | null>(null)

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/policy-documents/");
        if (response.ok) {
          setPolicies(await response.json());
        }
      } catch (error) {
        console.error("Failed to fetch policies:", error);
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
    fetchPolicies();
  }, [])

  const toggleFavorite = async (policy: PolicyDocument) => {
    const token = sessionStorage.getItem("auth_token")
    const existing = favorites.find(f => f.item_id === policy.id.toString() && f.item_type === 'policy')
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
          title: policy.title,
          item_type: 'policy',
          item_id: policy.id.toString(),
          file_url: policy.file || null
        })
      })
      if (res.ok) setFavorites([await res.json(), ...favorites])
    }
  }

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
                      {policy.is_new && (
                        <Badge className="bg-red text-white text-xs px-1.5 py-0">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {policy.version && (
                        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                          {policy.version}
                        </span>
                      )}
                      {policy.file && (
                        <span className="text-xs text-green-600 font-medium">Document available</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0" onClick={(e) => { e.stopPropagation(); toggleFavorite(policy) }}>
                    <Star className={`h-4 w-4 ${favorites.some(f => f.item_id === policy.id.toString() && f.item_type === 'policy') ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground hover:text-amber-500'}`} />
                  </Button>
                  {policy.file && (
                    <>
                      <Button size="sm" variant="ghost" className="h-9 w-9 p-0" onClick={() => setViewDocument({title: policy.title, url: policy.file!})}>
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-red" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-9 w-9 p-0" asChild>
                        <a href={policy.file} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 text-muted-foreground hover:text-red" />
                        </a>
                      </Button>
                    </>
                  )}
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
