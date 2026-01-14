
import Image from "next/image"

export function Transformations() {
    // Placeholders from Unsplash (Gym/Fitness context)
    const transformations = [
        {
            id: 1,
            name: "Michał, -15kg",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop",
            desc: "Redukcja tkanki tłuszczowej w 6 miesięcy."
        },
        {
            id: 2,
            name: "Anna, Budowa siły",
            image: "https://images.unsplash.com/photo-1549476464-d649327564d8?q=80&w=2669&auto=format&fit=crop",
            desc: "Poprawa sylwetki i pewności siebie."
        },
        {
            id: 3,
            name: "Tomek, Masa mięśniowa",
            image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2670&auto=format&fit=crop",
            desc: "+8kg czystej masy mięśniowej."
        }
    ]

    return (
        <section id="metamorfozy" className="py-20 md:py-28 bg-background">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                        Realne <span className="text-primary">Efekty</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Historie moich podopiecznych mówią same za siebie. Zobacz, co możemy osiągnąć razem.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {transformations.map((item) => (
                        <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-muted aspect-[4/5]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                <p className="text-gray-300 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
