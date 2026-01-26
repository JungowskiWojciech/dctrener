
import { Dumbbell, Instagram, Facebook, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-muted py-12 text-muted-foreground">
            <div className="container grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xl uppercase text-foreground">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-primary/20">
                            <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
                        </div>
                        <span>DC <span className="text-primary">Trener</span></span>
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
                        <li><a href="#metamorfozy" className="hover:text-primary">Metamorfozy</a></li>
                        <li><a href="#opinie" className="hover:text-primary">Opinie</a></li>
                        <li><a href="#kontakt" className="hover:text-primary">Kontakt</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Social Media</h3>
                    <div className="flex space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Instagram className="h-5 w-5" /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Facebook className="h-5 w-5" /></a>
                        {/* Google Icon placeholder using Globe for now or just text/link */}
                        <a href="https://share.google/lRVf8TcUTxHpj8iCf" target="_blank" rel="noopener noreferrer" className="hover:text-primary font-bold text-sm flex items-center">G</a>
                        <a href="https://repspolska.pl" target="_blank" rel="noopener noreferrer" className="hover:text-primary text-xs border border-current px-1 rounded">REPS</a>
                    </div>
                </div>
            </div>
            <div className="container mt-12 border-t border-border pt-8 text-center text-sm">
                &copy; {new Date().getFullYear()} TrenerX. Wszystkie prawa zastrzeżone.
            </div>
        </footer>
    )
}
