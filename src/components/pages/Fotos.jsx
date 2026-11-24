import { useEffect, useMemo, useState } from 'react'
import { listaFotos } from '../../data/fotos'

const grupos = ['Todas', ...new Set(listaFotos.map((f) => f.grupo))]

export default function Fotos() {
  const [grupo, setGrupo] = useState('Todas')
  const [abierto, setAbierto] = useState(null)

  const visibles = useMemo(
    () => (grupo === 'Todas' ? listaFotos : listaFotos.filter((f) => f.grupo === grupo)),
    [grupo]
  )
  const n = visibles.length
  const f = abierto === null ? null : visibles[abierto]

  useEffect(() => {
    if (abierto === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setAbierto(null)
      if (e.key === 'ArrowRight') setAbierto((i) => (i + 1) % n)
      if (e.key === 'ArrowLeft') setAbierto((i) => (i - 1 + n) % n)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [abierto, n])

  return (
    <main className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <h1 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">Fotos</h1>
      <p className="mb-6 mt-3 max-w-[38rem] text-[color:var(--muted)]">
        Objetos, lugares y diseños del archivo. Filtra por región y abre una foto para ver su ficha.
      </p>

      <ul className="m-0 mb-10 flex list-none flex-wrap gap-2 p-0">
        {grupos.map((g) => (
          <li key={g}>
            <button
              type="button"
              aria-pressed={g === grupo}
              onClick={() => setGrupo(g)}
              className={`cursor-pointer rounded border-[1.5px] px-3.5 py-1.5 text-[.95rem] font-medium ${
                g === grupo
                  ? 'border-[color:var(--accent)] bg-[var(--accent)] text-[#fff7ea]'
                  : 'border-[color:var(--line)] bg-transparent text-[color:var(--ink)]'
              }`}
            >
              {g}
            </button>
          </li>
        ))}
      </ul>

      <div className="columns-1 gap-7 sm:columns-2 lg:columns-3">
        {visibles.map((foto, i) => (
          <button
            key={foto.id}
            type="button"
            onClick={() => setAbierto(i)}
            aria-label={`Ver foto: ${foto.titulo}`}
            className="mb-9 block w-full break-inside-avoid cursor-pointer border-0 bg-transparent p-0 text-left text-[color:var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          >
            <span
              className={`block bg-[var(--panel)] p-2.5 ${
                i % 2 ? 'rounded-[2rem_.4rem_2rem_.4rem]' : 'rounded-[.4rem_2rem_.4rem_2rem]'
              }`}
            >
              <img
                src={foto.img}
                alt={foto.alt}
                loading="lazy"
                className={`block h-auto w-full ${
                  i % 2 ? 'rounded-[1.5rem_.2rem_1.5rem_.2rem]' : 'rounded-[.2rem_1.5rem_.2rem_1.5rem]'
                }`}
              />
            </span>
            <span className="mt-3 flex items-baseline justify-between gap-3 px-1">
              <b className="font-display text-[1.45rem] font-bold leading-[1.05]">{foto.titulo}</b>
              <span className="shrink-0 text-[.95rem] text-[color:var(--muted)]">{foto.cultura}</span>
            </span>
          </button>
        ))}
      </div>

      {f && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#080e0b]/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={f.titulo}
          onClick={() => setAbierto(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col gap-5 overflow-y-auto md:flex-row md:items-end md:overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-0 min-w-0 flex-1 justify-center">
              <img
                src={f.img}
                alt={f.alt}
                className="h-auto max-h-[62vh] w-auto max-w-full rounded-[.3rem_1.6rem_.3rem_1.6rem] md:max-h-[84vh]"
              />
            </div>

            <aside className="shrink-0 text-[#ece4d2] md:w-64">
              <h2 className="font-display text-[2rem] font-bold leading-none">{f.titulo}</h2>
              <dl className="m-0 mt-4 grid gap-2.5">
                {[['Región', f.grupo], ['Cultura', f.cultura], ['Lugar', f.lugar], ['Custodio', f.custodio]].map(([k, val]) => (
                  <div key={k}>
                    <dt className="text-[.9rem] text-[#a9ada0]">{k}</dt>
                    <dd className="m-0">{val}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAbierto((abierto - 1 + n) % n)}
                  className="cursor-pointer rounded border-[1.5px] border-[#8a8379] bg-transparent px-3.5 py-1.5 text-[.95rem] text-[#ece4d2]"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setAbierto((abierto + 1) % n)}
                  className="cursor-pointer rounded border-[1.5px] border-[#8a8379] bg-transparent px-3.5 py-1.5 text-[.95rem] text-[#ece4d2]"
                >
                  Siguiente
                </button>
                <span className="ml-1 text-[.95rem] text-[#a9ada0]">{abierto + 1} de {n}</span>
              </div>
            </aside>

            <button
              type="button"
              onClick={() => setAbierto(null)}
              aria-label="Cerrar"
              className="absolute right-0 top-0 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-0 bg-[#ece4d2] text-xl font-bold text-[#17201b]"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  )
}