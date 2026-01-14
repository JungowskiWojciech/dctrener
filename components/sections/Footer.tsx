
import { Dumbbell, Instagram, Facebook, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-muted py-12 text-muted-foreground">
            <div className="container grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xl uppercase text-foreground">
                        <Dumbbell className="h-6 w-6 text-primary" />
                        <span>Trener<span className="text-primary">X</span></span>
                    </div>
                    <p className="text-sm">
                        Pomagam osiągnąć wymarzoną sylwetkę bez zbędnych restrykcji.
                        Dołącz do grona zadowolonych podopiecznych.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Nawigacja</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#o-mnie" className="hover:text-primary">O mnie</a></li>
                        <li><a href="#programy" className="hover:text-primary">Oferta</a></li>
                        <li><a href="#metamorfozy" className="hover:text-primary">Metamorfozy</a></li>
                        <li><a href="#kontakt" className="hover:text-primary">Kontakt</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Socialomedia</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
                        <a href="#" className="hover:text-primary"><Youtube className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
            <div className="container mt-12 border-t border-border pt-8 text-center text-sm">
                &copy; {new Date().getFullYear()} TrenerX. Wszystkie prawa zastrzeżone.
            </div>
        </footer>
    )
}
