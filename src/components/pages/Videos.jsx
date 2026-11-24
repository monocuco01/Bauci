import { useEffect, useState } from 'react'
import { listaVideos } from '../../data/videos'

const alturas = ['aspect-[9/16]', 'aspect-[3/4]', 'aspect-[4/5]']

function Play({ size = 'h-12 w-12' }) {
  return (
    <span className={`grid ${size} place-items-center rounded-full bg-[#c0603c]`}>
      <svg width="42%" height="42%" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4l14 8-14 8z" fill="#fff7ea" />
      </svg>
    </span>
  )
}

export default function Videos() {
  const [abierto, setAbierto] = useState(null)
  const v = abierto === null ? null : listaVideos[abierto]

  useEffect(() => {
    if (abierto === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setAbierto(null)
      if (e.key === 'ArrowRight') setAbierto((i) => (i + 1) % listaVideos.length)
      if (e.key === 'ArrowLeft') setAbierto((i) => (i - 1 + listaVideos.length) % listaVideos.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [abierto])

  return (
    <main className="bg-[#0c1512] text-[#ece4d2]">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-[4.5rem]">
        <header className="mb-14 grid items-end gap-4 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-12">
          <h1 className="font-display text-[clamp(3.5rem,11vw,7.5rem)] font-bold leading-[.85]">Videos</h1>
          <p className="m-0 text-[#a9ada0]">
            Registros en video de objetos, lugares y pueblos. Cada arco abre un video.
          </p>
        </header>

        <div className="columns-2 gap-5 md:columns-3 lg:columns-4">
          {listaVideos.map((vid, i) => (
            <button
              key={vid.id}
              type="button"
              onClick={() => setAbierto(i)}
              aria-label={`Reproducir: ${vid.titulo}`}
              className="group mb-9 block w-full break-inside-avoid cursor-pointer border-0 bg-transparent p-0 text-left text-[#ece4d2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#e0956f]"
            >
              <span
                className={`relative block ${alturas[i % 3]} overflow-hidden rounded-t-full bg-[#16231d] ring-1 ring-[#ece4d2]/25 transition-shadow group-hover:ring-2 group-hover:ring-[#e0956f]`}
              >
                <img src={vid.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgba(8,14,11,.75))]" />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Play />
                </span>
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <b className="font-display text-[1.45rem] font-bold leading-[1.05]">{vid.titulo}</b>
                <span className="shrink-0 text-[.95rem] text-[#a9ada0]">{vid.duracion}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {v && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#080e0b]/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={v.titulo}
          onClick={() => setAbierto(null)}
        >
          <div className="relative w-full max-w-[22rem]" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[9/16] max-h-[78vh] w-full overflow-hidden rounded-t-full bg-[#0a120e] ring-1 ring-[#ece4d2]/30">
              {v.src ? (
                <video src={v.src} poster={v.img} controls autoPlay className="h-full w-full object-cover" />
              ) : (
                <>
                  <img src={v.img} alt="" className="h-full w-full object-cover opacity-50" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Play size="h-20 w-20" />
                  </div>
                  <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#080e0b]/90 px-3 py-1 text-[.95rem]">
                    Video por agregar
                  </span>
                </>
              )}
            </div>
            <p className="mt-3 font-display text-[1.7rem] font-bold leading-none">{v.titulo}</p>
            <button
              type="button"
              onClick={() => setAbierto(null)}
              aria-label="Cerrar"
              className="absolute -right-2 -top-2 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-0 bg-[#ece4d2] text-xl font-bold text-[#17201b]"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  )
}