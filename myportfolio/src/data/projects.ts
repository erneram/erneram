/**
 * @fileoverview Projects data
 * Portfolio projects collection
 */

import type { Project } from '@/types'

export const projects: readonly Project[] = [
  {
    id: 1,
    name: "Visualizador de Estructuras de datos",
    href: "https://github.com/AscencioSIUU/DataStructureVisualizer-",
    img: "/visualizador-datos.png"
  },
  {
    id: 2,
    name: "Calculadora en React",
    href: "https://github.com/AscencioSIUU/calculator-react",
    img: "/calcu.png"
  },
  {
    id: 3,
    name: "Memoria con React",
    href: "https://github.com/AscencioSIUU/lab6react",
    img: "/memoria-tenis.png"
  }
] as const
