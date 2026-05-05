"use client"

import { useState } from "react"
import {
  Home,
  UserPlus,
  BookOpen,
  Building2,
  FileText,
  Shield,
  Monitor,
  GraduationCap,
  Megaphone,
  Star,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  Presentation,
  Bug,
  Lock,
  Code,
  Coffee,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  children?: { id: string; label: string; icon: React.ReactNode }[]
}

const menuItems: MenuItem[] = [
  { id: "home", label: "Home / Dashboard", icon: <Home className="h-5 w-5" /> },
  { id: "onboarding", label: "New Hire Onboarding", icon: <UserPlus className="h-5 w-5" /> },
  { id: "policies", label: "Policies & Handbooks", icon: <BookOpen className="h-5 w-5" /> },
  { id: "structure", label: "Company Structure", icon: <Building2 className="h-5 w-5" /> },
  {
    id: "templates",
    label: "Document Templates",
    icon: <FileText className="h-5 w-5" />,
    children: [
      { id: "word", label: "Word Templates", icon: <FileText className="h-4 w-4" /> },
      { id: "excel", label: "Excel Templates", icon: <FileSpreadsheet className="h-4 w-4" /> },
      { id: "ppt", label: "PowerPoint Templates", icon: <Presentation className="h-4 w-4" /> },
    ],
  },
  {
    id: "technical",
    label: "Technical Guidelines",
    icon: <Shield className="h-5 w-5" />,
    children: [
      { id: "wapt", label: "WAPT Guidelines", icon: <Bug className="h-4 w-4" /> },
      { id: "vapt", label: "VAPT Guidelines", icon: <Shield className="h-4 w-4" /> },
      { id: "security", label: "Security Policies", icon: <Lock className="h-4 w-4" /> },
      { id: "code", label: "Code Standards", icon: <Code className="h-4 w-4" /> },
    ],
  },
  { id: "facilities", label: "IT & Facilities", icon: <Coffee className="h-5 w-5" /> },
  { id: "training", label: "Training", icon: <GraduationCap className="h-5 w-5" /> },
  { id: "announcements", label: "Announcements", icon: <Megaphone className="h-5 w-5" /> },
  { id: "favorites", label: "My Favorites", icon: <Star className="h-5 w-5" /> },
]

interface PortalSidebarProps {
  activeItem: string
  onItemClick: (id: string) => void
}

export function PortalSidebar({ activeItem, onItemClick }: PortalSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["technical"])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isChildActive = (item: MenuItem) => {
    return item.children?.some(child => child.id === activeItem)
  }

  return (
    <aside className="w-64 gradient-navy min-h-screen flex flex-col sidebar-glow">
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.id)
                  } else {
                    onItemClick(item.id)
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                  activeItem === item.id || isChildActive(item)
                    ? "bg-red text-white active-glow"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className={cn(
                  "shrink-0 transition-transform duration-200",
                  (activeItem === item.id || isChildActive(item)) && "drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                )}>
                  {item.icon}
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.children && (
                  <span className="shrink-0">
                    {expandedItems.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {item.children && expandedItems.includes(item.id) && (
                <ul className="mt-1 ml-4 space-y-1 border-l border-white/20 pl-4">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => onItemClick(child.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200",
                          activeItem === child.id
                            ? "bg-red/90 text-white shadow-lg shadow-red/20"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span className={cn(
                          "shrink-0",
                          activeItem === child.id && "drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                        )}>
                          {child.icon}
                        </span>
                        <span className="text-left">{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-xs text-white/40">InfiniKnow v2.4.1</p>
        </div>
      </div>
    </aside>
  )
}
