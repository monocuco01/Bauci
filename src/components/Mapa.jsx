import { useState } from 'react'
import { LINKS } from '../links'
import zenu from '../assets/zenu.jpg'
import quinchia from '../assets/quinchia.jpg'
import sogamoso from '../assets/sogamoso.jpg'
import sanAgustin from '../assets/san-agustin.jpg'

const regiones = [
  { n: 'Caribe', x: 150, y: 62, t: 'Costa, sabanas y colinas frente al mar. Aquí se conserva material de la cultura Zenú.', p: ['Zenú'],
    img: zenu, alt: 'Tazón decorado en un museo, cultura Zenú, San Jacinto', cap: 'Tazón · Zenú · San Jacinto · museo' },
  { n: 'Sierra Nevada y La Guajira', x: 262, y: 36, t: 'Una montaña frente al Caribe y un desierto en el extremo norte del país.', p: ['Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo', 'Wayuu'] },
  { n: 'Pacífico', x: 98, y: 200, t: 'Selva húmeda y ríos entre la cordillera y el océano.', p: ['Emberá', 'Wounaan', 'Awá'] },
  { n: 'Eje cafetero', x: 140, y: 150, t: 'Cordillera occidental. Piezas de cerámica de la cultura Quinchía.', p: ['Cultura Quinchía'],
    img: quinchia, alt: 'Dos estatuillas de cerámica con collares, cultura Quinchía', cap: 'Estatuillas · cultura Quinchía · museo' },
  { n: 'Boyacá', x: 225, y: 165, t: 'Altiplano de la cordillera oriental, con museos arqueológicos en Sogamoso.', p: ['Guane', 'Muisca'],
    img: sogamoso, alt: 'Patio del museo de Sogamoso con escalera y espejo de agua pintados con diseños indígenas', cap: 'Patio del museo · Sogamoso' },
  { n: 'San Agustín', x: 160, y: 300, t: 'Parque arqueológico en las montañas del sur, con esculturas de piedra.', p: ['Cultura San Agustín'],
    img: sanAgustin, alt: 'Tótem de piedra en el parque de San Agustín, con las montañas al fondo', cap: 'Tótem · San Agustín · parque' },
  { n: 'Orinoquía', x: 300, y: 240, t: 'Llanuras y ríos hacia el oriente.', p: ['Sikuani', 'Piapoco', 'Sáliba'] },
  { n: 'Amazonía', x: 268, y: 352, t: 'La selva más extensa del país, en el sur.', p: ['Ticuna', 'Uitoto', 'Tukano'] },
]

export default function Mapa() {
  const [sel, setSel] = useState(0)
  const r = regiones[sel]

  return (
    <section id="mapa" className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">
        Entra por el territorio
      </h2>
      <p className="mb-9 mt-3 max-w-[38rem] text-[color:var(--muted)]">
        Toca un punto del mapa para ver el material de cada región: los objetos, los pueblos y los lugares donde se conservan.
      </p>

      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <svg viewBox="0 0 400 460" role="img" aria-label="Mapa estilizado de Colombia con regiones" className="mx-auto block w-full max-w-[26rem]">
          <path
            d="M92,70 L130,40 L175,45 L215,28 L260,20 L300,10 L318,40 L290,75 L330,110 L372,150 L378,215 L350,255 L372,300 L338,345 L330,440 L305,420 L268,400 L215,395 L190,370 L150,345 L110,350 L100,300 L75,255 L88,200 L70,150 L95,110Z"
            fill="var(--land)" stroke="var(--line)" strokeWidth="1.5" strokeLinejoin="round"
          />
          {regiones.map((reg, k) => (
            <circle
              key={reg.n}
              cx={reg.x} cy={reg.y} r={k === sel ? 13 : 9}
              fill="var(--accent)"
              stroke={k === sel ? 'var(--ink)' : 'var(--bg)'}
              strokeWidth="3"
              className="cursor-pointer transition-all duration-200"
              tabIndex={0} role="button" aria-label={reg.n}
              onClick={() => setSel(k)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(k) }
              }}
            />
          ))}
        </svg>

        <div className="overflow-hidden rounded-[.4rem_2.4rem_.4rem_2.4rem] bg-[var(--panel)]" aria-live="polite">
          <figure className="relative m-0 grid aspect-[16/10] place-items-center bg-[var(--land)] p-4 text-center text-[color:var(--muted)]">
            {r.img ? (
              <>
                <img src={r.img} alt={r.alt} className="absolute inset-0 h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(8,14,11,.8))] px-5 pb-2.5 pt-6 text-[.95rem] text-[#f3ecdc]">
                  {r.cap}
                </figcaption>
              </>
            ) : (
              <span>Foto pendiente para esta región</span>
            )}
          </figure>

          <div className="px-7 pb-7 pt-6">
            <h3 className="font-display text-[2.2rem] font-bold leading-none">{r.n}</h3>
            <p className="mt-2.5">{r.t}</p>
            <ul className="my-4 flex list-none flex-wrap gap-2 p-0">
              {r.p.map((pueblo) => (
                <li key={pueblo} className="rounded-full border-[1.5px] border-[color:var(--line)] px-3.5 py-0.5 font-medium">
                  {pueblo}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[['Fotos', LINKS.fotos], ['Videos', LINKS.videos], ['Ilustraciones', LINKS.ilustraciones]].map(([txt, href]) => (
                <a key={txt} href={href} className="rounded bg-[var(--ink)] px-4 py-2 text-[.95rem] font-bold text-[color:var(--bg)] no-underline">
                  {txt}
                </a>
              ))}
            </div>
            <p className="mt-5 text-[.95rem] text-[color:var(--muted)]">
              Regiones y pueblos de ejemplo para la maqueta. Los definitivos salen del archivo de Bauci.
            </p>
          </div>
        </div>
      </div>

      <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
        {regiones.map((reg, k) => (
          <li key={reg.n}>
            <button
              type="button"
              aria-pressed={k === sel}
              onClick={() => setSel(k)}
              className={`cursor-pointer rounded border-[1.5px] px-3.5 py-1.5 text-[.95rem] font-medium ${
                k === sel
                  ? 'border-[color:var(--accent)] bg-[var(--accent)] text-[#fff7ea]'
                  : 'border-[color:var(--line)] bg-transparent text-[color:var(--ink)]'
              }`}
            >
              {reg.n}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}