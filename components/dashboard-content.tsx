"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  Download,
  AlertCircle,
  Clock,
  Star,
  Eye,
  Sparkles,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Announcement {
  id: string
  title: string;
  preview: string;
  content?: string;
  is_new: boolean;
  created_at: string;
}

interface DashboardProps {
  userName?: string
  userEmail?: string
  userPosition?: string
  userDepartment?: string
  onNavigate?: (page: string) => void
  onAnnouncementClick?: (id: string) => void
}

interface RecentDoc {
  title: string
  viewedAt?: string
  timestamp?: string
  type: string
}

function getTimeAgo(dateString?: string) {
  if (!dateString) return ""
  const diff = Date.now() - new Date(dateString).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}

export function DashboardContent({ userName = "Alex Smith", userEmail, userPosition, userDepartment, onNavigate, onAnnouncementClick }: DashboardProps) {
  const [recentDocs, setRecentDocs] = useState<RecentDoc[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [viewDocument, setViewDocument] = useState<{title: string, url: string} | null>(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = sessionStorage.getItem("auth_token")
      if (token) {
        try {
          const response = await fetch("http://localhost:8000/api/favorites/", {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (response.ok) {
            setFavorites(await response.json())
          }
        } catch (error) {
          console.error("Failed to fetch favorites:", error)
        }
      }
    }
    fetchFavorites()
  }, [])

  useEffect(() => {
    const fetchRecentActivities = async () => {
      const token = sessionStorage.getItem("auth_token")
      if (token) {
        try {
          const response = await fetch("http://localhost:8000/api/recent-activities/", {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (response.ok) {
            const data = await response.json()
            setRecentDocs(data.map((item: any) => ({
              title: item.title,
              type: item.doc_type,
              timestamp: item.timestamp
            })))
          }
        } catch (error) {
          console.error("Failed to fetch recent activities:", error)
        }
      }
    }
    fetchRecentActivities()
  }, [])

  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([])
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
    if (response.status === 204) { // No Content
      setAnnouncementsList(announcementsList.filter(a => a.id !== id));
    }
  }

  return (
    <main className="flex-1 bg-background p-6 overflow-y-auto">
      {/* Welcome Banner */}
      <div className="mb-8">
        <Card className="border-0 card-elevated overflow-hidden gradient-hero">
          <CardContent className="py-8 px-6 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red/5 via-transparent to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-navy/5 via-transparent to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-red" />
                  <span className="text-sm font-medium text-red">Welcome back</span>
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                Good morning, {userName}
                </h1>
                <p className="text-muted-foreground max-w-md">
                  Access all the resources you need. Your one-stop portal for policies, templates, and company information.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50">
                  <p className="text-3xl font-bold text-red">{announcementsList.filter(a => a.is_new).length}</p>
                  <p className="text-xs text-muted-foreground font-medium">New Announcements</p>
                </div>
                <div className="text-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50">
                  <p className="text-3xl font-bold text-navy">12</p>
                  <p className="text-xs text-muted-foreground font-medium">Resources Updated</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favourites Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          Favourites
        </h2>
        {favorites.length === 0 ? (
          <Card className="border-0 card-elevated">
            <CardContent className="p-6 text-center text-muted-foreground">
              No favourites added yet. Star items across the portal to see them here.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((fav) => (
              <Card 
                key={fav.id} 
                className="border-0 card-elevated cursor-pointer group"
                onClick={() => {
                  if (fav.item_type === 'policy') onNavigate?.('policies');
                  else if (fav.item_type === 'template_word') onNavigate?.('word');
                  else if (fav.item_type === 'template_excel') onNavigate?.('excel');
                  else if (fav.item_type === 'template_ppt') onNavigate?.('ppt');
                  else if (fav.item_type.startsWith('guideline_')) onNavigate?.(fav.item_type.replace('guideline_', ''));
                  else if (fav.item_type === 'onboarding') onNavigate?.('onboarding');
                }}
              >
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="p-2 bg-secondary rounded-lg shrink-0">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </div>
                    {fav.file_url && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={(e) => { e.stopPropagation(); setViewDocument({title: fav.title, url: fav.file_url}) }}
                      >
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-red" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-red transition-colors line-clamp-1">
                      {fav.title}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase mt-1">
                      {fav.item_type.replace('_', ' ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <Card className="lg:col-span-2 border-0 card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 icon-glow-red rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red" />
                </div>
                <CardTitle className="text-lg">Announcements</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-red hover:text-red-hover hover:bg-red/5" onClick={() => onNavigate?.("announcements")}>
                  View All
                </Button>
                {canManageAnnouncements && (
                  <Button 
                    size="sm" 
                    onClick={() => setIsAdding(!isAdding)} 
                    className="bg-red hover:bg-red/90 text-white"
                  >
                    {isAdding ? "Cancel" : "+ Add New"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isAdding && (
              <form onSubmit={handleAddAnnouncement} className="mb-4 p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-3">
                <input 
                  type="text" 
                  placeholder="Announcement Title" 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-red"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <textarea 
                  placeholder="Announcement Details..." 
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-red resize-none"
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-red hover:bg-red/90 text-white">
                    Publish
                  </Button>
                </div>
              </form>
            )}
            <div className="space-y-3">
              {announcementsList.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No announcements available.</p>
                </div>
              ) : (
                announcementsList.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onAnnouncementClick?.(item.id)}
                    className="p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 cursor-pointer group border-l-3 border-transparent hover:border-red"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground group-hover:text-red transition-colors">
                            {item.title}
                          </h4>
                        {item.is_new && (
                            <Badge className="bg-red text-white text-xs px-1.5 py-0">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.preview}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground whitespace-nowrap bg-background/50 px-2 py-1 rounded">
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {canManageAnnouncements && (
                          <button 
                            onClick={(e) => handleDeleteAnnouncement(item.id, e)}
                            className="p-1.5 -mr-1.5 text-muted-foreground hover:text-red hover:bg-red/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Announcement"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recently Viewed */}
        <Card className="border-0 card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 icon-glow-navy rounded-lg">
                <Clock className="h-5 w-5 text-navy" />
              </div>
              <CardTitle className="text-lg">Recently Viewed</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {recentDocs.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-red/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-red" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground group-hover:text-red transition-colors">
                        {doc.title}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {doc.timestamp ? getTimeAgo(doc.timestamp) : doc.viewedAt}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0">
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

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
