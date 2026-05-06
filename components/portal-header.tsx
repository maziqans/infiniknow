"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Shield, LogOut, User, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PortalHeaderProps {
  user?: { name: string; position: string } | null
  onNavigate?: (page: string) => void
  onLogout?: () => void
}

export function PortalHeader({ user, onNavigate, onLogout }: PortalHeaderProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close the search dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch search results automatically as the user types
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }
      
      try {
        const token = sessionStorage.getItem("auth_token")
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {}

        const [policiesRes, templatesRes] = await Promise.all([
          fetch("http://localhost:8000/api/policy-documents/", { headers }),
          fetch("http://localhost:8000/api/template-documents/", { headers })
        ])

        let policies = []
        let templates = []

        if (policiesRes.ok) policies = await policiesRes.json()
        if (templatesRes.ok) templates = await templatesRes.json()

        const formattedPolicies = policies.map((p: any) => ({
          id: `pol-${p.id}`,
          title: p.title,
          type: 'Policy',
          page: 'policies'
        }))

        const formattedTemplates = templates.map((t: any) => ({
          id: `tpl-${t.id}`,
          title: t.title,
          type: `${t.template_type} Template`,
          page: t.template_type
        }))

        const allLocal = [
          { id: 'g-wapt', title: 'WAPT Guidelines', type: 'Guideline', page: 'wapt' },
          { id: 'g-vapt', title: 'VAPT Guidelines', type: 'Guideline', page: 'vapt' },
          { id: 'g-sec', title: 'Security Guidelines', type: 'Guideline', page: 'security' },
          { id: 'g-code', title: 'Code Standards', type: 'Guideline', page: 'code' },
          { id: 'p-onb', title: 'New Hire Onboarding', type: 'Page', page: 'onboarding' },
          { id: 'p-fac', title: 'IT & Facilities', type: 'Page', page: 'facilities' },
          { id: 'p-ann', title: 'Announcements', type: 'Page', page: 'announcements' }
        ]

        const combined = [...formattedPolicies, ...formattedTemplates, ...allLocal]
        
        const filtered = combined.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.type.toLowerCase().includes(query.toLowerCase())
        )

        setResults(filtered)
        setIsOpen(true)
      } catch (e) {
        console.error("Search failed:", e)
      }
    }

    // Debounce the API calls by 300ms to avoid spamming the backend while typing
    const debounce = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <header className="bg-white relative border-b border-border shadow-sm">
      {/* Subtle gradient overlay strictly on the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Left - Logo and Title */}
        <div className="flex items-center gap-4">
          <Image 
            src="/infinicorelogo.png" 
            alt="Infinicore Logo" 
            width={64} 
            height={40} 
            className="h-10 w-auto object-contain" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-navy tracking-wide">INFINIKNOW</span>
            <span className="text-xs text-navy/70 tracking-widest uppercase">Internal Portal</span>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search policies, templates, guidelines..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
              className="w-full pl-12 pr-4 py-3 h-12 bg-white border-2 border-red/50 focus:border-red rounded-xl shadow-lg text-foreground placeholder:text-muted-foreground"
            />
            
            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  {results.map((result) => (
                    <div 
                      key={result.id} 
                      className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        onNavigate?.(result.page)
                        setQuery("")
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-foreground">{result.title}</span>
                        <span className="text-xs text-muted-foreground uppercase mt-0.5">{result.type}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isOpen && results.length === 0 && query.trim().length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50 p-6 text-center">
                <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right - User Profile and Access Banner */}
        <div className="flex items-center gap-6">
          {/* Access Banner */}
          <div className="hidden lg:flex items-center gap-2 bg-red/10 border border-red/20 rounded-lg px-4 py-2">
            <Shield className="h-4 w-4 text-red" />
            <span className="text-xs font-semibold text-red uppercase tracking-wide">
              Access: Internal Staff Only
            </span>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-2 py-1.5 h-auto hover:bg-black/5">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-navy">{user?.name || "Alex Smith"}</p>
                  <p className="text-xs text-muted-foreground">{user?.position || "Senior Analyst"}</p>
                </div>
                <Avatar className="h-10 w-10 border border-border shadow-sm">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "Alex Smith"} />
                  <AvatarFallback className="bg-red text-white font-semibold">
                    {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : "AS"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => onNavigate?.("profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red focus:text-red"
                onClick={() => onLogout?.()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
