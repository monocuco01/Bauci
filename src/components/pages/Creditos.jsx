import { useState } from 'react'

import medallon from '../../assets/medallon.png'

const CITA =
  '“[Fotografía / Ilustración / Video] por [Nombre del Autor] – Archivo Bauci.co / Investigación La Ruta del Jaguar (Fundación Corazones de Tinta).”'

const creditos = [
  { rol: 'Ilustraciones', nombres: ['Gustavo Paternina'] },
  { rol: 'Textos', nombres: ['Carolina Algarín', 'Diana Rueda Delgado'] },
  { rol: 'Producción audiovisual', nombres: ['Juan Manuel Aristizábal', 'Rubén Yepes'] },
  {
    rol: 'Fotos y videos de apoyo',
    nombres: ['Rubén Yepes', 'Carolina Algarín', 'Gustavo Paternina', 'Mario Gómez', 'Juan Manuel Aristizábal'],
  },
  { rol: 'Diseño web UX-UI', nombres: ['Andrés Nicholls', 'Hector Solano'] },
]

export default function Creditos() {
  const [copiada, setCopiada] = useState(false)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(CITA)
      setCopiada(true)
      setTimeout(() => setCopiada(false), 2000)
    } catch {
      setCopiada(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[.9]">Créditos Audiovisuales</h1>
      <p className="mt-7 max-w-[40rem] font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15]">
        Atribución, créditos y citación del material alojado en Bauci.co.
      </p>

      {/* Atribución */}
      <section className="mt-16">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-none">
          Atribución, créditos y citación
        </h2>
        <div className="mt-6 grid max-w-[46rem] gap-4">
          <p className="m-0">
            Todo el material audiovisual (fotografías, ilustraciones, videos y diseños) alojado en Bauci.co es
            resultado de la investigación-creación “La Ruta del Jaguar”, realizada por el equipo de la Fundación
            Corazones de Tinta. Para fomentar el respeto por la propiedad intelectual y la divulgación ética del
            patrimonio cultural, cualquier uso autorizado de este material exige incluir los créditos correspondientes.
          </p>
          <p className="m-0">
            Queda estrictamente prohibido eliminar marcas de agua, recortar firmas o alterar los metadatos de derechos
            de autor incluidos en los archivos originales descargados de Bauci.co.
          </p>
          <p className="m-0 border-t-2 border-[color:var(--ink)] pt-4 font-bold">
            Derechos: © Bauci.co / Fundación Corazones de Tinta. Todos los derechos reservados.
          </p>
        </div>
      </section>

      {/* Cita */}
      <section className="mt-16">
        <div className="relative rounded-[.4rem_2.4rem_.4rem_2.4rem] bg-[var(--panel)] p-7 md:p-10">
          <img
            src={medallon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-5 hidden w-32 opacity-80 mix-blend-multiply md:block lg:w-40"
          />

          <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-none md:pr-44">
            Texto recomendado para citar este recurso
          </h2>
          <blockquote className="m-0 mt-5 max-w-[46rem] border-l-4 border-[color:var(--accent)] pl-5 font-display text-[clamp(1.4rem,2.8vw,1.9rem)] font-bold leading-[1.25]">
            {CITA}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={copiar}
              className="cursor-pointer rounded border-0 bg-[var(--ink)] px-4 py-2 text-[.95rem] font-bold text-[color:var(--bg)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
            >
              Copiar cita
            </button>
            <span className="text-[.95rem] text-[color:var(--muted)]" aria-live="polite">
              {copiada ? 'Copiada al portapapeles' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="mt-16">
        <h2 className="mb-8 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-none">
          Créditos generales del equipo
        </h2>
        <dl className="m-0">
          {creditos.map((c) => (
            <div
              key={c.rol}
              className="grid gap-2 border-t-2 border-[color:var(--ink)] py-6 md:grid-cols-[15rem_1fr] md:gap-8"
            >
              <dt className="text-[1.1rem] text-[color:var(--muted)]">{c.rol}</dt>
              <dd className="m-0 flex flex-wrap gap-x-8 gap-y-1">
                {c.nombres.map((nombre) => (
                  <span
                    key={nombre}
                    className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05]"
                  >
                    {nombre}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}