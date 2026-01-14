
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Calculator() {
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [bmi, setBmi] = useState<string | null>(null)

    const calculateBMI = () => {
        const w = parseFloat(weight)
        const h = parseFloat(height) / 100 // cm to m

        if (w > 0 && h > 0) {
            const result = w / (h * h)
            setBmi(result.toFixed(2))
        }
    }

    return (
        <section className="py-16 bg-primary/5 border-y border-border">
            <div className="container max-w-4xl flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight">Kalkulator BMI</h2>
                    <p className="text-muted-foreground">
                        Sprawdź, czy Twoja waga jest w normie.
                        To tylko prosty wskaźnik - po dokładną analizę składu ciała zapraszam na konsultację.
                    </p>
                </div>

                <div className="flex-1 bg-card p-6 rounded-xl border shadow-sm w-full">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                            <label htmlFor="weight" className="text-sm font-medium">Waga (kg)</label>
                            <input
                                id="weight"
                                type="number"
                                placeholder="80"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="height" className="text-sm font-medium">Wzrost (cm)</label>
                            <input
                                id="height"
                                type="number"
                                placeholder="180"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <Button onClick={calculateBMI} className="w-full mb-4">Oblicz</Button>

                    {bmi && (
                        <div className="text-center p-4 bg-muted rounded-lg animate-in fade-in slide-in-from-top-2">
                            <span className="text-sm text-muted-foreground">Twoje BMI:</span>
                            <div className={`text-3xl font-bold ${parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}>
                                {bmi}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {parseFloat(bmi) < 18.5 && "Niedowaga"}
                                {parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9 && "Waga prawidłowa"}
                                {parseFloat(bmi) > 24.9 && "Nadwaga / Otyłość"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
