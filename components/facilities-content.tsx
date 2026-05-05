"use client"

import {
  Coffee,
  Wifi,
  Monitor,
  Printer,
  Car,
  Utensils,
  Dumbbell,
  Sofa,
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Headphones,
  Building,
  ShieldCheck,
  Server,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const facilities = [
  {
    name: "Pantry & Coffee Station",
    icon: <Coffee className="h-6 w-6" />,
    location: "All Floors",
    description: "Free coffee, tea, snacks, and refreshments. Fully stocked daily.",
    amenities: ["Premium Coffee Machine", "Tea Selection", "Refrigerator", "Microwave"],
    hours: "24/7 Access",
  },
  {
    name: "Cafeteria",
    icon: <Utensils className="h-6 w-6" />,
    location: "Ground Floor",
    description: "Full-service cafeteria with hot meals, salads, and grab-and-go options.",
    amenities: ["Hot Meals", "Salad Bar", "Vegetarian Options", "Seating for 200"],
    hours: "7:00 AM - 7:00 PM",
  },
  {
    name: "Meeting Rooms",
    icon: <Monitor className="h-6 w-6" />,
    location: "Floors 2-8",
    description: "Various sized meeting rooms equipped with video conferencing.",
    amenities: ["Video Conferencing", "Whiteboard", "Screen Sharing", "Recording Capable"],
    hours: "Book via Outlook",
  },
  {
    name: "Wellness Room",
    icon: <Dumbbell className="h-6 w-6" />,
    location: "Floor 1",
    description: "Fitness area with equipment and space for yoga or meditation.",
    amenities: ["Treadmills", "Free Weights", "Yoga Mats", "Shower Facilities"],
    hours: "6:00 AM - 10:00 PM",
  },
  {
    name: "Lounge Areas",
    icon: <Sofa className="h-6 w-6" />,
    location: "Floors 3, 5, 7",
    description: "Comfortable spaces for informal meetings or relaxation.",
    amenities: ["Comfortable Seating", "Plants", "Natural Light", "Quiet Zones"],
    hours: "24/7 Access",
  },
  {
    name: "Parking",
    icon: <Car className="h-6 w-6" />,
    location: "Basement Levels B1-B3",
    description: "Secure underground parking with EV charging stations available.",
    amenities: ["Security Cameras", "EV Charging", "Bike Storage", "Visitor Parking"],
    hours: "24/7 Access",
  },
]

const itServices = [
  {
    name: "IT Help Desk",
    icon: <Headphones className="h-5 w-5" />,
    contact: "Ext. 5555 or helpdesk@infiniknow.com",
    description: "For all IT support requests, password resets, and technical issues.",
  },
  {
    name: "Network & WiFi",
    icon: <Wifi className="h-5 w-5" />,
    contact: "SSID: InfiniKnow-Secure",
    description: "Enterprise WiFi available throughout the building. Use your AD credentials.",
  },
  {
    name: "Printing Services",
    icon: <Printer className="h-5 w-5" />,
    contact: "Follow-Me Printing Enabled",
    description: "Secure printing available on all floors. Release jobs at any printer.",
  },
  {
    name: "Server Room Access",
    icon: <Server className="h-5 w-5" />,
    contact: "Request via IT Ticket",
    description: "Restricted access. Requires approval from IT Security team.",
  },
]

interface FacilitiesContentProps {
  onBack: () => void
}

export function FacilitiesContent({ onBack }: FacilitiesContentProps) {
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
            <h1 className="text-2xl font-bold text-foreground mb-2">IT & Facilities</h1>
            <p className="text-muted-foreground">
              Office amenities, IT services, and facility information.
            </p>
          </div>
        </div>
      </div>

      {/* Office Building Info */}
      <Card className="border-0 card-elevated mb-6">
        <CardContent className="py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 icon-glow-navy rounded-lg">
                <Building className="h-6 w-6 text-navy" />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">InfiniKnow HQ</h2>
                <p className="text-sm text-muted-foreground">123 Innovation Drive, Tech Park, Suite 500</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 7AM - 9PM</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 100-0000</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IT Services */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-red rounded-full"></span>
          IT Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itServices.map((service, index) => (
            <Card key={index} className="border-0 card-elevated">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 icon-glow-red rounded-lg shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-normal bg-secondary/70">
                        {service.contact}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Facilities Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-navy rounded-full"></span>
          Office Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((facility, index) => (
            <Card key={index} className="border-0 card-elevated group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 icon-glow-navy rounded-lg text-navy group-hover:scale-110 transition-transform">
                    {facility.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{facility.name}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {facility.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">{facility.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {facility.amenities.map((amenity, i) => (
                    <Badge key={i} variant="outline" className="text-xs font-normal">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <Clock className="h-3 w-3" />
                  {facility.hours}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Info */}
      <Card className="border-0 card-elevated mt-6">
        <CardContent className="py-5">
          <div className="flex items-start gap-4">
            <div className="p-3 icon-glow-red rounded-lg">
              <ShieldCheck className="h-6 w-6 text-red" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Security & Access</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All employees must wear ID badges at all times. For lost badges, contact Security at Ext. 5500 or visit the reception desk. After-hours access requires manager approval.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
