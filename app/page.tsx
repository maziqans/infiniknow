"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { PortalHeader } from "@/components/portal-header"
import { PortalSidebar } from "@/components/portal-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { PoliciesContent } from "@/components/policies-content"
import { FacilitiesContent } from "@/components/facilities-content"
import { ProfileContent } from "@/components/profile-content"
import { OnboardingContent } from "@/components/onboarding-content"
import { TemplatesContent } from "@/components/templates-content"
import { GuidelinesContent } from "@/components/guidelines-content"
import { PortalFooter } from "@/components/portal-footer"

// Dynamically import components that use non-SSR safe libraries (like react-organizational-chart)
// This guarantees they are only evaluated and loaded in the browser.
const CompanyStructureContent = dynamic(
  () => import("@/components/company-structure-content").then((mod) => mod.CompanyStructureContent),
  { ssr: false }
)

export default function InfiniKnowPortal() {
  const [activeItem, setActiveItem] = useState("home")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleItemClick = (id: string) => {
    setActiveItem(id)
  }

  const goHome = () => setActiveItem("home")

  const renderContent = () => {
    switch (activeItem) {
      case "profile":
        return <ProfileContent onBack={goHome} />
      case "onboarding":
        return <OnboardingContent onBack={goHome} />
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
      default:
        return <DashboardContent />
    }
  }

  // Prevent rendering DOM-dependent child components on the server
  if (!isMounted) {
    // Return a blank background that matches your theme to prevent a flash of unstyled content
    return <div className="min-h-screen bg-background flex flex-col"></div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PortalHeader onNavigate={handleItemClick} />
      <div className="flex flex-1">
        <PortalSidebar activeItem={activeItem} onItemClick={handleItemClick} />
        {renderContent()}
      </div>
      <PortalFooter />
    </div>
  )
}
