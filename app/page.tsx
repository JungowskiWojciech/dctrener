
import dynamic from "next/dynamic"

// Static imports (Above the fold)
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"

// Dynamic imports (Below the fold)
const Transformations = dynamic(() => import("@/components/sections/Transformations").then(mod => mod.Transformations))
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact))
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ))
const Calculator = dynamic(() => import("@/components/sections/Calculator").then(mod => mod.Calculator))
const Certificates = dynamic(() => import("@/components/sections/Certificates").then(mod => mod.Certificates))
const Reviews = dynamic(() => import("@/components/sections/Reviews").then(mod => mod.Reviews))

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
