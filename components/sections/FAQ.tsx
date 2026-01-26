
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
            answer: "Nie musisz kupować go wcześniej. Możesz zakupić wejście bezpośrednio w siłowni. Honorujemy również karty partnerskie: MultiSport, Medicover Sport, PZU Sport itp."
        },
        {
            question: "Jak wygląda współpraca?",
            answer: "To treningi personalne 1:1, w których dbam o Twój progres, bezpieczeństwo i odpowiedni plan. Prowadzę również treningi DUO dla par lub znajomych o podobnym celu i poziomie zaawansowania (po wcześniejszej weryfikacji)."
        },
        {
            question: "Dostępność i Grafik",
            answer: "Kwestia grafiku jest ustalana indywidualnie, biorąc pod uwagę Twoje możliwości czasowe. Grafik układam z tygodnia na tydzień, aby każdy znalazł dogodny termin na trening."
        }
    ]

    return (
        <section className="pb-12 pt-12 mt-12 bg-background">
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
