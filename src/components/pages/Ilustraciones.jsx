import { useEffect, useState } from 'react'
import { listaFotos } from '../../data/fotos'


const grupos = [...new Set(listaFotos.map((x) => x.grupo))]
const porGrupo = grupos.map((g) => ({ nombre: g, items: listaFotos.filter((x) => x.grupo === g) }))
const ordenadas = porGrupo.flatMap((g) => g.items)

// Ancho de cada imagen en una fila de 6 columnas: ancha, angosta, angosta, ancha...
// La última rellena lo que falte de la fila para no dejar huecos.
function anchos(m) {
  const patron = [4, 2, 2, 4]
  const out = []
  let fila = 0
  for (let i = 0; i < m; i++) {
    const s = i === m - 1 ? 6 - fila : patron[i % 4]
    out.push(s)
    fila = (fila + s) % 6
  }
  return out
}

const colSpan = { 2: 'md:col-span-2', 4: 'md:col-span-4', 6: 'md:col-span-6' }

export default function Ilustraciones() {
  const [abierto, setAbierto] = useState(null)
  const n = ordenadas.length
  const f = abierto === null ? null : ordenadas[abierto]

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
      <h1 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">Ilustraciones</h1>
      <p className="mb-12 mt-3 max-w-[38rem] text-[color:var(--muted)]">
        Dibujos y diseños inspirados en el patrimonio gráfico indígena. Toca una imagen para verla completa.
      </p>

      {porGrupo.map((g) => {
        const s = anchos(g.items.length)
        return (
          <section key={g.nombre} className="mb-16">
            <h2 className="mb-5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-none">{g.nombre}</h2>
            <div className="grid grid-cols-6 gap-4 md:gap-5">
              {g.items.map((foto, i) => (
                <figure key={foto.id} className={`m-0 col-span-6 ${colSpan[s[i]]}`}>
                  <button
                    type="button"
                    onClick={() => setAbierto(ordenadas.indexOf(foto))}
                    aria-label={`Ver completa: ${foto.titulo}`}
                    className="block w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
                  >
                    <img
                      src={foto.img}
                      alt={foto.alt}
                      loading="lazy"
                      className={`block h-[clamp(18rem,34vw,27rem)] w-full object-cover ${
                        i % 2 ? 'rounded-[1.6rem_.3rem_1.6rem_.3rem]' : 'rounded-[.3rem_1.6rem_.3rem_1.6rem]'
                      }`}
                    />
                  </button>
                  <figcaption className="mt-2 flex items-baseline justify-between gap-3">
                    <b className="font-display text-[1.35rem] font-bold leading-none">{foto.titulo}</b>
                    <span className="shrink-0 text-[.95rem] text-[color:var(--muted)]">{foto.cultura}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )
      })}

      {f && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#080e0b]/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={f.titulo}
          onClick={() => setAbierto(null)}
        >
          <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={f.img}
              alt={f.alt}
              className="h-auto max-h-[76vh] w-auto max-w-full rounded-[.3rem_1.6rem_.3rem_1.6rem]"
            />
            <div className="flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[#ece4d2]">
              <p className="m-0 font-display text-[1.8rem] font-bold leading-none">{f.titulo}</p>
              <p className="m-0 text-[.95rem] text-[#a9ada0]">{f.cultura}, {f.lugar}</p>
            </div>
            <div className="flex w-full items-center gap-2">
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
            <button
              type="button"
              onClick={() => setAbierto(null)}
              aria-label="Cerrar"
              className="absolute -right-1 -top-1 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-0 bg-[#ece4d2] text-xl font-bold text-[#17201b]"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  )
}