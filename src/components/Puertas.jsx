import { LINKS } from '../links'

const puertas = [
  { nombre: 'La Ruta del Jaguar', texto: 'La investigación-creación de donde nace el banco.', href: LINKS.ruta },
  { nombre: 'Agradecimientos', texto: 'Las personas e instituciones que hicieron posible el banco.', href: LINKS.agradecimientos },
  { nombre: 'Créditos', texto: 'Museos, bibliotecas y universidades que custodian los objetos.', href: LINKS.creditos },
]

export default function Puertas() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-[4.5rem]">
      <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-bold leading-none">
        Otras puertas
      </h2>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
        {puertas.map((p) => (
          <a
            key={p.nombre}
            href={p.href}
            className="block min-h-36 rounded-[.4rem_2rem_.4rem_2rem] bg-[var(--panel)] p-6 no-underline"
          >
            <b className="mb-1 block font-display text-[1.7rem] font-bold">{p.nombre}</b>
            <span className="text-[1.02rem] text-[color:var(--muted)]">{p.texto}</span>
          </a>
        ))}
      </div>
    </section>
  )
}