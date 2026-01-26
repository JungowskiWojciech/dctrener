
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function About() {
    return (
        <section id="o-mnie" className="py-12 md:py-20 bg-background">
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
                            Nazywam się Dawid Chlewicki i od kilku lat aktywnie działam w branży fitness jako trener personalny. Praca z ludźmi oraz realne wpływanie na ich zdrowie, sylwetkę i samopoczucie to dla mnie coś więcej niż zawód – to świadomie wybrana droga rozwoju.
                        </p>
                        <p>
                            Swoje kompetencje budowałem poprzez praktyczne szkolenie w Global Sport Academy (GSA), a także liczne kursy, szkolenia i webinary. Posiadam międzynarodowy certyfikat REPs Polska, który staje się standardem dla profesjonalnych trenerów w Polsce.
                        </p>
                        <p className="font-semibold text-foreground mt-4">Jako trener personalny pomagam:</p>
                        <ul className="grid gap-2 mt-2 text-foreground font-medium">
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" /> Zbudować silne i zdrowe ciało
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" /> Zredukować tkankę tłuszczową lub zwiększyć masę
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" /> Poprawić kondycję i sprawność
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary shrink-0" /> Odzyskać pewność siebie
                            </li>
                        </ul>
                        <p className="mt-4">
                            Stawiam na indywidualne podejście. Każdy plan jest dopasowany do Twoich celów. Wierzę, że każdy trening to krok w stronę lepszej wersji siebie.
                        </p>
                        <div className="pt-4">
                            <Button variant="outline" asChild>
                                <Link href="/certyfikaty">Zobacz moje Certyfikaty</Link>
                            </Button>
                        </div>
                        <p className="font-bold text-primary text-xl mt-4">
                            Zmień nawyki. Zobacz różnicę.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
