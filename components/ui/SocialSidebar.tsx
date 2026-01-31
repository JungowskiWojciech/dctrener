"use client"

import { Facebook, Instagram } from "lucide-react"

export function SocialSidebar() {
    return (
        <div className="fixed right-0 top-[60%] -translate-y-1/2 z-50 flex flex-col gap-3 p-3 bg-black/50 backdrop-blur-md border-l border-y border-white/10 rounded-l-2xl shadow-2xl">
            <a
                href="https://www.instagram.com/dc.trener/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white hover:bg-primary hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
            >
                <Instagram className="h-6 w-6" />
            </a>
            <a
                href="https://www.facebook.com/dc.trener/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white hover:bg-primary hover:text-white rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
            >
                <Facebook className="h-6 w-6" />
            </a>
        </div>
    )
}
