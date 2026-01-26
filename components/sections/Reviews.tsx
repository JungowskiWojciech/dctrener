"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function Reviews() {
    const reviews = [
        {
            name: "Marco",
            rating: 5,
            text: "Współpracuję z Dawidem od kilku miesięcy: poprawiona technika, brak bólu kręgosłupa po treningach siłowych, wzrost siły i poprawa sylwetki. Żałuję, że wcześniej nie zacząłem korzystać z usług trenera. Zdecydowanie warto zacząć treningi od instrukcji trenera, żeby uniknąć błędów i złych nawyków. Polecam, jestem bardzo zadowolony."
        },
        {
            name: "Ewa Gajewska",
            rating: 5,
            text: "Dawid to bardzo profesjonalny trener personalny, a treningi odbywają się w przyjaznej atmosferze 😄 Uważnie nadzoruje każde ćwiczenie i pilnuje prawidłowej techniki, dzięki czemu trening jest bezpieczny i skuteczny. Motywuje, systematycznie zwiększa obciążenia i realnie dba o rozwój — czuć, że forma rośnie z treningu na trening. Po kilku tygodniach czuję się wyraźnie silniejsza, mam więcej energii i lepsze samopoczucie. Polecam każdemu, kto chce trenować mądrze, bezpiecznie i z efektami 💪"
        },
        {
            name: "Agnieszka Staroń-Popko",
            rating: 5,
            text: "Nigdy nie lubiłam ćwiczyć. Zawsze to było jak za karę. Natomiast po dwóch ciążach poczułam, że czas się ruszyć z miejsca💪 Na Dawida trafiłam z polecenia i nie żałuję 🙂 Jest to trener profesjonalny, z dużą wiedzą i zaangażowaniem w postęp podopiecznego. Nie obiecuje złotych gór - tłumaczy, jak osiągnąć swoje małe sukcesy w sylwetce w równowadze ze zdrowiem. Umie słuchać, kibicuje i motywuje na każdym treningu oraz dopasowuje plan działania całkowicie indywidualnie z uwzględnieniem możliwości podopiecznego. I najważniejsze - po treningach z nim widać realne efekty - a to motywuje jeszcze bardziej do działania 🏋️‍♀️ Bardzo polecam😊"
        },
        {
            name: "Adrianna",
            rating: 5,
            text: "Od dwóch miesięcy razem z chłopakiem chodzimy do Dawida na treningi w parze. To nasza pierwsza styczność z siłownią, nie wiedzieliśmy czego się spodziewać. Trafiliśmy świetnie! Dawid pokazuje wszystko od podstaw, przez cały czas jest skupiony i zaangażowany. Pilnuje wszystkich ćwiczeń i daje wskazówki, a przy tym motywuje. Bardzo polecam współpracę :)"
        }
    ]

    return (
        <section id="opinie" className="py-20 bg-neutral-950">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                        Opinie <span className="text-primary">Klientów</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Zobacz co mówią osoby, które mi zaufały.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-black border border-neutral-800 p-8 rounded-2xl hover:border-primary/30 transition-colors"
                        >
                            <div className="flex gap-1 mb-4 text-primary">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                "{review.text}"
                            </p>
                            <div className="font-bold text-white uppercase tracking-wide text-sm">
                                {review.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
