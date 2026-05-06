"use client"

import { useState, useEffect, useRef } from "react"
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
import { AlertTriangle } from "lucide-react"

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [showIdlePrompt, setShowIdlePrompt] = useState(false)
  const [idleCountdown, setIdleCountdown] = useState(30)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setIsMounted(true)
    // Check for existing session in session storage (clears on tab close)
    const token = sessionStorage.getItem("auth_token")
    if (token) {
      fetchUserProfile(token);
    }
  }, [])

  useEffect(() => {
    if (user && localStorage.getItem("hide_security_warning") !== "true") {
      setShowWarning(true)
    }
  }, [user])

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
        body: JSON.stringify({ username: email, password })
      });

      if (response.ok) {
        const { access } = await response.json();
        sessionStorage.setItem("auth_token", access);
        await fetchUserProfile(access);
        setActiveItem("home");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.detail || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Could not connect to the server.");
    }
  }

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem("auth_token")
    setShowIdlePrompt(false)
  }

  const handleProceed = () => {
    if (dontShowAgain) {
      localStorage.setItem("hide_security_warning", "true")
    }
    setShowWarning(false)
  }

  const handleStayLoggedIn = () => {
    setShowIdlePrompt(false)
  }

  // Inactivity timeout logic
  useEffect(() => {
    if (!user) return

    const IDLE_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes
    const COUNTDOWN_SECONDS = 30

    const resetInactivityTimeout = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
      inactivityTimer.current = setTimeout(() => {
        setShowIdlePrompt(true)
        setIdleCountdown(COUNTDOWN_SECONDS)
      }, IDLE_TIMEOUT_MS)
    }

    if (!showIdlePrompt) {
      const handleActivity = () => resetInactivityTimeout()
      const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
      events.forEach(e => window.addEventListener(e, handleActivity))
      resetInactivityTimeout()

      return () => {
        events.forEach(e => window.removeEventListener(e, handleActivity))
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
      }
    } else {
      countdownInterval.current = setInterval(() => {
        setIdleCountdown((prev) => {
          if (prev <= 1) {
            handleLogout()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (countdownInterval.current) clearInterval(countdownInterval.current)
      }
    }
  }, [user, showIdlePrompt])

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
                <label className="text-sm font-medium text-foreground">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
      {showIdlePrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-background border border-border max-w-sm w-full p-6 rounded-xl shadow-2xl text-center">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-foreground mb-2">Are you still there?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              You have been inactive for a while. For your security, you will be automatically logged out in <strong className="text-red text-base">{idleCountdown}</strong> seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
                Log Out Now
              </Button>
              <Button onClick={handleStayLoggedIn} className="bg-red hover:bg-red/90 text-white w-full sm:w-auto">
                I'm Here
              </Button>
            </div>
          </div>
        </div>
      )}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-background border border-border max-w-md w-full p-6 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red" />
              <h2 className="text-xl font-semibold text-foreground">Security Notice</h2>
            </div>
            <div className="space-y-3 text-foreground mb-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                You are accessing a secure corporate network. <strong>All activities are actively monitored and logged.</strong>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Unauthorized access or attempts to circumvent security controls may result in disciplinary action.
              </p>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <input 
                type="checkbox" 
                id="dontShowAgain" 
                className="w-4 h-4 accent-red cursor-pointer"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <label htmlFor="dontShowAgain" className="text-sm text-muted-foreground cursor-pointer select-none">
                Don't show this warning again
              </label>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleProceed} className="bg-red hover:bg-red/90 text-white w-full sm:w-auto">
                Acknowledge & Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
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
