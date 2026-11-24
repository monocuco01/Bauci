import sogamoso from '../assets/sogamoso.jpg'

export default function About() {
  return (
    <section id="que-es" className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12">
        <blockquote className="m-0 border-l-4 border-[var(--accent)] pl-5 font-['Cormorant_Garamond'] text-[clamp(1.9rem,3.6vw,2.7rem)] font-bold leading-[1.15]">
          Fomentamos identidad por medio del entendimiento y el aprecio de la herencia cultural indígena,
          participando de su difusión y conservación para las futuras generaciones.
        </blockquote>

        <div>
          <h2 className="mb-5 font-['Cormorant_Garamond'] text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">
            ¿Qué es Bauci.co?
          </h2>
          <p className="mb-4 max-w-xl">
            Este repositorio audiovisual al que denominamos Bauci.co: “Banco Audiovisual de las Culturas
            Indígenas Colombianas – Pasado, Presente y Futuro”, construido a partir de la investigación-creación
            “La Ruta del Jaguar”, tiene como objetivo reconocer, catalogar y divulgar el patrimonio cultural
            gráfico de las culturas indígenas de Colombia.
          </p>
          <p className="max-w-xl">
            Este espacio digital resalta la riqueza visual y la diversidad de nuestras culturas indígenas,
            facilitando el acceso a imágenes, videos y otros recursos audiovisuales curados que celebran la
            historia y las tradiciones.
          </p>
        </div>
      </div>

      <div
        className="relative mt-8 aspect-video overflow-hidden rounded-[.4rem_2.4rem_.4rem_2.4rem] bg-[#0a120e]"
        role="img"
        aria-label="Espacio reservado para el video explicativo de Bauci.co"
      >
        <img src={sogamoso} alt="" className="block h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span className="grid h-[5.4rem] w-[5.4rem] place-items-center rounded-full bg-[#c0603c]">
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="#fff7ea" /></svg>
          </span>
        </div>
        <div className="absolute bottom-4 left-4 rounded bg-[#080e0b]/90 px-3 py-1 text-[.95rem] text-[#ece4d2]">
          Video explicativo · por agregar
        </div>
      </div>
    </section>
  )
}