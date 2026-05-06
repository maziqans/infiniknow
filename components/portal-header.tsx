"use client"

import { useState } from "react"
import { Search, Shield, LogOut, User, ChevronDown } from "lucide-react"
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
