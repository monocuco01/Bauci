import zenu from '../assets/zenu.jpg'
import quinchia from '../assets/quinchia.jpg'
import sogamoso from '../assets/sogamoso.jpg'
import sanAgustin from '../assets/san-agustin.jpg'
import tatu from '../assets/tatu.jpg'
import fotos from '../assets/fotos.jpg'
import videos from '../assets/videos.jpg'

const muestras = [
  { titulo: 'Tazón · Zenú', img: zenu, duracion: '0:42' },
  { titulo: 'Estatuillas · Quinchía', img: quinchia, duracion: '1:05' },
  { titulo: 'Patio del museo · Sogamoso', img: sogamoso, duracion: '0:58' },
  { titulo: 'Tótem · San Agustín', img: sanAgustin, duracion: '1:20' },
  { titulo: 'Diseño de tatuaje', img: tatu, duracion: '0:33' },
  { titulo: 'Piezas de cerámica', img: fotos, duracion: '0:47' },
  { titulo: 'Figura en piedra', img: videos, duracion: '1:12' },
]

// src: null = "video por agregar". Luego pones la URL del archivo.
export const listaVideos = [...muestras, ...muestras.slice(0, 5)].map((v, i) => ({
  ...v,
  id: i + 1,
  src: null,
}))