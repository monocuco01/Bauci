import { LINKS } from '../links'
import fotos from '../assets/fotos.jpg'
import videos from '../assets/videos.jpg'
import tatu from '../assets/tatu.jpg'
import ilustraciones from '../assets/ilustraciones.png'

const tarjetas = [
  { nombre: 'Ilustraciones', href: LINKS.ilustraciones, img: ilustraciones, fondo: 'bg-white' },
  { nombre: 'Fotos', href: LINKS.fotos, img: fotos },
  { nombre: 'Videos', href: LINKS.videos, img: videos, play: true },
  { nombre: 'Neocolombiano Tatú', href: LINKS.tatu, img: tatu, pos: '50% 52%' },
]

export default function Explora() {
  return (
    <section id="explora" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-[4.5rem]">
      <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">
        Explora el archivo
      </h2>
      <p className="mb-9 mt-3 max-w-[38rem] text-[color:var(--muted)]">
        Cuatro formas de entrar al material de Bauci.co.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
        {tarjetas.map((t, i) => (
          <a
            key={t.nombre}
            href={t.href}
            className={`group relative block aspect-[4/5] overflow-hidden ${t.fondo ?? 'bg-[var(--land)]'} text-[#f3ecdc] no-underline ${
              i % 2 ? 'rounded-[2rem_.4rem_2rem_.4rem]' : 'rounded-[.4rem_2rem_.4rem_2rem]'
            }`}
          >
            {t.img ? (
              <img
                src={t.img}
                alt=""
                style={t.pos ? { objectPosition: t.pos } : undefined}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            ) : (
              <span className="absolute left-4 top-4 text-[.95rem] text-[color:var(--ink)] opacity-70">Imagen pendiente</span>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgba(8,14,11,.88))]" />
            {t.play && (
              <i className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#c0603c]" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M7 4l14 8-14 8z" fill="#fff7ea" /></svg>
              </i>
            )}
            <b className="absolute inset-x-5 bottom-4 z-10 font-display text-[2.1rem] font-bold leading-none">
              {t.nombre}
            </b>
          </a>
        ))}
      </div>
    </section>
  )
}