
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Calculator() {
    const [mode, setMode] = useState<"bmi" | "calories">("bmi")

    // Shared state
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")

    // BMI state
    const [bmi, setBmi] = useState<string | null>(null)

    // Calories state
    const [age, setAge] = useState("")
    const [gender, setGender] = useState<"male" | "female">("male")

    // Detailed activity state
    const [workType, setWorkType] = useState<"sedentary" | "light_physical" | "physical" | "heavy_physical">("sedentary")
    const [trainings, setTrainings] = useState<"none" | "1-2" | "3-4" | "5+">("none")

    const [calories, setCalories] = useState<{ bmr: number; tdee: number } | null>(null)

    const calculateBMI = () => {
        const w = parseFloat(weight)
        const h = parseFloat(height) / 100 // cm to m

        if (w > 0 && h > 0) {
            const result = w / (h * h)
            setBmi(result.toFixed(2))
        }
    }

    const calculateCalories = () => {
        const w = parseFloat(weight)
        const h = parseFloat(height)
        const a = parseFloat(age)

        if (w > 0 && h > 0 && a > 0) {
            // Mifflin-St Jeor Equation
            let bmr = (10 * w) + (6.25 * h) - (5 * a)

            if (gender === "male") {
                bmr += 5
            } else {
                bmr -= 161
            }

            // Calculate PAL (Physical Activity Level)
            let basePal = 1.2

            // 1. Work Type Base
            switch (workType) {
                case "sedentary": basePal = 1.2; break;         // Office
                case "light_physical": basePal = 1.4; break;    // Standing/Light
                case "physical": basePal = 1.6; break;          // Physical labor
                case "heavy_physical": basePal = 1.8; break;    // Heavy labor
            }

            // 2. Training Modifier
            let trainingMod = 0
            switch (trainings) {
                case "none": trainingMod = 0; break;
                case "1-2": trainingMod = 0.2; break;
                case "3-4": trainingMod = 0.35; break;
                case "5+": trainingMod = 0.5; break;
            }

            const pal = basePal + trainingMod
            const tdee = bmr * pal

            setCalories({
                bmr: Math.round(bmr),
                tdee: Math.round(tdee)
            })
        }
    }

    return (
        <section className="py-12 bg-primary/5 border-y border-border">
            <div className="container max-w-4xl flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight">Kalkulator Zdrowia</h2>
                    <p className="text-muted-foreground">
                        Precyzyjne wyliczenie zapotrzebowania uwzględniające Twój tryb pracy oraz częstotliwość treningów.
                        Pamiętaj, że są to wartości szacunkowe.
                    </p>
                </div>

                <div className="flex-1 bg-card rounded-xl border shadow-sm w-full overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            onClick={() => setMode("bmi")}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === "bmi"
                                ? "bg-muted/50 text-foreground border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-muted/30"
                                }`}
                        >
                            Kalkulator BMI
                        </button>
                        <button
                            onClick={() => setMode("calories")}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === "calories"
                                ? "bg-muted/50 text-foreground border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-muted/30"
                                }`}
                        >
                            Zapotrzebowanie Kaloryczne
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Shared Inputs */}
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

                        {/* Calories Only Inputs */}
                        {mode === "calories" && (
                            <div className="space-y-4 mb-4 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="age" className="text-sm font-medium">Wiek (lat)</label>
                                        <input
                                            id="age"
                                            type="number"
                                            placeholder="30"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="gender" className="text-sm font-medium">Płeć</label>
                                        <select
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value as "male" | "female")}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        >
                                            <option value="male">Mężczyzna</option>
                                            <option value="female">Kobieta</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="workType" className="text-sm font-medium">Rodzaj Pracy</label>
                                    <select
                                        id="workType"
                                        value={workType}
                                        onChange={(e) => setWorkType(e.target.value as any)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="sedentary">Siedząca / Biurowa</option>
                                        <option value="light_physical">Lekka fizyczna / Stojąca</option>
                                        <option value="physical">Fizyczna</option>
                                        <option value="heavy_physical">Ciężka fizyczna</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="trainings" className="text-sm font-medium">Treningi w tygodniu</label>
                                    <select
                                        id="trainings"
                                        value={trainings}
                                        onChange={(e) => setTrainings(e.target.value as any)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="none">Brak dodatkowych aktywności</option>
                                        <option value="1-2">1-2 treningi</option>
                                        <option value="3-4">3-4 treningi</option>
                                        <option value="5+">5+ treningów (sportowiec)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <Button
                            onClick={mode === "bmi" ? calculateBMI : calculateCalories}
                            className="w-full mb-4"
                        >
                            Oblicz {mode === "bmi" ? "BMI" : "Kalorie"}
                        </Button>

                        {/* Results */}
                        {mode === "bmi" && bmi && (
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

                        {mode === "calories" && calories && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {/* Redukcja */}
                                    <div className="bg-card border rounded-lg p-4 text-center hover:border-primary transition-colors">
                                        <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-1">Redukcja</div>
                                        <div className="text-2xl font-bold text-orange-500">
                                            {calories.tdee - 500}
                                            <span className="text-sm font-medium text-muted-foreground ml-1">kcal</span>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">Deficyt -500 kcal</div>
                                    </div>

                                    {/* Utrzymanie */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center ring-1 ring-primary/10">
                                        <div className="text-xs uppercase font-bold text-primary tracking-wider mb-1">Utrzymanie</div>
                                        <div className="text-3xl font-extrabold text-foreground">
                                            {calories.tdee}
                                            <span className="text-sm font-medium text-muted-foreground ml-1">kcal</span>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">Twoje zero kaloryczne</div>
                                    </div>

                                    {/* Masa */}
                                    <div className="bg-card border rounded-lg p-4 text-center hover:border-primary transition-colors">
                                        <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-1">Masa</div>
                                        <div className="text-2xl font-bold text-green-500">
                                            {calories.tdee + 300}
                                            <span className="text-sm font-medium text-muted-foreground ml-1">kcal</span>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">Nadwyżka +300 kcal</div>
                                    </div>
                                </div>

                                <div className="text-center p-3 bg-muted/50 rounded-lg">
                                    <span className="text-xs text-muted-foreground">
                                        Twój BMR (podstawowa przemiana materii): <span className="font-semibold text-foreground">{calories.bmr} kcal</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
