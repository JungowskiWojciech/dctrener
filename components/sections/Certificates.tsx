"use client"

import { motion } from "framer-motion"
import { FileText, Download } from "lucide-react"

export function Certificates() {
    const images = [
        { src: "/reps_pl.png", alt: "Certyfikat REPs Polska" },
        { src: "/reps_en.png", alt: "Certyfikat REPs English" },
    ]

    const documents = [
        { name: "Certyfikat 1", file: "/certyfikat_1.pdf" },
        { name: "Certyfikat 2", file: "/certyfikat_2.pdf" },
        { name: "GSA Level 1", file: "/gsa_1.pdf" },
        { name: "GSA Level 2", file: "/gsa_2.pdf" },
        { name: "Kettlebell", file: "/kettle.pdf" },
        { name: "Legitymacja Instruktora", file: "/legitymacja.pdf" },
    ]

    return (
        <section className="py-20 bg-black min-h-screen">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                        Certyfikaty <span className="text-primary">&</span> Szkolenia
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Stale podnoszę swoje kwalifikacje, aby zapewnić najwyższą jakość treningów.
                        Poniżej znajdziesz moje certyfikaty i uprawnienia.
                    </p>
                </motion.div>

                {/* Images Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all p-2"
                        >
                            <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-black">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Documents Grid */}
                <h3 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-wide">
                    Dokumenty do wglądu
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {documents.map((doc, i) => (
                        <motion.a
                            key={i}
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex flex-col items-center justify-center p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-primary/50 transition-all group gap-3 text-center"
                        >
                            <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <FileText className="h-6 w-6 text-neutral-400 group-hover:text-primary transition-colors" />
                            </div>
                            <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">
                                {doc.name}
                            </span>
                            <span className="text-xs text-primary/50 uppercase tracking-wider font-bold group-hover:text-primary transition-colors flex items-center gap-1">
                                <Download className="h-3 w-3" /> Zobacz PDF
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
