import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Footer from './components/Footer'
import Videos from '../src/components/pages/Videos'
import Fotos from '../src/components/pages/Fotos'
import Ilustraciones from './components/pages/Ilustraciones'
import Ruta from './components/pages/Ruta'
import Agradecimientos from './components/pages/Agradecimientos'
import Terminos from './components/pages/Terminos'
import Creditos from './components/pages/Creditos'
import NeocolombianoTatu from './components/pages/NeocolombianoTatu'
import MarcaDeAgua from './components/MarcaDeAgua'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/fotos" element={<Fotos />} />
        <Route path="/ilustraciones" element={<Ilustraciones />} />
        <Route path="/ruta" element={<Ruta />} />
        <Route path="/agradecimientos" element={<Agradecimientos />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/creditos" element={<Creditos />} />
        <Route path="/neocolombiano-tatu" element={<NeocolombianoTatu />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}