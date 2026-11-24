import { useState } from 'react'

const datos = [
  ['Museo de Oro Zenú', 'Cartagena, Bolívar', 'Museos', 'https://www.banrepcultural.org/cartagena/museo-del-oro-zenu'],
  ['Museo Etnográfico Miguel Ángel Builes', 'Medellín, Antioquia', 'Museos', 'https://www.instagram.com/museo_mab'],
  ['Museo Comunitario San Jacinto', 'San Jacinto, Bolívar', 'Museos', 'https://www.museocomunitariosanjacinto.com/'],
  ['Fundación Museo Arqueológico Aburrá', 'Medellín, Antioquia', 'Museos', 'https://www.instagram.com/fundacionaburra/'],
  ['Museo Arqueológico Tierras De Xixaraca', 'Quinchía, Risaralda', 'Museos', 'https://www.instagram.com/museotierrasdexixaraca/'],
  ['Museo Del Oro Quimbaya', 'Armenia, Quindío', 'Museos', 'https://www.banrepcultural.org/armenia'],
  ['Museo Del Oro Calima', 'Cali, Valle del Cauca', 'Museos', 'https://www.banrepcultural.org/cali/museo-del-oro-calima'],
  ['Parque Natural Piedras Marcadas', 'Dosquebradas, Risaralda', 'Parques', null],
  ['Parque Arqueológico San Agustín', 'San Agustín, Huila', 'Parques', 'https://www.icanh.gov.co/parques-icanh/parque-arqueologico-san-agustin'],
  ['Parque Arqueológico Alto De Los Ídolos Y Alto De Las Piedras', 'San Agustín, Huila', 'Parques', 'https://www.museonacional.gov.co/sitio/el_silencio_de_los_idolos/parques.html'],
  ['Museo del Oro Nariño', 'Pasto, Nariño', 'Museos', 'https://www.banrepcultural.org/pasto/museo-del-oro-nari%C3%B1o'],
  ['Parque Nacional Arqueológico Tierradentro', 'Inzá, Cauca', 'Parques', 'https://www.icanh.gov.co/parques-icanh/parque-arqueologico-tierradentro'],
  ['Museo Arqueológico Regional Del Huila', 'Neiva, Huila', 'Museos', 'https://huilamagnifica.com/museo-arqueologico-regional-neiva/'],
  ['Museo Del Oro - Bogotá', 'Bogotá, Cundinamarca', 'Museos', 'https://www.banrepcultural.org/bogota/museo-del-oro'],
  ['Biblioteca Luis Ángel Arango', 'Bogotá, Cundinamarca', 'Bibliotecas', 'https://www.banrepcultural.org/bogota/biblioteca-luis-angel-arango'],
  ['Museo Arqueológico Guayupe', 'Puerto Santander, Meta', 'Museos', 'https://www.facebook.com/MuseoGuayupe/'],
  ['Museo Nacional de Colombia', 'Bogotá, Cundinamarca', 'Museos', 'https://www.museonacional.gov.co'],
  ['Museo Arqueológico De Zipaquirá', 'Zipaquirá, Cundinamarca', 'Museos', 'https://museoarqueologi.co/'],
  ['Museo Arqueológico De Sogamoso Eliécer Silva Celis', 'Sogamoso, Boyacá', 'Museos', 'https://www.uptc.edu.co/sitio/portal/sitios/universidad/vic_inv_ext/ext_univ/unidades/redmuseos/muarsoga/'],
  ['Museo Arqueológico Y Antropológico Guane', 'San Gil, Santander', 'Museos', 'https://www.casadeculturapiedradelsol.gov.co/museo-guane/'],
  ['Museo Guane - Parque Nacional del Chicamocha', 'Aratoca, Santander', 'Museos', 'https://parquesdesantander.com/atracciones/museo-guane/'],
  ['Museo del Oro Tayrona', 'Santa Marta, Magdalena', 'Museos', 'https://www.banrepcultural.org/santa-marta/museo-del-oro-tairona'],
  ['Museo Arqueológico De Galapa Muga', 'Galapa, Atlántico', 'Museos', 'https://museogalapa.com/'],
  ['Museo Mapuka - Universidad del Norte', 'Barranquilla, Atlántico', 'Museos', 'https://www.uninorte.edu.co/web/centro-cultural-cayena/museo'],
  ['Museo Etnográfico De Leticia', 'Leticia, Amazonas', 'Museos', 'https://www.banrepcultural.org/leticia/museo-etnografico'],
  ['Museo Arqueológico MUSA', 'Bogotá, Cundinamarca', 'Museos', 'https://musa.com.co/'],
  ['Parque Nacional Natural Serranía de Chiribiquete', 'Guaviare y Caquetá', 'Parques', 'https://old.parquesnacionales.gov.co/portal/es/parques-nacionales/parque-nacional-natural-chiribiquete/'],
]

const aliados = datos.map(([nombre, lugar, tipo, href]) => ({ nombre, lugar, tipo, href }))
const tipos = ['Todos', ...new Set(aliados.map((a) => a.tipo))]

const dominio = (url) => new URL(url).hostname.replace(/^www\./, '')

export default function Agradecimientos() {
  const [tipo, setTipo] = useState('Todos')
  const visibles = tipo === 'Todos' ? aliados : aliados.filter((a) => a.tipo === tipo)

  return (
    <main className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[.9]">Agradecimientos</h1>

      <p className="mt-7 max-w-[44rem] font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15]">
        A nuestros aliados en este camino investigativo: museos, parques y zonas arqueológicas, entidades,
        bibliotecas, universidades y personas en toda Colombia: ¡toda nuestra gratitud!
      </p>

      <div className="mt-8 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-10">
        <p className="m-0">
          Gracias infinitas por todo el apoyo en esta aventura, una búsqueda de nuestro patrimonio e identidad;
          además, nuestra admiración a estas entidades por ser custodios de nuestro patrimonio cultural indígena
          desde su ardua labor; exaltamos su ejercicio de visibilizar, proteger y educar para conectar y reconocer
          nuestra raíz como colombianos.
        </p>
        <p className="m-0">
          Gracias por hacer parte de <b className="text-[color:var(--accent)]">#LaRutaDelJaguar</b>, un recorrido en
          búsqueda de nuestras raíces.
        </p>
      </div>

      <div className="mb-3 mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {tipos.map((t) => (
            <li key={t}>
              <button
                type="button"
                aria-pressed={t === tipo}
                onClick={() => setTipo(t)}
                className={`cursor-pointer rounded border-[1.5px] px-3.5 py-1.5 text-[.95rem] font-medium ${
                  t === tipo
                    ? 'border-[color:var(--accent)] bg-[var(--accent)] text-[#fff7ea]'
                    : 'border-[color:var(--line)] bg-transparent text-[color:var(--ink)]'
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
        <span className="text-[.95rem] text-[color:var(--muted)]" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? 'aliado' : 'aliados'}
        </span>
      </div>

      <ul className="m-0 list-none border-t-2 border-[color:var(--ink)] p-0">
        {visibles.map((a) => (
          <li
            key={a.nombre}
            className="grid items-baseline gap-x-8 gap-y-1 border-b border-[color:var(--line)] py-5 md:grid-cols-[minmax(0,1fr)_15rem_11rem]"
          >
            <b className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.05]">{a.nombre}</b>
            <span className="text-[color:var(--muted)]">{a.lugar}</span>
            {a.href ? (
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[.95rem] font-bold text-[color:var(--accent)] underline-offset-4 hover:underline md:justify-end"
              >
                {dominio(a.href)}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                <span className="sr-only">(abre en una pestaña nueva)</span>
              </a>
            ) : (
              <span className="text-[.95rem] text-[color:var(--muted)] md:text-right">Sin enlace disponible</span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}