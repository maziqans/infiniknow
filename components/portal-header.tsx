"use client"

import { useState } from "react"
import { Search, Shield, LogOut, User, ChevronDown } from "lucide-react"
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
import { InfiniKnowLogo } from "./infiniknow-logo"

interface PortalHeaderProps {
  onNavigate?: (page: string) => void
}

export function PortalHeader({ onNavigate }: PortalHeaderProps) {
  return (
    <header className="bg-navy hexagon-pattern relative">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0B1C33]/95 via-[#0B1C33]/85 to-[#0B1C33]/95" />
      
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Left - Logo and Title */}
        <div className="flex items-center gap-4">
          <InfiniKnowLogo className="h-10 w-16" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-wide">INFINIKNOW</span>
            <span className="text-xs text-white/70 tracking-widest uppercase">Internal Portal</span>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search policies, templates, guidelines..."
              className="w-full pl-12 pr-4 py-3 h-12 bg-white border-2 border-red/50 focus:border-red rounded-xl shadow-lg text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right - User Profile and Access Banner */}
        <div className="flex items-center gap-6">
          {/* Access Banner */}
          <div className="hidden lg:flex items-center gap-2 bg-red/20 border border-red/40 rounded-lg px-4 py-2">
            <Shield className="h-4 w-4 text-red" />
            <span className="text-xs font-semibold text-white uppercase tracking-wide">
              Access: Internal Staff Extranet Only
            </span>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-2 py-1.5 h-auto hover:bg-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">Alex Smith</p>
                  <p className="text-xs text-white/60">Senior Analyst</p>
                </div>
                <Avatar className="h-10 w-10 border-2 border-white/30">
                  <AvatarImage src="/placeholder-user.jpg" alt="Alex Smith" />
                  <AvatarFallback className="bg-red text-white font-semibold">AS</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-white/70" />
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
              <DropdownMenuItem className="cursor-pointer text-red focus:text-red">
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
