import { useState } from 'react'

const fases = [
  { f: 'Fase 1', t: 'Un recorrido por Colombia prehispánica' },
  { f: 'Fase 2', t: 'El cuento de la región Caribe' },
  { f: 'Fase 3', t: 'El gran Amazonas' },
  { f: 'Fase 4', t: 'Nuevos espacios' },
]

const proyectos = [
  { a: '2023', t: 'La Ruta del Jaguar, el documental' },
  { a: '2024', t: 'Banco Audiovisual de Culturas Indígenas Colombianas' },
  { a: '2026', t: 'Estrategia de Contenidos Digitales Bauci.Co II: plataforma para la documentación y divulgación del patrimonio' },
]

// cantidad = integrantes de ese año; nombres = los que ya tienes (con foto opcional: { nombre, foto })
const equipo = [
  { a: '2020', cantidad: 3, nombres: [] },
  { a: '2021', cantidad: 5, nombres: [] },
  { a: '2022', cantidad: 4, nombres: [] },
  { a: '2023', cantidad: 5, nombres: [] },
  { a: '2024', cantidad: 5, nombres: [] },
  { a: '2025', cantidad: 4, nombres: [] },
  {
    a: '2026',
    cantidad: 7,
    nombres: [
      { nombre: 'Carolina Algarín' },
      { nombre: 'Diana Rueda' },
      { nombre: 'Cesar Viana' },
      { nombre: 'Gustavo Paternina' },
      { nombre: 'Juan Manuel Aristizábal' },
      { nombre: 'Andres Nichols' },
      { nombre: 'Hector Solano' },
    ],
  },
]

const iniciales = (nombre) =>
  nombre.split(' ').slice(0, 2).map((p) => p[0]).join('')

export default function Ruta() {
  const [fase, setFase] = useState(0)
  const [anio, setAnio] = useState('2026')

  const grupo = equipo.find((e) => e.a === anio)
  const miembros = grupo.nombres.length ? grupo.nombres : Array.from({ length: grupo.cantidad }, () => null)

  const caribe = fase === 1
  const amazonas = fase === 2
  const trazoActivo = fase === 0
  const tenue = (activo) => (fase === 0 || activo ? 1 : 0.35)

  return (
    <main>
      {/* Presentación */}
      <section className="mx-auto max-w-6xl px-6 py-[4.5rem]">
        <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[.9]">La Ruta del Jaguar</h1>
        <p className="mt-7 max-w-[40rem] font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15]">
          Proyecto paraguas de investigación-creación sobre el patrimonio y la identidad colombiana, desde su
          expresión gráfica nativa. Un recorrido por nuestro patrimonio indígena.
        </p>
        <p className="mt-6 max-w-[40rem]">
          Este proyecto de investigación-creación nace del deseo común de exaltar las raíces culturales de nuestro
          país, con la idea de crear un mensaje que deje huella y espacios que inicien una conversación sobre el
          patrimonio cultural indígena.
        </p>
      </section>

      {/* Fases + mapa */}
      <section className="bg-[#0c1512] text-[#ece4d2]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-[4.5rem] md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
          <svg
            viewBox="0 0 400 460"
            role="img"
            aria-label="Mapa de Colombia con el recorrido de la ruta del Caribe a la Amazonía"
            className="mx-auto block w-full max-w-[26rem]"
          >
            <path
              d="M92,70 L130,40 L175,45 L215,28 L260,20 L300,10 L318,40 L290,75 L330,110 L372,150 L378,215 L350,255 L372,300 L338,345 L330,440 L305,420 L268,400 L215,395 L190,370 L150,345 L110,350 L100,300 L75,255 L88,200 L70,150 L95,110Z"
              fill="#2b4a3c" stroke="#8a8379" strokeWidth="1.5" strokeLinejoin="round"
            />
            <path
              className="ruta-trazo"
              pathLength="1"
              d="M150,62 C130,100 150,130 140,160 S130,270 160,300 S240,340 268,352"
              fill="none"
              stroke="#e0956f"
              strokeWidth={trazoActivo ? 5 : 3}
              strokeLinecap="round"
              style={{ opacity: trazoActivo ? 1 : 0.35, transition: 'opacity .3s, stroke-width .3s' }}
            />
            <g style={{ opacity: tenue(caribe), transition: 'opacity .3s' }}>
              <circle cx="150" cy="62" r={caribe ? 13 : 8} fill="#e0956f" stroke="#0c1512" strokeWidth="3" />
              <text x="168" y="70" fill="#ece4d2" fontSize="15" className="font-body">Caribe</text>
            </g>
            <g style={{ opacity: tenue(amazonas), transition: 'opacity .3s' }}>
              <circle cx="268" cy="352" r={amazonas ? 13 : 8} fill="#e0956f" stroke="#0c1512" strokeWidth="3" />
              <text x="250" y="358" fill="#ece4d2" fontSize="15" textAnchor="end" className="font-body">Amazonía</text>
            </g>
          </svg>

          <div>
            <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">Cuatro fases</h2>
            <p className="mb-7 mt-3 max-w-[30rem] text-[#a9ada0]">
              Para la fase de investigación y captación de datos y registros, se han realizado 4 fases. Toca una
              para verla en el mapa.
            </p>
            <ol className="m-0 grid list-none gap-1 p-0">
              {fases.map((x, i) => (
                <li key={x.f}>
                  <button
                    type="button"
                    onClick={() => setFase(i)}
                    aria-pressed={fase === i}
                    className={`block w-full cursor-pointer border-0 border-l-[3px] px-5 py-3 text-left text-[#ece4d2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#e0956f] ${
                      fase === i ? 'border-[#e0956f] bg-[#16231d]' : 'border-[#8a8379]/50 bg-transparent hover:bg-[#16231d]'
                    }`}
                  >
                    <span className="block text-[.95rem] text-[#a9ada0]">{x.f}</span>
                    <b className="block font-display text-[1.7rem] font-bold leading-[1.05]">{x.t}</b>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="mx-auto max-w-6xl px-6 py-[4.5rem]">
        <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">Proyectos</h2>
        <p className="mb-9 mt-3 max-w-[38rem] text-[color:var(--muted)]">
          Dentro de La Ruta del Jaguar hemos realizado varios proyectos de creación.
        </p>
        <ol className="m-0 list-none p-0">
          {proyectos.map((p) => (
            <li
              key={p.a}
              className="grid items-baseline gap-2 border-t-2 border-[color:var(--ink)] py-6 md:grid-cols-[11rem_1fr] md:gap-8"
            >
              <span className="font-display text-[clamp(2.6rem,6vw,4.2rem)] font-bold leading-none">{p.a}</span>
              <b className="max-w-[40rem] font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.1]">{p.t}</b>
            </li>
          ))}
        </ol>
      </section>

      {/* Equipo */}
      <section className="mx-auto max-w-6xl px-6 pb-[5rem]">
        <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">El equipo de trabajo</h2>
        <div className="mt-6 grid max-w-[44rem] gap-4">
          <p className="m-0">
            La idea de La Ruta del Jaguar nació en el año 2020. La pausa que nos dio la pandemia nos hizo reflexionar
            sobre las personas que somos, sobre la sociedad de la que hacemos parte y sobre los elementos que nos han
            llevado a estar en el lugar en el que estamos.
          </p>
          <p className="m-0">
            Fue allí cuando volvimos a ver una parte de nuestra identidad a la que no escuchamos a menudo: nuestra
            parte indígena. Y con ello nació La Ruta del Jaguar.
          </p>
          <p className="m-0">
            La Ruta nació en un momento específico, y el esfuerzo de los miembros del equipo la ha mantenido activa
            con el tiempo. Estos son los miembros del equipo a lo largo de los años:
          </p>
        </div>

        <ul className="m-0 mb-8 mt-8 flex list-none flex-wrap gap-2 p-0">
          {equipo.map((e) => (
            <li key={e.a}>
              <button
                type="button"
                aria-pressed={anio === e.a}
                onClick={() => setAnio(e.a)}
                className={`cursor-pointer rounded border-[1.5px] px-3.5 py-1.5 text-[.95rem] font-medium ${
                  anio === e.a
                    ? 'border-[color:var(--accent)] bg-[var(--accent)] text-[#fff7ea]'
                    : 'border-[color:var(--line)] bg-transparent text-[color:var(--ink)]'
                }`}
              >
                {e.a}
              </button>
            </li>
          ))}
        </ul>

        <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 md:grid-cols-4">
          {miembros.map((m, i) => (
            <li
              key={`${anio}-${i}`}
              className={`relative grid aspect-[4/5] place-items-center overflow-hidden bg-[var(--land)] text-[#f3ecdc] ${
                i % 2 ? 'rounded-[2rem_.4rem_2rem_.4rem]' : 'rounded-[.4rem_2rem_.4rem_2rem]'
              }`}
            >
              {m?.foto ? (
                <img src={m.foto} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <span className="font-display text-[3.2rem] font-bold leading-none opacity-80">
                  {m ? iniciales(m.nombre) : ''}
                </span>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_55%,rgba(8,14,11,.85))]" />
              <span className="absolute inset-x-4 bottom-3 font-display text-[1.3rem] font-bold leading-[1.05]">
                {m ? m.nombre : 'Nombre por agregar'}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-[44rem] border-t-2 border-[color:var(--ink)] pt-5">
          El apoyo de producción de La Ruta del Jaguar va por cuenta de INKdustry Colombia SAS, gestora de proyectos
          culturales y artísticos.
        </p>
      </section>
    </main>
  )
}