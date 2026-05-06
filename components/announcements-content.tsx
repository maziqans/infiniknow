"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, AlertCircle, Trash2, Calendar, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Announcement {
  id: string
  title: string
  preview: string
  content?: string
  is_new: boolean
  created_at: string
}

interface AnnouncementsContentProps {
  userPosition?: string
  userDepartment?: string
  initialSelectedId?: string | null
  onClearSelection?: () => void
  onBack: () => void
}

export function AnnouncementsContent({
  userPosition,
  userDepartment,
  initialSelectedId,
  onClearSelection,
  onBack,
}: AnnouncementsContentProps) {
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")

  const canManageAnnouncements = 
    userDepartment?.toLowerCase().includes("admin") ||
    userPosition?.toLowerCase().includes("chief") ||
    userPosition?.toLowerCase().includes("c-level") ||
    userPosition?.toLowerCase().includes("ceo") ||
    userPosition?.toLowerCase().includes("cto")

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/announcements/");
        if (response.ok) {
          const data = await response.json();
          setAnnouncementsList(data);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };
    fetchAnnouncements();
  }, [])

  // Sync prop to local state if navigating from Dashboard
  useEffect(() => {
    if (initialSelectedId) {
      setSelectedId(initialSelectedId)
    }
  }, [initialSelectedId])

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return
    
    const previewText = newContent.length > 80 ? newContent.substring(0, 80) + "..." : newContent;
    const newAnnouncementData = {
      title: newTitle,
      preview: previewText,
      content: newContent,
      is_new: true
    };

    const token = sessionStorage.getItem("auth_token");
    const response = await fetch("http://localhost:8000/api/announcements/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newAnnouncementData)
    });

    if (response.ok) {
      const createdAnnouncement = await response.json();
      setAnnouncementsList([createdAnnouncement, ...announcementsList]);
      setIsAdding(false);
      setNewTitle("");
      setNewContent("");
    }
  }

  const handleDeleteAnnouncement = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const token = sessionStorage.getItem("auth_token");
    const response = await fetch(`http://localhost:8000/api/announcements/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.status === 204) {
      setAnnouncementsList(announcementsList.filter(a => a.id !== id));
    }
    if (selectedId === id) {
      handleBackToList()
    }
  }

  const handleBackToList = () => {
    setSelectedId(null)
    onClearSelection?.()
  }

  const selectedAnnouncement = announcementsList.find((a) => a.id === selectedId)

  if (selectedAnnouncement) {
    return (
      <main key={`announcement-${selectedAnnouncement.id}`} className="flex-1 bg-background p-6 overflow-y-auto animate-in fade-in duration-500">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Announcements
          </Button>
        </div>
        <Card className="border-0 card-elevated max-w-4xl">
          <CardContent className="pt-8 pb-12 px-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {selectedAnnouncement.is_new && <Badge className="bg-red text-white">New</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{selectedAnnouncement.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedAnnouncement.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {selectedAnnouncement.content || selectedAnnouncement.preview}
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main key="announcements-list" className="flex-1 bg-background p-6 overflow-y-auto animate-in fade-in duration-500">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <div className="p-2 icon-glow-red rounded-lg text-red">
                <AlertCircle className="h-6 w-6" />
              </div>
              Company Announcements
            </h1>
            <p className="text-muted-foreground">Stay up to date with the latest company news and updates.</p>
          </div>
          {canManageAnnouncements && (
            <Button onClick={() => setIsAdding(!isAdding)} className="bg-red hover:bg-red/90 text-white">
              {isAdding ? "Cancel" : "+ Add Announcement"}
            </Button>
          )}
        </div>
      </div>

      {isAdding && (
        <Card className="border-0 card-elevated mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Title</label>
                <input type="text" placeholder="Enter announcement title..." className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Details</label>
                <textarea placeholder="Write the full announcement details here..." className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red min-h-[120px] resize-y" value={newContent} onChange={(e) => setNewContent(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" className="bg-red hover:bg-red/90 text-white">Publish Announcement</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcementsList.length === 0 ? (
          <div className="text-center py-12 bg-secondary/20 rounded-lg border border-border/50">
            <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground">No Announcements</h3>
            <p className="text-sm text-muted-foreground mt-1">There are currently no company announcements.</p>
          </div>
        ) : (
          announcementsList.map((item) => (
            <Card key={item.id} className="border-0 card-elevated cursor-pointer group hover:border-red border-l-4 border-l-transparent transition-all" onClick={() => setSelectedId(item.id)}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-red transition-colors">{item.title}</h3>
                      {item.is_new && <Badge className="bg-red text-white text-xs px-2 py-0.5">New</Badge>}
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{item.preview}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  {canManageAnnouncements && (
                    <button onClick={(e) => handleDeleteAnnouncement(item.id, e)} className="p-2 text-muted-foreground hover:text-red hover:bg-red/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0" title="Delete Announcement">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  )
}