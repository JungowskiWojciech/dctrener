
"use client"

import Link from "next/link"
import { Menu, X, Dumbbell } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { name: "O mnie", href: "#o-mnie" },
        //   { name: "Programy", href: "#programy" }, // Removed
        { name: "Metamorfozy", href: "#metamorfozy" },
        { name: "Kontakt", href: "#kontakt" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
            <div className="container flex h-20 items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 font-black text-2xl uppercase tracking-tighter"
                >
                    <Dumbbell className="h-8 w-8 text-primary" />
                    <span>Trener<span className="text-primary">X</span></span>
                </motion.div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item, i) => (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                className="text-sm font-bold uppercase tracking-wide text-gray-300 transition-colors hover:text-white"
                            >
                                {item.name}
                            </Link>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </div>
                    ))}
                    <Button variant="default" className="rounded-full font-bold px-6" asChild>
                        <Link href="#kontakt">Darmowa Konsultacja</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-20 left-0 right-0 border-b border-white/10 bg-black/95 backdrop-blur-xl p-6 shadow-2xl"
                    >
                        <nav className="flex flex-col space-y-6 text-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-bold uppercase text-gray-200 hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button className="w-full rounded-full text-lg py-6" asChild>
                                <Link href="#kontakt" onClick={() => setIsOpen(false)}>Rozpocznij</Link>
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
