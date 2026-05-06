"use client"

import { useState, useEffect } from "react"
import { Star, Eye, ArrowLeft, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FavoritesContentProps {
  onNavigate: (page: string) => void
  onBack: () => void
}

export function FavoritesContent({ onNavigate, onBack }: FavoritesContentProps) {
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

  const removeFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const token = sessionStorage.getItem("auth_token")
    const response = await fetch(`http://localhost:8000/api/favorites/${id}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.status === 204) {
      setFavorites(favorites.filter(f => f.id !== id))
    }
  }

  return (
    <main className="flex-1 bg-background p-6 overflow-y-auto animate-in fade-in duration-500">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Star className="h-6 w-6 text-amber-600 fill-amber-600" />
              </div>
              My Favourites
            </h1>
            <p className="text-muted-foreground">Access your saved policies, templates, and guidelines easily.</p>
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <Card className="border-0 card-elevated">
          <CardContent className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Star className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p>No favourites added yet. Star items across the portal to see them here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favorites.map((fav) => (
            <Card 
              key={fav.id} 
              className="border-0 card-elevated cursor-pointer group hover:border-amber-300 transition-all"
              onClick={() => {
                if (fav.item_type === 'policy') onNavigate?.('policies');
                else if (fav.item_type === 'template_word') onNavigate?.('word');
                else if (fav.item_type === 'template_excel') onNavigate?.('excel');
                else if (fav.item_type === 'template_ppt') onNavigate?.('ppt');
                else if (fav.item_type.startsWith('guideline_')) onNavigate?.(fav.item_type.replace('guideline_', ''));
                else if (fav.item_type === 'onboarding') onNavigate?.('onboarding');
              }}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="p-2.5 bg-amber-50 rounded-lg shrink-0">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="flex gap-1">
                    {fav.file_url && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); setViewDocument({title: fav.title, url: fav.file_url}) }}>
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-red" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => removeFavorite(fav.id, e)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-red transition-colors line-clamp-2 mb-1">{fav.title}</h3>
                  <Badge variant="secondary" className="text-xs uppercase bg-secondary/50">{fav.item_type.replace('template_', '').replace('guideline_', '')}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewDocument && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-background border border-border w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
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