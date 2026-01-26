
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
// Programs removed per user request
import { Transformations } from "@/components/sections/Transformations"
import { Contact } from "@/components/sections/Contact"
import { FAQ } from "@/components/sections/FAQ"
import { Calculator } from "@/components/sections/Calculator"
import { Certificates } from "@/components/sections/Certificates"
import { Reviews } from "@/components/sections/Reviews"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Calculator />
      <Transformations />
      <Reviews />
      <FAQ />
      <Contact />
    </div>
  )
}
