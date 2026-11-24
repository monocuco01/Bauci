import Hero from './Hero'
import About from './About'
import Explora from './Explora'
import Mapa from './Mapa'
import Puertas from './Puertas'

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Explora />
        <Mapa />
        <Puertas />
      </main>
    </>
  )
}