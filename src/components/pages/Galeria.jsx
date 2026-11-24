// Ubicación sugerida: src/components/pages/NeocolombianoTatu.jsx
// Usa tu componente Galeria. Ajusta la ruta del import si Galeria está en otra carpeta.
import Galeria from '../Galeria'

// Las imágenes se cargan desde el sitio de Wix. Cuando las descargues,
// cambia `wix()` por imports locales de src/assets/.
const wix = (id, w = 900, h = 1600) =>
  `https://static.wixstatic.com/media/11a131_${id}~mv2.jpg/v1/fill/w_${w},h_${h},q_85/neocolombiano-tatu.jpg`

const PROYECTO = 'Programa Nacional de Concertación Cultural 2024 (MinCultura)'

// Solo dos imágenes tienen nombre en Wix; el resto lleva un título provisional.
const ids = [
  ['d8f0c255d6e64f9285f64f917c73515e', 'Figura, espalda', 'Figuras', 900, 1200],
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
  ['70d6b126852d485e9d0c11c904f2f028', 'Patrón, brazo', 'Patrones'],
  ['660e138a426345499c375ac78d2db8fe'],
  ['7df81d297fba444094aca35dd0574f1b'],
  ['01f719b863da49a480dd66bb52829475'],
  ['e82c2c9af38844deaff82b3bcc6f71e2'],
  ['a2bc6854652c4837ae8bf7ac081aa0c0'],
]

const lista = ids.map(([id, nombre, grupo = 'Galería', w, h], i) => {
  const titulo = nombre || `Imagen ${i + 1}`
  return {
    id,
    grupo,
    titulo,
    alt: `Neocolombiano Tatú: ${titulo}`,
    img: wix(id, w, h),
    proyecto: PROYECTO,
  }
})

export default function NeocolombianoTatu() {
  return (
    <Galeria
      titulo="Neocolombiano Tatú"
      texto="Proyecto apoyado por MinCultura. Programa Nacional de Concertación Cultural 2024."
      lista={lista}
      campos={[
        ['Categoría', 'grupo'],
        ['Proyecto', 'proyecto'],
      ]}
      sub="grupo"
    />
  )
}