import Hero from '@/components/Hero'
import Showcase from '@/components/Showcase'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Showcase />
      <Services />
      <About />
      <Contact />
    </main>
  )
}
