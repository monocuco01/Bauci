import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-bauci.png'
// Ajusta estas rutas a donde tengas tus listas de datos
import { listaFotos } from '../data/fotos'
import { listaVideos } from '../data/videos'

const links = [
  { label: 'Fotos', to: '/fotos' },
  { label: 'Videos', to: '/videos' },
  { label: 'Ilustraciones', to: '/ilustraciones' },
  { label: 'Neocolombiano Tatú', to: '/neocolombiano-tatu' },
]

const more = [
  { label: 'La Ruta del Jaguar', to: '/ruta' },
  { label: 'Agradecimientos', to: '/agradecimientos' },
  { label: 'Términos y condiciones', to: '/terminos' },
  { label: 'Créditos', to: '/creditos' },
]

/* ---------- Buscador ---------- */

// Para sumar otra colección (por ejemplo ilustraciones) agrega una línea aquí
const fuentes = [
  { tipo: 'Foto', to: '/fotos', lista: listaFotos },
  { tipo: 'Video', to: '/videos', lista: listaVideos },
]

// Campos de cada elemento donde se busca
const CAMPOS = ['titulo', 'grupo', 'cultura', 'lugar', 'custodio', 'alt']

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const esPendiente = (v) => normalizar(v).includes('por confirmar')

// Se arma una sola vez: las listas repiten muestras, así que se quitan los títulos repetidos por tipo
const entradas = fuentes.flatMap(({ tipo, to, lista }) => {
  const vistos = new Set()
  return lista
    .filter((item) => {
      if (vistos.has(item.titulo)) return false
      vistos.add(item.titulo)
      return true
    })
    .map((item) => {
      const valores = CAMPOS.map((c) => item[c]).filter((v) => typeof v === 'string' && v && !esPendiente(v))
      const detalle = [...new Set([item.cultura, item.lugar, item.grupo])]
        .filter((v) => v && !esPendiente(v))
        .join(' · ')
      return {
        clave: `${tipo}-${item.id}`,
        tipo,
        to: `${to}?ver=${item.id}`,
        titulo: item.titulo,
        img: item.img,
        alt: item.alt || item.titulo,
        detalle,
        texto: normalizar(valores.join(' ')),
      }
    })
})

function buscar(consulta) {
  const terminos = normalizar(consulta).split(/\s+/).filter(Boolean)
  if (!terminos.length) return []
  return entradas.filter((e) => terminos.every((t) => e.texto.includes(t)))
}

/* ---------- Componente ---------- */

const iconoProps = {
  viewBox: '0 0 24 24',
  width: 22,
  height: 22,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const botonIcono =
  'grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#e0956f] bg-transparent text-[#ece4d2] hover:bg-[#e0956f] hover:text-[#080e0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0956f]'

export default function Nav() {
  const detailsRef = useRef(null)
  const inputRef = useRef(null)
  const botonBusquedaRef = useRef(null)
  const [abierta, setAbierta] = useState(false)
  const [consulta, setConsulta] = useState('')

  const resultados = buscar(consulta)

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open')
    }
  }

  const cerrarBusqueda = () => {
    setAbierta(false)
    setConsulta('')
  }

  const alternarBusqueda = () => {
    closeMenu()
    setAbierta((v) => !v)
  }

  useEffect(() => {
    if (!abierta) return
    inputRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setAbierta(false)
        setConsulta('')
        botonBusquedaRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierta])

  return (
    <nav
      aria-label="Principal"
      className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-[#080e0b]/95 px-6 py-3 text-[#ece4d2] backdrop-blur"
    >
      {/* El logo lleva al inicio "/" */}
      <Link to="/" aria-label="Bauci.co, inicio">
        <img src={logo} alt="Bauci.co" className="h-10 w-auto" />
      </Link>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-1 p-0 font-medium">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="hover:text-[#e0956f]">
                {l.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <details ref={detailsRef}>
              <summary className="cursor-pointer list-none hover:text-[#e0956f] [&::-webkit-details-marker]:hidden">
                Más ▾
              </summary>
              <div className="absolute right-0 top-full mt-3 grid min-w-60 gap-2 rounded-lg border border-[#e0956f] bg-[#080e0b] p-4">
                {more.map((l) => (
                  <Link key={l.label} to={l.to} onClick={closeMenu} className="hover:text-[#e0956f]">
                    {l.label}
                  </Link>
                ))}
              </div>
            </details>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            ref={botonBusquedaRef}
            type="button"
            onClick={alternarBusqueda}
            aria-label="Buscar"
            aria-expanded={abierta}
            aria-controls="panel-busqueda"
            className={botonIcono}
          >
            <svg {...iconoProps}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          {/* Sin funcionalidad por ahora */}
          <button type="button" aria-label="Iniciar sesión" className={botonIcono}>
            <svg {...iconoProps}>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Búsqueda y resultados */}
      {abierta && (
        <div
          id="panel-busqueda"
          className="absolute left-0 right-0 top-full max-h-[80vh] overflow-y-auto border-t border-[#e0956f] bg-[#080e0b] px-6 py-6 shadow-lg"
        >
          <div className="mx-auto max-w-5xl">
            <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
              <label htmlFor="busqueda-nav" className="sr-only">
                Buscar fotos y videos
              </label>
              <input
                ref={inputRef}
                id="busqueda-nav"
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar por título, cultura, lugar o grupo"
                autoComplete="off"
                className="w-full rounded-lg border border-[#e0956f] bg-transparent px-4 py-2.5 text-[1.05rem] text-[#ece4d2] placeholder:text-[#ece4d2]/50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#e0956f]"
              />
              <button
                type="button"
                onClick={cerrarBusqueda}
                aria-label="Cerrar búsqueda"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-[#ece4d2] text-xl font-bold text-[#17201b]"
              >
                ×
              </button>
            </form>

            <p className="mb-0 mt-4 text-[.95rem] text-[#a9ada0]" aria-live="polite">
              {!consulta.trim()
                ? 'Escribe para buscar, por ejemplo: Zenú, Sogamoso, tótem o Caribe.'
                : resultados.length
                  ? `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'}`
                  : `No hay resultados para “${consulta.trim()}”.`}
            </p>

            {resultados.length > 0 && (
              <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-3 lg:grid-cols-4">
                {resultados.map((r) => (
                  <li key={r.clave}>
                    <Link to={r.to} onClick={cerrarBusqueda} className="group block">
                      <img
                        src={r.img}
                        alt={r.alt}
                        loading="lazy"
                        className="aspect-square w-full rounded-[.2rem_1.2rem_.2rem_1.2rem] object-cover"
                      />
                      <span className="mt-2 block font-display text-[1.2rem] font-bold leading-tight group-hover:text-[#e0956f]">
                        {r.titulo}
                      </span>
                      <span className="block text-[.9rem] text-[#a9ada0]">
                        {r.tipo}
                        {r.detalle ? ` · ${r.detalle}` : ''}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}