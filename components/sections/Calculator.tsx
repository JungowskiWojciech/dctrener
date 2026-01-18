
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
            <div className="container max-w-6xl flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/3 space-y-4 lg:sticky lg:top-32">
                    <h2 className="text-3xl font-bold uppercase tracking-tight leading-tight">Kalkulator <span className="text-primary">Zdrowia</span></h2>
                    <p className="text-muted-foreground">
                        Precyzyjne wyliczenie zapotrzebowania uwzględniające Twój tryb pracy oraz częstotliwość treningów.
                        Pamiętaj, że są to wartości szacunkowe.
                    </p>
                </div>

                <div className="flex-1 bg-card rounded-2xl border shadow-xl w-full overflow-hidden border-white/5">
                    {/* Tabs */}
                    <div className="flex border-b border-white/5">
                        <button
                            onClick={() => setMode("bmi")}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === "bmi"
                                ? "bg-primary/10 text-primary border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-white/5"
                                }`}
                        >
                            Kalkulator BMI
                        </button>
                        <button
                            onClick={() => setMode("calories")}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === "calories"
                                ? "bg-primary/10 text-primary border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-white/5"
                                }`}
                        >
                            Zapotrzebowanie Kaloryczne
                        </button>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Inputs Column */}
                            <div className="space-y-6">
                                {/* Shared Inputs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="weight" className="text-sm font-bold uppercase text-muted-foreground">Waga (kg)</label>
                                        <input
                                            id="weight"
                                            type="number"
                                            placeholder="80"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="height" className="text-sm font-bold uppercase text-muted-foreground">Wzrost (cm)</label>
                                        <input
                                            id="height"
                                            type="number"
                                            placeholder="180"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Calories Only Inputs */}
                                {mode === "calories" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="age" className="text-sm font-bold uppercase text-muted-foreground">Wiek (lat)</label>
                                                <input
                                                    id="age"
                                                    type="number"
                                                    placeholder="30"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="gender" className="text-sm font-bold uppercase text-muted-foreground">Płeć</label>
                                                <select
                                                    id="gender"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value as "male" | "female")}
                                                    className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none"
                                                >
                                                    <option value="male">Mężczyzna</option>
                                                    <option value="female">Kobieta</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="workType" className="text-sm font-bold uppercase text-muted-foreground">Rodzaj Pracy</label>
                                            <select
                                                id="workType"
                                                value={workType}
                                                onChange={(e) => setWorkType(e.target.value as any)}
                                                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            >
                                                <option value="sedentary">Siedząca / Biurowa</option>
                                                <option value="light_physical">Lekka fizyczna / Stojąca</option>
                                                <option value="physical">Fizyczna</option>
                                                <option value="heavy_physical">Ciężka fizyczna</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="trainings" className="text-sm font-bold uppercase text-muted-foreground">Treningi w tygodniu</label>
                                            <select
                                                id="trainings"
                                                value={trainings}
                                                onChange={(e) => setTrainings(e.target.value as any)}
                                                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
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
                                    className="w-full h-14 text-lg font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20"
                                >
                                    Oblicz {mode === "bmi" ? "BMI" : "Kalorie"}
                                </Button>
                            </div>

                            {/* Results Column */}
                            <div className="min-h-[300px] flex flex-col justify-center bg-white/5 rounded-2xl p-6 border border-white/5">
                                {!calories && !bmi && (
                                    <div className="text-center space-y-4">
                                        <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm font-medium">Wypełnij dane i kliknij przycisk oblicz, aby zobaczyć wyniki.</p>
                                    </div>
                                )}

                                {mode === "bmi" && bmi && (
                                    <div className="text-center p-6 bg-background/40 rounded-2xl border border-white/5 animate-in zoom-in-95 duration-300">
                                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">Twoje BMI:</span>
                                        <div className={`text-6xl font-black mb-4 ${parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9
                                            ? "text-green-500"
                                            : "text-red-500"
                                            }`}>
                                            {bmi}
                                        </div>
                                        <p className="text-lg font-bold uppercase tracking-tight text-foreground">
                                            {parseFloat(bmi) < 18.5 && "Niedowaga"}
                                            {parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9 && "Waga prawidłowa"}
                                            {parseFloat(bmi) > 24.9 && "Nadwaga / Otyłość"}
                                        </p>
                                    </div>
                                )}

                                {mode === "calories" && calories && (
                                    <div className="space-y-6 animate-in zoom-in-95 duration-300">
                                        <div className="grid grid-cols-1 gap-4">
                                            {/* Utrzymanie (Most Bold) */}
                                            <div className="bg-primary/90 border-2 border-primary rounded-2xl p-6 text-center shadow-xl shadow-primary/20">
                                                <div className="text-xs uppercase font-black text-white/70 tracking-[0.2em] mb-1">Utrzymanie</div>
                                                <div className="flex items-baseline justify-center gap-1">
                                                    <span className="text-4xl font-black text-white">{calories.tdee}</span>
                                                    <span className="text-sm font-bold text-white/80 uppercase">kcal</span>
                                                </div>
                                                <div className="text-[10px] text-white/60 mt-2 font-bold uppercase tracking-tighter">Twoje zero kaloryczne</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {/* Redukcja */}
                                                <div className="bg-card border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center">
                                                    <div className="text-[10px] uppercase font-bold text-orange-500/80 tracking-widest mb-1">Redukcja</div>
                                                    <div className="flex items-baseline justify-center gap-0.5">
                                                        <span className="text-xl font-black text-orange-500">{calories.tdee - 500}</span>
                                                        <span className="text-[10px] font-bold text-orange-500/70 uppercase">kcal</span>
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter">-500 kcal</div>
                                                </div>

                                                {/* Masa */}
                                                <div className="bg-card border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center">
                                                    <div className="text-[10px] uppercase font-bold text-green-500/80 tracking-widest mb-1">Masa</div>
                                                    <div className="flex items-baseline justify-center gap-0.5">
                                                        <span className="text-xl font-black text-green-500">{calories.tdee + 300}</span>
                                                        <span className="text-[10px] font-bold text-green-500/70 uppercase">kcal</span>
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter">+300 kcal</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block mb-1">BMR (Metabolizm spoczynkowy)</span>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-base font-black text-foreground">{calories.bmr}</span>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
