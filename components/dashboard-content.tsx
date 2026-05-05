"use client"

import {
  FileText,
  Download,
  AlertCircle,
  CheckSquare,
  BookOpen,
  Network,
  Monitor,
  Clock,
  ArrowRight,
  Sparkles,
  Coffee,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const announcements = [
  {
    title: "Q2 Town Hall Meeting Scheduled",
    date: "May 5, 2026",
    preview: "Join us for our quarterly town hall on May 15th at 2:00 PM EST...",
    isNew: true,
  },
  {
    title: "New Security Training Available",
    date: "May 3, 2026",
    preview: "Mandatory cybersecurity awareness training is now available...",
    isNew: true,
  },
  {
    title: "Office Renovation Update",
    date: "May 1, 2026",
    preview: "Phase 2 of the office renovation will begin next week...",
    isNew: false,
  },
]

const recentDocuments = [
  { title: "API Testing Checklist", viewedAt: "2 hours ago", type: "PDF" },
  { title: "Employee Handbook 2026", viewedAt: "Yesterday", type: "PDF" },
  { title: "WAPT Methodology Guide", viewedAt: "3 days ago", type: "DOC" },
]

interface QuickAccessCardProps {
  icon: React.ReactNode
  title: string
  description: string
  glowClass: string
  onClick?: () => void
}

function QuickAccessCard({ icon, title, description, glowClass, onClick }: QuickAccessCardProps) {
  return (
    <Card 
      className="card-elevated cursor-pointer group border-0 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${glowClass} transition-all duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-red transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardContent() {
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
                  Good morning, Alex Smith
                </h1>
                <p className="text-muted-foreground max-w-md">
                  Access all the resources you need. Your one-stop portal for policies, templates, and company information.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center px-6 py-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50">
                  <p className="text-3xl font-bold text-red">3</p>
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

      {/* Quick Access Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-red rounded-full"></span>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAccessCard
            icon={<BookOpen className="h-6 w-6 text-red" />}
            title="Policies & Handbooks"
            description="Company policies and guidelines"
            glowClass="icon-glow-red"
          />
          <QuickAccessCard
            icon={<Network className="h-6 w-6 text-navy" />}
            title="Company Structure"
            description="Org chart & reporting lines"
            glowClass="icon-glow-navy"
          />
          <QuickAccessCard
            icon={<CheckSquare className="h-6 w-6 text-red" />}
            title="Technical Guidelines"
            description="WAPT, VAPT & security docs"
            glowClass="icon-glow-red"
          />
          <QuickAccessCard
            icon={<Coffee className="h-6 w-6 text-navy" />}
            title="IT & Facilities"
            description="Office amenities & IT support"
            glowClass="icon-glow-navy"
          />
        </div>
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
              <Button variant="ghost" size="sm" className="text-red hover:text-red-hover hover:bg-red/5">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {announcements.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-all duration-200 cursor-pointer group border-l-3 border-transparent hover:border-red"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground group-hover:text-red transition-colors">
                          {item.title}
                        </h4>
                        {item.isNew && (
                          <Badge className="bg-red text-white text-xs px-1.5 py-0">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.preview}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap bg-background/50 px-2 py-1 rounded">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
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
              {recentDocuments.map((doc, index) => (
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
                      <p className="text-xs text-muted-foreground">{doc.viewedAt}</p>
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
    </main>
  )
}
