
import { Dumbbell, Instagram, Facebook, Youtube, MapPin, Award } from "lucide-react"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="bg-muted py-12 text-muted-foreground">
            <div className="container grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 font-bold text-xl uppercase text-foreground">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-primary/20">
                            <Image src="/logo.jpg" alt="Logo" fill className="object-cover" sizes="32px" />
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
                        <a href="https://www.instagram.com/dc.trener/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform hover:scale-110" aria-label="Instagram"><Instagram className="h-8 w-8" /></a>
                        <a href="https://www.facebook.com/dc.trener/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform hover:scale-110" aria-label="Facebook"><Facebook className="h-8 w-8" /></a>
                        <a href="https://share.google/GGclUbRfXCVdDTYHU" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform hover:scale-110" aria-label="Google Maps"><MapPin className="h-8 w-8" /></a>
                        <a href="https://repspolska.pl/trener/Dawid-Chlewicki/REPS-TR-10010" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform hover:scale-110" aria-label="REPS Polska"><Award className="h-8 w-8" /></a>
                    </div>
                </div>
            </div>
            <div className="container mt-12 border-t border-border pt-8 text-center text-sm">
                &copy; {new Date().getFullYear()} DC Trener. Wszystkie prawa zastrzeżone.
            </div>
        </footer>
    )
}
