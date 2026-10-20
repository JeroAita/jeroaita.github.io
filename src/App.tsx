import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Engineering from './sections/Engineering'
import Methodology from './sections/Methodology'
import Portfolio from './sections/Portfolio'
import Photography from './sections/Photography'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Engineering />
        <Methodology />
        <Portfolio />
        <Photography />
      </main>
      <Footer />
    </>
  )
}
