"use client"

import { Headphones } from "lucide-react"

export function PortalFooter() {
  return (
    <footer className="bg-card border-t border-border px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Infinicore Sdn. Bhd. All rights reserved. Internal Use Only.
        </p>
        <a
          href="#"
          className="flex items-center gap-2 text-sm text-red hover:text-red-hover transition-colors font-medium"
        >
          <Headphones className="h-4 w-4" />
          Helpdesk Portal
        </a>
      </div>
    </footer>
  )
}
