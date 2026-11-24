import zenu from '../assets/zenu.jpg'
import quinchia from '../assets/quinchia.jpg'
import sogamoso from '../assets/sogamoso.jpg'
import sanAgustin from '../assets/san-agustin.jpg'
import tatu from '../assets/tatu.jpg'
import fotos from '../assets/fotos.jpg'
import videos from '../assets/videos.jpg'

const muestras = [
  { titulo: 'Tazón decorado', grupo: 'Caribe', cultura: 'Zenú', lugar: 'San Jacinto', custodio: 'Museo (por confirmar)',
    img: zenu, alt: 'Tazón decorado en un museo, cultura Zenú, San Jacinto' },
  { titulo: 'Estatuillas con collares', grupo: 'Eje cafetero', cultura: 'Quinchía', lugar: 'Por confirmar', custodio: 'Museo (por confirmar)',
    img: quinchia, alt: 'Dos estatuillas de cerámica con collares, cultura Quinchía' },
  { titulo: 'Patio del museo', grupo: 'Boyacá', cultura: 'Muisca', lugar: 'Sogamoso', custodio: 'Museo arqueológico',
    img: sogamoso, alt: 'Patio del museo de Sogamoso con escalera y espejo de agua pintados con diseños indígenas' },
  { titulo: 'Tótem de piedra', grupo: 'San Agustín', cultura: 'San Agustín', lugar: 'Parque arqueológico', custodio: 'Parque arqueológico',
    img: sanAgustin, alt: 'Tótem de piedra en el parque de San Agustín, con las montañas al fondo' },
  { titulo: 'Diseño de espalda', grupo: 'Tatú', cultura: 'Neocolombiano Tatú', lugar: 'Por confirmar', custodio: 'Bauci.co',
    img: tatu, alt: 'Diseño de tatuaje neocolombiano sobre una espalda' },
  { titulo: 'Sellos de cerámica', grupo: 'Caribe', cultura: 'Por confirmar', lugar: 'Por confirmar', custodio: 'Museo (por confirmar)',
    img: fotos, alt: 'Piezas de cerámica sobre una mesa de madera' },
  { titulo: 'Figura sentada', grupo: 'San Agustín', cultura: 'San Agustín', lugar: 'Por confirmar', custodio: 'Museo (por confirmar)',
    img: videos, alt: 'Figura de piedra tallada sentada en un trono' },
]

export const listaFotos = [...muestras, ...muestras.slice(0, 5)].map((f, i) => ({ ...f, id: i + 1 }))