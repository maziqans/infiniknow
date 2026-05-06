"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { PortalHeader } from "@/components/portal-header"
import { PortalSidebar } from "@/components/portal-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { PoliciesContent } from "@/components/policies-content"
import { FacilitiesContent } from "@/components/facilities-content"
import { ProfileContent } from "@/components/profile-content"
import { OnboardingContent } from "@/components/onboarding-content"
import { TemplatesContent } from "@/components/templates-content"
import { GuidelinesContent } from "@/components/guidelines-content"
import { AnnouncementsContent } from "@/components/announcements-content"
import { PortalFooter } from "@/components/portal-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dynamically import components that use non-SSR safe libraries (like react-organizational-chart)
// This guarantees they are only evaluated and loaded in the browser.
const CompanyStructureContent = dynamic(
  () => import("@/components/company-structure-content").then((mod) => mod.CompanyStructureContent),
  { ssr: false }
)

interface UserProfile {
  name: string;
  email: string;
  ic_number: string;
  personal_email: string;
  role: string;
  position: string
  address: string;
  phone_number: string;
  department: string;
}

export default function InfiniKnowPortal() {
  const [activeItem, setActiveItem] = useState("home")
  const [isMounted, setIsMounted] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
    // Check for existing session in local storage for demo purposes
    const token = localStorage.getItem("auth_token")
    if (token) {
      fetchUserProfile(token);
    }
  }, [])

  const fetchUserProfile = async (token: string) => {
    // This endpoint assumes you have a view that returns the logged-in user's profile
    // You will need to create this view in Django.
    const response = await fetch("http://localhost:8000/api/me/", {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      const profileData = await response.json();
      // Map Django's snake_case to frontend's camelCase if needed, or just use snake_case
      setUser({ 
        ...profileData, 
        name: `${profileData.user.first_name} ${profileData.user.last_name}`.trim() || profileData.user.username,
        email: profileData.user.email 
      });
    } else {
      handleLogout(); // Token is invalid or expired
    }
  }

  const handleItemClick = (id: string) => {
    setActiveItem(id)
    if (id !== "announcements") {
      setSelectedAnnouncementId(null)
    }
  }

  const goHome = () => setActiveItem("home")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("");

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const { access } = await response.json();
        localStorage.setItem("auth_token", access);
        await fetchUserProfile(access);
        setActiveItem("home");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.detail || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Could not connect to the server.");
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("auth_token")
  }

  const renderContent = () => {
    switch (activeItem) {
      case "profile":
        return <ProfileContent user={user} onBack={goHome} />
      case "onboarding":
        return (
          <OnboardingContent 
            userPosition={user?.position} 
            userDepartment={user?.department} 
            onBack={goHome} 
          />
        )
      case "policies":
        return <PoliciesContent onBack={goHome} />
      case "structure":
        return <CompanyStructureContent onBack={goHome} />
      case "word":
        return <TemplatesContent templateType="word" onBack={goHome} />
      case "excel":
        return <TemplatesContent templateType="excel" onBack={goHome} />
      case "ppt":
        return <TemplatesContent templateType="ppt" onBack={goHome} />
      case "wapt":
        return <GuidelinesContent guidelineType="wapt" onBack={goHome} />
      case "vapt":
        return <GuidelinesContent guidelineType="vapt" onBack={goHome} />
      case "security":
        return <GuidelinesContent guidelineType="security" onBack={goHome} />
      case "code":
        return <GuidelinesContent guidelineType="code" onBack={goHome} />
      case "facilities":
        return <FacilitiesContent onBack={goHome} />
      case "announcements":
        return (
          <AnnouncementsContent 
            userPosition={user?.position}
            userDepartment={user?.department}
            initialSelectedId={selectedAnnouncementId}
            onClearSelection={() => setSelectedAnnouncementId(null)}
            onBack={goHome}
          />
        )
      default:
        return (
          <DashboardContent 
            userName={user?.name} 
            userEmail={user?.email} 
            userPosition={user?.position} 
            userDepartment={user?.department}
            onNavigate={handleItemClick}
            onAnnouncementClick={(id) => {
              setSelectedAnnouncementId(id)
              handleItemClick("announcements")
            }}
          />
        )
    }
  }

  // Prevent rendering DOM-dependent child components on the server
  if (!isMounted) {
    // Return a blank background that matches your theme to prevent a flash of unstyled content
    return <div className="min-h-screen bg-background flex flex-col"></div>
  }

  // Render Login Screen if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-in fade-in duration-500">
        <Card className="w-full max-w-md border-0 card-elevated shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex items-center justify-center mb-4">
              <Image 
                src="/infinicorelogo.png" 
                alt="Infinicore Logo" 
                width={80} 
                height={80} 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <CardTitle className="text-2xl font-bold text-navy">Welcome to InfiniKnow</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Enter your credentials to access the portal</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && (
                <p className="text-sm text-red font-medium">{loginError}</p>
              )}
              <Button type="submit" className="w-full bg-red hover:bg-red/90 text-white mt-2">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden animate-in fade-in duration-500">
      <PortalHeader user={user} onNavigate={handleItemClick} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <PortalSidebar activeItem={activeItem} onItemClick={handleItemClick} />
        <div key={activeItem} className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </div>
      <PortalFooter />
    </div>
  )
}
