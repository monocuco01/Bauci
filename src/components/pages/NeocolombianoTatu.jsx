import { useEffect, useState } from 'react'

// Las imágenes se cargan desde Wix. Cuando las descargues, reemplaza `wix()` por imports de src/assets/.
const wix = (id, w = 900, h = 1600) =>
  `https://static.wixstatic.com/media/11a131_${id}~mv2.jpg/v1/fill/w_${w},h_${h},q_85/neocolombiano-tatu.jpg`

const ids = [
  ['d8f0c255d6e64f9285f64f917c73515e', 'Figura, espalda', 900, 1200],
  ['aa9631f262a54fa08193802254b04fb5'],
  ['46688bb1fd564f9b80f53e7738f479d7'],
  ['3f7bf17239c94d9e997a1493a1e7def3'],
  ['cf59e98c95f5427dad2c752c6d3f4ab3'],
  ['ecc82908b47d4d2cb18b01d70fb524f8'],
  ['654fad8116a946be9ee1ff25a7f21036'],
  ['a86c5709a2554d11b3b58b9917cad4b4'],
  ['0862b420c4c44e53a143f7dc47485aa6'],
  ['902aff5287124efaa3b3cedf0a572199'],
  ['6ef36f8ae3aa467b817730803b223c0b'],
  ['20eb564b24df4fb38602caf79fc452a1'],
  ['765c933e62214818bbef6c2c94d5042b'],
  ['5741419e6040462f86e8ef4b87a6a45e'],
  ['ce3d6e029b8541228784ee384962449c'],
  ['6df82d242c0b42cba23ffbe29bd26b98'],
  ['8376064b8cb3432f8ed9edb7ef26416a'],
  ['e68c7df93bff40e2bf4839993861ac2a'],
  ['2d6476b1974d4b5fad1ccd1ed2951b2c'],
  ['0b36f1c7434342f48ee462478abd677f'],
  ['70d6b126852d485e9d0c11c904f2f028', 'Patrón, brazo'],
  ['660e138a426345499c375ac78d2db8fe'],
  ['7df81d297fba444094aca35dd0574f1b'],
  ['01f719b863da49a480dd66bb52829475'],
  ['e82c2c9af38844deaff82b3bcc6f71e2'],
  ['a2bc6854652c4837ae8bf7ac081aa0c0'],
]

const lista = ids.map(([id, nombre, w, h], i) => {
  const titulo = nombre || `Imagen ${i + 1}`
  return { id, titulo, alt: `Neocolombiano Tatú: ${titulo}`, img: wix(id, w, h) }
})

export default function NeocolombianoTatu() {
  const [abierto, setAbierto] = useState(null)
  const n = lista.length
  const f = abierto === null ? null : lista[abierto]

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
      <h1 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">Neocolombiano Tatú</h1>
      <p className="mb-10 mt-3 max-w-[38rem] text-[color:var(--muted)]">
        Proyecto apoyado por MinCultura. Programa Nacional de Concertación Cultural 2024.
      </p>

      <div className="columns-1 gap-7 sm:columns-2 lg:columns-3">
        {lista.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAbierto(i)}
            aria-label={`Ver: ${item.titulo}`}
            className="mb-9 block w-full break-inside-avoid cursor-pointer border-0 bg-transparent p-0 text-left text-[color:var(--ink)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          >
            <span
              className={`block bg-[var(--panel)] p-2.5 ${
                i % 2 ? 'rounded-[2rem_.4rem_2rem_.4rem]' : 'rounded-[.4rem_2rem_.4rem_2rem]'
              }`}
            >
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                className={`block h-auto w-full ${
                  i % 2 ? 'rounded-[1.5rem_.2rem_1.5rem_.2rem]' : 'rounded-[.2rem_1.5rem_.2rem_1.5rem]'
                }`}
              />
            </span>
            <span className="mt-3 block px-1">
              <b className="font-display text-[1.45rem] font-bold leading-[1.05]">{item.titulo}</b>
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
                <span className="ml-1 text-[.95rem] text-[#a9ada0]">
                  {abierto + 1} de {n}
                </span>
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