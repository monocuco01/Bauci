import logos from '../assets/logos-footer.png'

export default function Footer() {
  return (
    <footer className="bg-[#080e0b] px-6 py-14 text-[.95rem] text-[#cfc8b6]">
      <img
        src={logos}
        alt="Ministerio de las Culturas, INKdustry.co, Fundación Corazones de Tinta, La Ruta del Jaguar y Neocolombiano Tatú"
        className="mx-auto mb-10 block h-auto w-[min(100%,62rem)]"
      />
      <div className="mx-auto grid max-w-6xl gap-3">
        <p className="m-0 max-w-[60rem]">
          Proyecto apoyado por el Ministerio de Cultura. Programa Nacional de Concertación Cultural 2024 y 2026.
        </p>
        <p className="m-0 max-w-[60rem]">
          ®Bauci.co son legítimos titulares de derechos de autor sobre las fotografías, videos, ilustraciones y diseños de tatuajes.
        </p>
        <p className="m-0 max-w-[60rem]">
          La Fundación Corazones de Tinta y Bauci.co reconocemos el rol (créditos) como custodios de todos los objetos
          culturales registrados a los museos, bibliotecas, parques y zonas arqueológicas, y universidades, que hacen
          parte de la Investigación La Ruta del Jaguar.
        </p>
        <p className="m-0 max-w-[60rem]">
          Bauci.co no se atribuye ningún derecho sobre los objetos culturales representados.
        </p>
        <p className="m-0 max-w-[60rem]">
          © 2026 Fundación Corazones de Tinta GP · Maqueta de rediseño
        </p>
      </div>
    </footer>
  )
}