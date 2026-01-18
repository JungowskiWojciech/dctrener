
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Programs() {
    const programs = [
        {
            name: "Konsultacja Online",
            price: "199 PLN",
            description: "Jednorazowa analiza Twojego treningu i diety.",
            features: [
                "Analiza techniki ćwiczeń",
                "Omówienie błędów żywieniowych",
                "Plan działania na 4 tygodnie",
                "Odpowiedzi na pytania (Q&A)"
            ],
            popular: false
        },
        {
            name: "Współpraca 1:1",
            price: "499 PLN",
            period: "/mies",
            description: "Kompleksowa opieka trenerska i żywieniowa.",
            features: [
                "Indywidualny plan treningowy",
                "Spersonalizowana dieta",
                "Stały kontakt (WhatsApp)",
                "Raporty i kontrola postępów co tydzień",
                "Analiza wideo techniki"
            ],
            popular: true
        },
        {
            name: "Plan Treningowy",
            price: "299 PLN",
            description: "Rozpiska treningowa dopasowana do Twojego celu.",
            features: [
                "Plan na 8 tygodni",
                "Dobór ćwiczeń pod sprzęt",
                "Wskazówki techniczne (PDF)",
                "Jednorazowa konsultacja wstępna"
            ],
            popular: false
        }
    ]

    return (
        <section id="programy" className="py-12 md:py-20 bg-muted/30">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                        Wybierz Swój <span className="text-primary">Plan</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Niezależnie od tego, czy chcesz schudnąć, zbudować mięśnie czy poprawić zdrowie – mam dla Ciebie rozwiązanie.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {programs.map((program) => (
                        <div
                            key={program.name}
                            className={`relative rounded-2xl border bg-card p-8 shadow-sm flex flex-col ${program.popular ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                        >
                            {program.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                                    Najczęściej Wybierany
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold">{program.name}</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold">{program.price}</span>
                                    {program.period && <span className="text-muted-foreground">{program.period}</span>}
                                </div>
                                <p className="mt-2 text-muted-foreground">{program.description}</p>
                            </div>

                            <ul className="mb-8 space-y-4 flex-1">
                                {program.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-primary shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button className="w-full" variant={program.popular ? "default" : "outline"} asChild>
                                <a href="#kontakt">Zamawiam</a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
