"use client"

import { useState } from "react"
import { Mail, Phone, Building2, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tree, TreeNode } from "react-organizational-chart"
import { cn } from "@/lib/utils"

interface OrgPerson {
  id: string
  name: string
  title: string
  department: string
  email: string
  phone: string
}

// Define all people
const people: Record<string, OrgPerson> = {
  hamzi: {
    id: "hamzi",
    name: "Hamzi",
    title: "Chief Executive Officer",
    department: "Executive",
    email: "hamzi@infinicore.com.my",
    phone: "+60 3-1234 5001",
  },
  ammar_cto: {
    id: "ammar_cto",
    name: "Ammar",
    title: "Chief Technology Officer",
    department: "Technology",
    email: "ammar@infinicore.com.my",
    phone: "+60 3-1234 5100",
  },
  aida: {
    id: "aida",
    name: "Aida",
    title: "Head of Operation & Finance",
    department: "Operations & Finance",
    email: "aida@infinicore.com.my",
    phone: "+60 3-1234 5010",
  },
  zulaikha: {
    id: "zulaikha",
    name: "Zulaikha",
    title: "Lead Helpdesk",
    department: "Tender Helpdesk",
    email: "zulaikha@infinicore.com.my",
    phone: "+60 3-1234 5020",
  },
  adam: {
    id: "adam",
    name: "Adam",
    title: "Exec Helpdesk",
    department: "Tender Helpdesk",
    email: "adam@infinicore.com.my",
    phone: "+60 3-1234 5021",
  },
  fikri_s: {
    id: "fikri_s",
    name: "Fikri S.",
    title: "Lead Marketing",
    department: "Sales & Marketing",
    email: "fikri.s@infinicore.com.my",
    phone: "+60 3-1234 5030",
  },
  aziz: {
    id: "aziz",
    name: "Aziz",
    title: "Graphic & UI/UX",
    department: "Sales & Marketing",
    email: "aziz@infinicore.com.my",
    phone: "+60 3-1234 5031",
  },
  syazwan: {
    id: "syazwan",
    name: "Syazwan",
    title: "IT Manager",
    department: "Technical",
    email: "syazwan@infinicore.com.my",
    phone: "+60 3-1234 5110",
  },
  ammar_cyber: {
    id: "ammar_cyber",
    name: "Ammar",
    title: "Lead CyberSecurity Consultant",
    department: "Cyber Security & Compliance",
    email: "ammar.cyber@infinicore.com.my",
    phone: "+60 3-1234 5200",
  },
  sukimin: {
    id: "sukimin",
    name: "Sukimin",
    title: "Lead IT Infra Engineer",
    department: "IT Infra",
    email: "sukimin@infinicore.com.my",
    phone: "+60 3-1234 5120",
  },
  azizi: {
    id: "azizi",
    name: "Azizi",
    title: "Network Engineer",
    department: "IT Infra",
    email: "azizi@infinicore.com.my",
    phone: "+60 3-1234 5121",
  },
  mujahidin: {
    id: "mujahidin",
    name: "Mujahidin",
    title: "Lead Software Engineer",
    department: "Team A",
    email: "mujahidin@infinicore.com.my",
    phone: "+60 3-1234 5130",
  },
  ammar_j: {
    id: "ammar_j",
    name: "Ammar J.",
    title: "Jr. Software Dev",
    department: "Team A",
    email: "ammar.j@infinicore.com.my",
    phone: "+60 3-1234 5131",
  },
  fikri_m: {
    id: "fikri_m",
    name: "Fikri M.",
    title: "Lead Software Engineer",
    department: "Team B",
    email: "fikri.m@infinicore.com.my",
    phone: "+60 3-1234 5140",
  },
  asyiqin: {
    id: "asyiqin",
    name: "Asyiqin A.",
    title: "Jr. Software Dev",
    department: "Team B",
    email: "asyiqin@infinicore.com.my",
    phone: "+60 3-1234 5141",
  },
}

// Card component for each person
function PersonCard({ 
  person, 
  onClick,
  variant = "default"
}: { 
  person: OrgPerson
  onClick: (person: OrgPerson) => void
  variant?: "ceo" | "cto" | "head" | "manager" | "lead" | "default"
}) {
  const variantStyles = {
    ceo: "bg-gradient-to-br from-red to-red-hover text-white shadow-lg shadow-red/25 border-0",
    cto: "bg-gradient-to-br from-navy to-navy-light text-white shadow-lg shadow-navy/25 border-0",
    head: "bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-md border-0",
    manager: "bg-white text-foreground border-2 border-navy/30 shadow-md hover:border-red hover:shadow-lg",
    lead: "bg-white text-foreground border-2 border-slate-300 shadow-sm hover:border-red hover:shadow-md",
    default: "bg-slate-50 text-foreground border border-slate-200 shadow-sm hover:border-red hover:shadow-md",
  }

  return (
    <button
      onClick={() => onClick(person)}
      className={cn(
        "px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 text-center inline-block",
        "hover:scale-105 hover:-translate-y-0.5",
        variantStyles[variant]
      )}
    >
      <p className={cn(
        "font-bold text-sm",
        (variant === "ceo" || variant === "cto" || variant === "head") ? "text-white" : "text-foreground"
      )}>
        {person.name}
      </p>
      <p className={cn(
        "text-xs mt-1",
        variant === "ceo" ? "text-red-100" : 
        variant === "cto" ? "text-blue-100" :
        variant === "head" ? "text-slate-300" : 
        "text-muted-foreground"
      )}>
        {person.title}
      </p>
    </button>
  )
}

// Department label for tree nodes
function DepartmentLabel({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 bg-gradient-to-r from-navy/10 to-navy/5 rounded-lg border border-navy/15 inline-block">
      <p className="text-xs font-semibold text-navy uppercase tracking-wider text-center">{label}</p>
    </div>
  )
}

// Sub-department label
function SubDeptLabel({ label }: { label: string }) {
  return (
    <div className="px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200 inline-block">
      <p className="text-xs font-medium text-slate-600 text-center">{label}</p>
    </div>
  )
}

interface CompanyStructureContentProps {
  onBack: () => void
}

export function CompanyStructureContent({ onBack }: CompanyStructureContentProps) {
  const [selectedPerson, setSelectedPerson] = useState<OrgPerson | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleNodeClick = (person: OrgPerson) => {
    setSelectedPerson(person)
    setIsPanelOpen(true)
  }

  const closePanel = () => {
    setIsPanelOpen(false)
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-8 py-6 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-navy">Organization Chart</h1>
        <p className="text-muted-foreground mt-1">Click on any person to view their contact details</p>
      </div>

      {/* Org Chart using react-organizational-chart */}
      <div className="py-12 px-8 overflow-x-auto">
        <style jsx global>{`
          .org-tree ul {
            padding-top: 20px;
            position: relative;
            transition: all 0.3s;
          }
          .org-tree li {
            float: left;
            text-align: center;
            list-style-type: none;
            position: relative;
            padding: 20px 8px 0 8px;
            transition: all 0.3s;
          }
          .org-tree li::before,
          .org-tree li::after {
            content: '';
            position: absolute;
            top: 0;
            right: 50%;
            border-top: 2px solid #1e3a5f;
            width: 50%;
            height: 20px;
          }
          .org-tree li::after {
            right: auto;
            left: 50%;
            border-left: 2px solid #1e3a5f;
          }
          .org-tree li:only-child::after,
          .org-tree li:only-child::before {
            display: none;
          }
          .org-tree li:only-child {
            padding-top: 0;
          }
          .org-tree li:first-child::before,
          .org-tree li:last-child::after {
            border: 0 none;
          }
          .org-tree li:last-child::before {
            border-right: 2px solid #1e3a5f;
            border-radius: 0 5px 0 0;
          }
          .org-tree li:first-child::after {
            border-radius: 5px 0 0 0;
          }
          .org-tree ul ul::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            border-left: 2px solid #1e3a5f;
            width: 0;
            height: 20px;
          }
        `}</style>

        <div className="org-tree flex justify-center">
          <Tree
            lineWidth="2px"
            lineColor="#1e3a5f"
            lineBorderRadius="6px"
            label={<PersonCard person={people.hamzi} onClick={handleNodeClick} variant="ceo" />}
          >
            <TreeNode label={<PersonCard person={people.ammar_cto} onClick={handleNodeClick} variant="cto" />}>
              <TreeNode label={<PersonCard person={people.aida} onClick={handleNodeClick} variant="head" />}>
                {/* Tender Helpdesk */}
                <TreeNode label={<DepartmentLabel label="Tender Helpdesk" />}>
                  <TreeNode label={<PersonCard person={people.zulaikha} onClick={handleNodeClick} variant="lead" />}>
                    <TreeNode label={<PersonCard person={people.adam} onClick={handleNodeClick} variant="default" />} />
                  </TreeNode>
                </TreeNode>

                {/* Sales & Marketing */}
                <TreeNode label={<DepartmentLabel label="Sales & Marketing" />}>
                  <TreeNode label={<PersonCard person={people.fikri_s} onClick={handleNodeClick} variant="lead" />}>
                    <TreeNode label={<PersonCard person={people.aziz} onClick={handleNodeClick} variant="default" />} />
                  </TreeNode>
                </TreeNode>

                {/* Technical */}
                <TreeNode label={<DepartmentLabel label="Technical" />}>
                  <TreeNode label={<PersonCard person={people.syazwan} onClick={handleNodeClick} variant="manager" />}>
                    {/* IT Infra */}
                    <TreeNode label={<SubDeptLabel label="IT Infra" />}>
                      <TreeNode label={<PersonCard person={people.sukimin} onClick={handleNodeClick} variant="lead" />}>
                        <TreeNode label={<PersonCard person={people.azizi} onClick={handleNodeClick} variant="default" />} />
                      </TreeNode>
                    </TreeNode>

                    {/* Team A */}
                    <TreeNode label={<SubDeptLabel label="Team A" />}>
                      <TreeNode label={<PersonCard person={people.mujahidin} onClick={handleNodeClick} variant="lead" />}>
                        <TreeNode label={<PersonCard person={people.ammar_j} onClick={handleNodeClick} variant="default" />} />
                      </TreeNode>
                    </TreeNode>

                    {/* Team B */}
                    <TreeNode label={<SubDeptLabel label="Team B" />}>
                      <TreeNode label={<PersonCard person={people.fikri_m} onClick={handleNodeClick} variant="lead" />}>
                        <TreeNode label={<PersonCard person={people.asyiqin} onClick={handleNodeClick} variant="default" />} />
                      </TreeNode>
                    </TreeNode>
                  </TreeNode>
                </TreeNode>

                {/* Cyber Security & Compliance */}
                <TreeNode label={<DepartmentLabel label="Cyber Security & Compliance" />}>
                  <TreeNode label={<PersonCard person={people.ammar_cyber} onClick={handleNodeClick} variant="lead" />} />
                </TreeNode>
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
      </div>

      {/* Overlay */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={closePanel}
        />
      )}

      {/* Slide-out Right Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ease-out",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedPerson && (
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="bg-gradient-to-br from-navy to-navy-light px-6 py-8 relative">
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              
              <div className="text-center pt-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red to-red-hover mx-auto mb-4 flex items-center justify-center shadow-lg shadow-red/30">
                  <span className="text-2xl font-bold text-white">
                    {selectedPerson.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedPerson.name}</h2>
                <p className="text-red-300 font-medium mt-1">{selectedPerson.title}</p>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {/* Department */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-navy/10">
                  <Building2 className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Department</p>
                  <p className="text-base font-semibold text-foreground mt-0.5">{selectedPerson.department}</p>
                </div>
              </div>

              {/* Work Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-red/5 to-white border border-red/10 shadow-sm">
                <div className="p-2.5 rounded-lg bg-red/10">
                  <Mail className="h-5 w-5 text-red" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Work Email</p>
                  <a 
                    href={`mailto:${selectedPerson.email}`} 
                    className="text-base font-semibold text-red hover:underline mt-0.5 block"
                  >
                    {selectedPerson.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm">
                <div className="p-2.5 rounded-lg bg-navy/10">
                  <Phone className="h-5 w-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Phone No.</p>
                  <a 
                    href={`tel:${selectedPerson.phone}`} 
                    className="text-base font-semibold text-foreground hover:text-red mt-0.5 block transition-colors"
                  >
                    {selectedPerson.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <Button 
                className="w-full bg-gradient-to-r from-red to-red-hover hover:from-red-hover hover:to-red text-white shadow-lg shadow-red/20"
                onClick={() => window.location.href = `mailto:${selectedPerson.email}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
