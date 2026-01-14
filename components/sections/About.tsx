
import Image from "next/image"

export function About() {
    return (
        <section id="o-mnie" className="py-20 md:py-28 bg-background">
            <div className="container grid gap-12 md:grid-cols-2 items-center">
                {/* Placeholder Image */}
                <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-2xl skew-y-1">
                    <Image
                        src="/uploaded_image_1_1768416073171.jpg" // Using new batch image
                        alt="Trener personalny"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
                        Więcej niż <span className="text-primary">Trener</span>
                    </h2>
                    <div className="space-y-4 text-muted-foreground text-lg">
                        <p>
                            Cześć, tu [Twoje Imię]. Od 5 lat pomagam zapracowanym osobom odzyskać energię i zbudować sportową sylwetkę.
                        </p>
                        <p>
                            Moje podejście opiera się na nauce, a nie mitach. Nie wierzę w diety "cud" ani katorżnicze treningi, które niszczą zdrowie.
                            Stawiam na zrównoważony rozwój, technikę i dopasowanie planu do Twojego stylu życia.
                        </p>
                        <ul className="grid gap-2 mt-4 text-foreground font-medium">
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" /> Certyfikowany Trener Personalny
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" /> Specjalista ds. Żywienia
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" /> Setki zadowolonych podopiecznych
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
