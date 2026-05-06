"use client"

import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CreditCard,
  ArrowLeft,
  Save,
  Edit3,
  Lock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfile {
  name: string
  email: string
  ic: string
  personalEmail: string
  position: string
  address: string
  phoneNo: string
  department: string
}

interface ProfileContentProps {
  user: UserProfile | null
  onBack: () => void
}

export function ProfileContent({ user, onBack }: ProfileContentProps) {
  const displayUser = user || {
    name: "Alex Smith",
    position: "Senior Analyst",
    department: "Cybersecurity Division",
    email: "alex.smith@infinicore.com.my",
    ic: "******-**-5678",
    personalEmail: "alex.smith.personal@gmail.com",
    address: "123 Main Street, Apt 4B, Kuala Lumpur, 50450",
    phoneNo: "+60 12-345 6789"
  }

  const [isEditing, setIsEditing] = useState(false)
  const [personalEmail, setPersonalEmail] = useState(displayUser.personalEmail)
  const [homeAddress, setHomeAddress] = useState(displayUser.address)

  useEffect(() => {
    setPersonalEmail(displayUser.personalEmail)
    setHomeAddress(displayUser.address)
  }, [displayUser.personalEmail, displayUser.address])

  const handleSave = () => {
    setIsEditing(false)
    // Save logic would go here
  }

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
            <h1 className="text-2xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              View and manage your personal information.
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-red hover:bg-red-hover text-white">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-red hover:bg-red-hover text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-0 card-elevated">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-red/20">
                <AvatarImage src="/placeholder-user.jpg" alt={displayUser.name} />
                <AvatarFallback className="bg-red text-white text-2xl font-bold">{displayUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">{displayUser.name}</h2>
              <p className="text-red font-medium">{displayUser.position}</p>
              <p className="text-sm text-muted-foreground mt-1">{displayUser.department}</p>
              
              <div className="w-full mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Profile photo managed by IT</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2 border-0 card-elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 icon-glow-navy rounded-lg">
                <User className="h-5 w-5 text-navy" />
              </div>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Non-editable Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    Full Name
                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                  </Label>
                  <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                    {displayUser.name}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5" />
                    Employee ID
                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                  </Label>
                  <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                    EMP-2024-0847
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    Work Email
                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                  </Label>
                  <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                    {displayUser.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5" />
                    Position
                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                  </Label>
                  <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                    {displayUser.position}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5" />
                    IC No.
                    <Lock className="h-3 w-3 text-muted-foreground/50" />
                  </Label>
                  <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                    {displayUser.ic}
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personalEmail" className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    Personal Email
                    {isEditing && <span className="text-green-600 text-xs">(Editable)</span>}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="personalEmail"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      className="border-red/30 focus:border-red"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                      {personalEmail}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="homeAddress" className="text-muted-foreground text-sm flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    Home Address
                    {isEditing && <span className="text-green-600 text-xs">(Editable)</span>}
                  </Label>
                  {isEditing ? (
                    <textarea
                      id="homeAddress"
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                      className="w-full p-3 rounded-lg border border-red/30 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20 bg-background text-foreground min-h-[100px] resize-none"
                    />
                  ) : (
                    <div className="p-3 rounded-lg bg-secondary/50 text-foreground font-medium">
                      {homeAddress}
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> To update your name, employee ID, work email, position, or IC number, please contact HR through the HRMS portal.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
