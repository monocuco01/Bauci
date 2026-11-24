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

/* ---------- Íconos y estilos ---------- */

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

const IconoBuscar = () => (
  <svg {...iconoProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
)

const IconoUsuario = () => (
  <svg {...iconoProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
)

const focoBase =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0956f]'

const botonIcono = `grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#e0956f] bg-transparent text-[#ece4d2] hover:bg-[#e0956f] hover:text-[#080e0b] ${focoBase}`

const botonMovil = `flex cursor-pointer items-center gap-3 rounded-lg border border-[#e0956f] bg-transparent px-4 py-2.5 text-left font-medium text-[#ece4d2] hover:bg-[#e0956f] hover:text-[#080e0b] ${focoBase}`

/* ---------- Componente ---------- */

export default function Nav() {
  const detailsRef = useRef(null)
  const inputRef = useRef(null)
  const botonBusquedaRef = useRef(null)
  const [abierta, setAbierta] = useState(false) // panel de búsqueda
  const [menuAbierto, setMenuAbierto] = useState(false) // menú móvil
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

  const abrirBusqueda = () => {
    closeMenu()
    setMenuAbierto(false)
    setAbierta(true)
  }

  const alternarBusqueda = () => {
    if (abierta) cerrarBusqueda()
    else abrirBusqueda()
  }

  const alternarMenuMovil = () => {
    cerrarBusqueda()
    setMenuAbierto((v) => !v)
  }

  useEffect(() => {
    if (abierta) inputRef.current?.focus()
  }, [abierta])

  useEffect(() => {
    if (!abierta && !menuAbierto) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (abierta) {
        cerrarBusqueda()
        botonBusquedaRef.current?.focus()
      }
      setMenuAbierto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierta, menuAbierto])

  return (
    <nav
      aria-label="Principal"
      className="sticky top-0 z-20 bg-[#080e0b]/95 px-6 py-3 text-[#ece4d2] backdrop-blur"
    >
      <div className="flex items-center justify-between gap-6">
        {/* El logo lleva al inicio "/" */}
        <Link to="/" aria-label="Bauci.co, inicio" onClick={() => setMenuAbierto(false)}>
          <img src={logo} alt="Bauci.co" className="h-10 w-auto" />
        </Link>

        {/* Escritorio */}
        <div className="hidden items-center gap-x-6 lg:flex">
          <ul className="m-0 flex list-none items-center gap-x-6 p-0 font-medium">
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
              <IconoBuscar />
            </button>

            {/* Sin funcionalidad por ahora */}
            <button type="button" aria-label="Iniciar sesión" className={botonIcono}>
              <IconoUsuario />
            </button>
          </div>
        </div>

        {/* Botón del menú en móvil y tablet */}
        <button
          type="button"
          onClick={alternarMenuMovil}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil"
          className={`${botonIcono} lg:hidden`}
        >
          <svg {...iconoProps}>
            {menuAbierto ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil en acordeón */}
      {menuAbierto && (
        <div
          id="menu-movil"
          className="mt-3 grid max-h-[calc(100vh-5rem)] gap-1 overflow-y-auto border-t border-[#e0956f]/40 pb-2 pt-3 lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMenuAbierto(false)}
              className="rounded-lg px-1 py-2.5 text-[1.1rem] font-medium hover:text-[#e0956f]"
            >
              {l.label}
            </Link>
          ))}

          <details className="group border-t border-[#ece4d2]/15">
            <summary className="flex cursor-pointer list-none items-center justify-between px-1 py-2.5 text-[1.1rem] font-medium hover:text-[#e0956f] [&::-webkit-details-marker]:hidden">
              Más
              <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="grid gap-1 pb-2 pl-4">
              {more.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMenuAbierto(false)}
                  className="py-2 text-[1rem] text-[#ece4d2]/90 hover:text-[#e0956f]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </details>

          <div className="mt-2 grid gap-2 border-t border-[#ece4d2]/15 pt-4">
            <button type="button" onClick={abrirBusqueda} className={botonMovil}>
              <IconoBuscar />
              Buscar
            </button>
            {/* Sin funcionalidad por ahora */}
            <button type="button" className={botonMovil}>
              <IconoUsuario />
              Iniciar sesión
            </button>
          </div>
        </div>
      )}

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