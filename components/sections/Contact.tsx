
"use client"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Mail, MapPin, Phone, Send, Facebook, Instagram, MessageCircle } from "lucide-react"

type FormData = {
    name: string
    email: string
    goal: string
    message: string
}

export function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                setStatus("success")
                reset()
            } else {
                setStatus("error")
            }
        } catch (e) {
            setStatus("error")
        }
    }

    return (
        <section id="kontakt" className="py-12 md:py-20 bg-muted/30">
            <div className="container space-y-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                                Zacznij <span className="text-primary">Teraz</span>
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Masz pytania? Chcesz umówić się na trening próbny? Skorzystaj z formularza lub skontaktuj się bezpośrednio.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button size="lg" className="w-full md:w-auto flex flex-row items-center justify-center gap-2 text-lg h-auto py-6" asChild>
                                <a href="sms:+48123456789" className="flex flex-row items-center justify-center gap-2 w-full">
                                    <MessageCircle className="h-5 w-5 shrink-0" /> <span className="whitespace-nowrap">Napisz SMS</span>
                                </a>
                            </Button>

                            <Button size="lg" className="w-full md:w-auto flex flex-row items-center justify-center gap-2 text-lg h-auto py-6" asChild>
                                <a href="tel:+48123456789" className="flex flex-row items-center justify-center gap-2 w-full">
                                    <Phone className="h-5 w-5 shrink-0" /> <span className="whitespace-nowrap">Zadzwoń</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card border rounded-2xl p-8 shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Imię</label>
                                <input
                                    id="name"
                                    {...register("name", { required: true })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="Jan Kowalski"
                                />
                                {errors.name && <span className="text-xs text-destructive">To pole jest wymagane</span>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="jan@example.com"
                                />
                                {errors.email && <span className="text-xs text-destructive">Wymagany poprawny email</span>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="goal" className="text-sm font-medium">Twój Cel</label>
                                <select
                                    id="goal"
                                    {...register("goal")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="redukcja">Redukcja wagi</option>
                                    <option value="masa">Budowa masy mięśniowej</option>
                                    <option value="zdrowie">Poprawa zdrowia / kondycji</option>
                                    <option value="inne">Inne</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Wiadomość (opcjonalne)</label>
                                <textarea
                                    id="message"
                                    {...register("message")}
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    placeholder="Opisz krótko o co chciałbyś zapytać..."
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? "Wysyłanie..." : "Wyślij Wiadomość"}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>

                            {status === "success" && (
                                <p className="text-sm text-green-500 text-center font-medium">Wiadomość została wysłana! Odezwę się wkrótce.</p>
                            )}
                            {status === "error" && (
                                <p className="text-sm text-destructive text-center font-medium">Wystąpił błąd. Spróbuj ponownie lub napisz SMS.</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Google Map Full Width (Inside Container) */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border bg-background shadow-sm">
                    <iframe
                        src="https://maps.google.com/maps?q=Magnum+Fitness+Gdańsk+Jabłoniowa+29a&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    ></iframe>
                    <div className="absolute bottom-4 right-4 bg-background/90 p-2 rounded text-xs font-medium flex items-center gap-1 backdrop-blur ring-1 ring-border">
                        <MapPin className="h-4 w-4 text-primary" /> Magnum Fitness, Gdańsk (ul. Jabłoniowa 29a)
                    </div>
                </div>
            </div>
        </section>
    )
}
