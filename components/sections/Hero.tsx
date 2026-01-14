
"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative mt-20 min-h-[60vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Mobile Background Image (< 768px) */}
            <div
                className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-[center_top] md:hidden"
                style={{
                    backgroundImage: "url('/uploaded_image_4_1768416073171.jpg')",
                }}
            />

            {/* Desktop Background Image (>= 768px) */}
            <div
                className="hidden md:block absolute inset-0 z-0 bg-no-repeat bg-cover bg-[center_top] md:bg-fixed"
                style={{
                    backgroundImage: "url('/uploaded_image_1768417739174.jpg')", // New desktop image
                }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="container relative z-10 px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center w-full pt-32 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left max-w-2xl"
                >

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[1.1]">
                        Zbuduj <br />
                        <span className="text-primary">Formę Życia</span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-300 mb-8 font-light leading-relaxed max-w-lg">
                        Przestań tracić czas. Trenuj mądrze i osiągnij sylwetkę, o której marzysz, bez zbędnych wyrzeczeń.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="default" className="md:h-12 md:px-8 text-sm md:text-lg h-auto py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
                            <a href="#kontakt">Rozpocznij Współpracę</a>
                        </Button>
                        <Button size="default" variant="outline" className="md:h-12 md:px-8 text-sm md:text-lg h-auto py-3 rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                            <a href="#metamorfozy">Zobacz Efekty</a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
