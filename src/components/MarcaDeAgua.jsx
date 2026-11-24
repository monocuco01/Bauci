
export default function MarcaDeAgua({ texto = 'BORRADOR · Bauci.co · Solo para revisión · Hector solano' }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="280">
    <text x="230" y="140" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700"
      fill="#888888" fill-opacity="0.25" transform="rotate(-30 230 140)">${texto}</text>
  </svg>`

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none"
      style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }}
    />
  )
}