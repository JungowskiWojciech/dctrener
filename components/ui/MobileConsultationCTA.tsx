"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MobileConsultationCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down a bit (e.g. 100px)
            if (window.scrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 md:hidden pb-safe"
                >
                    <Button
                        className="w-full rounded-full shadow-lg shadow-primary/20 text-lg font-bold py-6"
                        onClick={(e) => {
                            e.preventDefault();
                            const contactSection = document.getElementById("kontakt");
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        Darmowa Konsultacja
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
