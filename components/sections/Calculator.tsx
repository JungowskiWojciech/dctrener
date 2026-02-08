"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Calculator() {
    const [mode, setMode] = useState<"bmi" | "calories">("calories")

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
    const [steps, setSteps] = useState<"under_5k" | "5k_8k" | "8k_10k" | "10k_12k" | "over_12k">("under_5k")
    const [trainings, setTrainings] = useState<"0" | "1" | "2" | "3" | "4" | "5+">("0")

    const [calories, setCalories] = useState<{
        bmr: number;
        tdee: number;
        goals: {
            cut: { kcal: number, protein: number, fat: number, carbs: number };
            maintain: { kcal: number, protein: number, fat: number, carbs: number };
            bulk: { kcal: number, protein: number, fat: number, carbs: number };
        }
    } | null>(null)

    const [error, setError] = useState<string | null>(null)

    const validateInputs = () => {
        // Basic check for empty strings
        if (!weight) return "Wprowadź wagę"
        if (!height) return "Wprowadź wzrost"

        const w = parseFloat(weight)
        const h = parseFloat(height)

        if (isNaN(w) || w < 20 || w > 300) return "Waga musi mieścić się w przedziale 20-300 kg"
        if (isNaN(h) || h < 50 || h > 250) return "Wzrost musi mieścić się w przedziale 50-250 cm"

        if (mode === "calories") {
            if (!age) return "Wprowadź wiek"
            const a = parseFloat(age)
            if (isNaN(a) || a < 10 || a > 120) return "Wiek musi mieścić się w przedziale 10-120 lat"
        }

        return null
    }

    const calculateBMI = () => {
        setError(null)
        const validationError = validateInputs()
        if (validationError) {
            setError(validationError)
            return
        }

        const w = parseFloat(weight)
        const h = parseFloat(height) / 100 // cm to m

        if (w > 0 && h > 0) {
            const result = w / (h * h)
            setBmi(result.toFixed(2))
        }
    }

    const calculateCalories = () => {
        setError(null)
        const validationError = validateInputs()
        if (validationError) {
            setError(validationError)
            return
        }

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
            // Base PAL (Meta-analysis adjusted)
            let pal = 1.2 // Coma/Survival is ~1.0-1.1, Sedentary starts at 1.2

            // 1. NEAT from Work
            switch (workType) {
                case "sedentary": pal += 0.0; break;         // Office
                case "light_physical": pal += 0.2; break;    // Standing/Light
                case "physical": pal += 0.4; break;          // Physical labor
                case "heavy_physical": pal += 0.6; break;    // Heavy labor/Construction
            }

            // 2. NEAT from Steps (Additive to work)
            // Approx 0.05 PAL per 2.5-3k steps above sedentary baseline
            switch (steps) {
                case "under_5k": pal += 0.0; break;
                case "5k_8k": pal += 0.1; break;
                case "8k_10k": pal += 0.2; break;
                case "10k_12k": pal += 0.3; break;
                case "over_12k": pal += 0.4; break;
            }

            // 3. EAT from Training
            // Approx 0.05 PAL per hard training session per week averaged over 7 days
            // 3 trainings * 300-400kcal / 7 days / TDEE... simplified to PAL add-on
            let trainingCount = 0;
            if (trainings === "5+") trainingCount = 5;
            else trainingCount = parseInt(trainings);

            pal += (trainingCount * 0.05);

            const tdee = Math.round(bmr * pal)

            // Macro Calculations Helper
            const calculateMacros = (targetKcal: number, goal: "cut" | "maintain" | "bulk") => {
                let proteinPerKg = 2.0;
                let fatPerKg = 1.0;

                if (goal === "cut") {
                    proteinPerKg = 2.2; // Higher protein on cut to spare muscle
                    fatPerKg = 0.9;
                } else if (goal === "bulk") {
                    proteinPerKg = 2.0;
                    fatPerKg = 1.0;
                }

                // Calculate grams
                let protein = Math.round(w * proteinPerKg);
                let fat = Math.round(w * fatPerKg);

                // Calories from P & F
                const caloriesFromProtein = protein * 4;
                const caloriesFromFat = fat * 9;

                // Remainder for Carbs
                let remainingCalories = targetKcal - (caloriesFromProtein + caloriesFromFat);

                // Safety check for carbs (shouldn't be negative)
                if (remainingCalories < 0) {
                    // Adjust fat down if needed, but rarely happens with these ratios unless very low kcal
                    remainingCalories = 0;
                }

                let carbs = Math.round(remainingCalories / 4);

                return { kcal: targetKcal, protein, fat, carbs };
            }

            // Goals
            // Cut: -20%
            const cutKcal = Math.round(tdee * 0.8);
            // Bulk: +10%
            const bulkKcal = Math.round(tdee * 1.1);

            setCalories({
                bmr: Math.round(bmr),
                tdee: tdee,
                goals: {
                    maintain: calculateMacros(tdee, "maintain"),
                    cut: calculateMacros(cutKcal, "cut"),
                    bulk: calculateMacros(bulkKcal, "bulk")
                }
            })
        }
    }

    return (
        <section className="py-12 bg-primary/5 border-y border-border">
            <div className="container max-w-6xl flex flex-col lg:flex-row items-start gap-12">
                <div className="lg:w-1/3 space-y-4 lg:sticky lg:top-32">
                    <h2 className="text-3xl font-bold uppercase tracking-tight leading-tight">Kalkulator <span className="text-primary">Zdrowia</span></h2>
                    <p className="text-muted-foreground">
                        Precyzyjne wyliczenie zapotrzebowania uwzględniające Twój tryb pracy, ilość kroków oraz częstotliwość treningów.
                        <br /><br />
                        <span className="text-xs italic opacity-70">* Wyliczenia są wartościami szacunkowymi. Dokładne zapotrzebowanie wyliczam indywidualnie podczas konsultacji.</span>
                        <br />
                        <span className="text-[10px] italic opacity-50">* Obliczenia oparte o wzór Mifflina-St Jeora.</span>
                    </p>
                </div>

                <div className="flex-1 bg-card rounded-2xl border shadow-xl w-full overflow-hidden border-white/5">
                    {/* Tabs */}
                    <div className="flex border-b border-white/5">
                        <button
                            onClick={() => { setMode("calories"); setError(null); }}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === "calories"
                                ? "bg-primary/10 text-primary border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-white/5"
                                }`}
                        >
                            Zapotrzebowanie Kaloryczne
                        </button>
                        <button
                            onClick={() => { setMode("bmi"); setError(null); }}
                            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${mode === "bmi"
                                ? "bg-primary/10 text-primary border-b-2 border-primary"
                                : "bg-transparent text-muted-foreground hover:bg-white/5"
                                }`}
                        >
                            Kalkulator BMI
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
                                            <label htmlFor="steps" className="text-sm font-bold uppercase text-muted-foreground">Średnia ilość kroków</label>
                                            <select
                                                id="steps"
                                                value={steps}
                                                onChange={(e) => setSteps(e.target.value as any)}
                                                className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            >
                                                <option value="under_5k">Poniżej 5 000</option>
                                                <option value="5k_8k">5 000 - 8 000</option>
                                                <option value="8k_10k">8 000 - 10 000</option>
                                                <option value="10k_12k">10 000 - 12 000</option>
                                                <option value="over_12k">Powyżej 12 000</option>
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
                                                <option value="0">Brak treningów</option>
                                                <option value="1">1 trening</option>
                                                <option value="2">2 treningi</option>
                                                <option value="3">3 treningi</option>
                                                <option value="4">4 treningi</option>
                                                <option value="5+">5 i więcej treningów</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                        ⚠️ {error}
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
                                            <div className="bg-primary/90 border-2 border-primary rounded-2xl p-6 text-center shadow-xl shadow-primary/20 relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="text-xs uppercase font-black text-white/70 tracking-[0.2em] mb-1">Utrzymanie (Zero)</div>
                                                <div className="flex items-baseline justify-center gap-1 mb-2">
                                                    <span className="text-4xl font-black text-white">{calories.goals.maintain.kcal}</span>
                                                    <span className="text-sm font-bold text-white/80 uppercase">kcal</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-[10px] text-white/80 mt-2 pt-2 border-t border-white/20">
                                                    <div>
                                                        <span className="block font-black opacity-60">Białko</span>
                                                        <span className="font-bold">{calories.goals.maintain.protein}g</span>
                                                    </div>
                                                    <div>
                                                        <span className="block font-black opacity-60">Tłuszcze</span>
                                                        <span className="font-bold">{calories.goals.maintain.fat}g</span>
                                                    </div>
                                                    <div>
                                                        <span className="block font-black opacity-60">Węgle</span>
                                                        <span className="font-bold">{calories.goals.maintain.carbs}g</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {/* Redukcja */}
                                                <div className="bg-card border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center relative overflow-hidden">
                                                    <div className="text-[10px] uppercase font-bold text-orange-500/80 tracking-widest mb-1">Redukcja</div>
                                                    <div className="flex items-baseline justify-center gap-0.5">
                                                        <span className="text-2xl font-black text-orange-500">{calories.goals.cut.kcal}</span>
                                                        <span className="text-[10px] font-bold text-orange-500/70 uppercase">kcal</span>
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter mb-2">-20% Deficyt</div>

                                                    <div className="grid grid-cols-3 gap-1 text-[9px] text-muted-foreground border-t border-white/5 pt-2">
                                                        <div><span className="block opacity-50">B</span>{calories.goals.cut.protein}g</div>
                                                        <div><span className="block opacity-50">T</span>{calories.goals.cut.fat}g</div>
                                                        <div><span className="block opacity-50">W</span>{calories.goals.cut.carbs}g</div>
                                                    </div>
                                                </div>

                                                {/* Masa */}
                                                <div className="bg-card border border-white/5 rounded-2xl p-4 text-center flex flex-col justify-center relative overflow-hidden">
                                                    <div className="text-[10px] uppercase font-bold text-green-500/80 tracking-widest mb-1">Masa</div>
                                                    <div className="flex items-baseline justify-center gap-0.5">
                                                        <span className="text-2xl font-black text-green-500">{calories.goals.bulk.kcal}</span>
                                                        <span className="text-[10px] font-bold text-green-500/70 uppercase">kcal</span>
                                                    </div>
                                                    <div className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter mb-2">+10% Nadwyżka</div>

                                                    <div className="grid grid-cols-3 gap-1 text-[9px] text-muted-foreground border-t border-white/5 pt-2">
                                                        <div><span className="block opacity-50">B</span>{calories.goals.bulk.protein}g</div>
                                                        <div><span className="block opacity-50">T</span>{calories.goals.bulk.fat}g</div>
                                                        <div><span className="block opacity-50">W</span>{calories.goals.bulk.carbs}g</div>
                                                    </div>
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
