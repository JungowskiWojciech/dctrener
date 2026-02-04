
import Image from "next/image"

export function Transformations() {
    // Transformations from user
    const transformations = [
        {
            id: 1,
            name: "Podopieczny 1",
            image: "/transformations/transformation-1.jpg",
            desc: "Budowa masy mięśniowej"
        },
        {
            id: 2,
            name: "Podopieczny 2",
            image: "/transformations/transformation-2.jpg",
            desc: "Rekompozycja - utrzymanie wagi"
        },
        {
            id: 3,
            name: "Podopieczny 3",
            image: "/transformations/transformation-3.jpg",
            desc: "Redukcja - Kompleksowa metamorfoza"
        }
    ]

    return (
        <section id="metamorfozy" className="py-12 md:py-20 bg-background">
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
                        <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 aspect-[3/4]">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-6 flex flex-col justify-end pointer-events-none">
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
