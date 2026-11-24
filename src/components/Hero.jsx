import logo from '../assets/logo-bauci.png'
import fondo from '../assets/quinchia.jpg'

const hojas = [
  { fill: '#1d3a2d', t: 'translate(-20,720) rotate(-62) scale(2.2)' },
  { fill: '#2b5440', t: 'translate(-30,700) rotate(-35) scale(1.9)', b: true },
  { fill: '#142a20', t: 'translate(-30,690) rotate(-82) scale(1.7)' },
  { fill: '#3c6b52', t: 'translate(20,730) rotate(-15) scale(1.2)', b: true },
  { fill: '#1d3a2d', t: 'translate(1230,-20) rotate(122) scale(2.2)' },
  { fill: '#2b5440', t: 'translate(1240,10) rotate(150) scale(1.9)', b: true },
  { fill: '#142a20', t: 'translate(1220,-30) rotate(100) scale(1.7)' },
  { fill: '#3c6b52', t: 'translate(1190,-30) rotate(172) scale(1.2)', b: true },
]

export default function Hero() {
  return (
    <header
      className="relative grid min-h-[90vh] place-items-center overflow-hidden bg-[#0a120e] px-6 py-16 text-center text-[#ece4d2]"
      style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,11,.6),rgba(8,14,11,.88))]" />
<style>{`
  .sway { transform-box: fill-box; transform-origin: 0% 50%; animation: sway 9s ease-in-out infinite alternate; }
  .sway.b { animation-duration: 12s; animation-delay: -3s; }
  @keyframes sway { from { transform: rotate(-2deg); } to { transform: rotate(2deg); } }
  @media (prefers-reduced-motion: reduce) { .sway { animation: none; } }
`}</style>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <g id="leaf">
            <path d="M0,0 C35,-46 120,-58 180,0 C120,58 35,46 0,0Z" />
            <path d="M0,0 L168,0" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="2.5" />
          </g>
        </defs>
        {hojas.map((h, i) => (
          <g key={i} className={h.b ? 'sway b' : 'sway'} opacity=".92">
            <use href="#leaf" fill={h.fill} transform={h.t} />
          </g>
        ))}
      </svg>

      <div className="relative max-w-3xl">
        <h1 className="m-0">
          <img src={logo} alt="Bauci.co" className="mx-auto block h-auto w-[min(32rem,80vw)]" />
        </h1>
        <p className="mx-auto mt-5 max-w-[34rem] text-[clamp(1.2rem,2.6vw,1.55rem)] text-[#e3dccb]">
          Banco Audiovisual de las Culturas Indígenas Colombianas
        </p>
        <div className="mt-3 font-['Cormorant_Garamond'] text-2xl font-bold text-[#e0956f]">
          Pasado, presente y futuro
        </div>
        <a
          href="#mapa"
          className="mt-8 inline-block rounded bg-[#c0603c] px-7 py-3.5 font-bold text-[#fff7ea] no-underline"
        >
          Explorar el mapa
        </a>
      </div>
    </header>
  )
}