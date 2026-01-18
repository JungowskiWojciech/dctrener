
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: "Czy muszę mieć karnet na siłownię?",
            answer: "Nie! Prowadzę podopiecznych trenujących w domu, w plenerze oraz na siłowni. Plan dostosowuję do sprzętu, który posiadasz."
        },
        {
            question: "Dla kogo jest współpraca online?",
            answer: "Dla każdego, kto chce osiągnąć cel bez zgadywania. Niezależnie czy jesteś początkujący, czy zaawansowany - dobiorę plan do Twoich możliwości."
        },
        {
            question: "Jak wygląda kontakt z trenerem?",
            answer: "W pakiecie Współpraca 1:1 jestem dostępny na WhatsApp w dni robocze 9-17. Odpisuję na bieżąco, analizuję Twoje filmy z techniki i motywuję."
        },
        {
            question: "Ile czasu muszę czekać na plan?",
            answer: "Po wypełnieniu ankiety wstępnej, plan otrzymasz w ciągu 3 dni roboczych."
        }
    ]

    return (
        <section className="pb-12 pt-0 bg-background">
            <div className="container max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-center mb-12">
                    Częste <span className="text-primary">Pytania</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-xl bg-card overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 transition-transform duration-200",
                                        openIndex === index && "rotate-180"
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
