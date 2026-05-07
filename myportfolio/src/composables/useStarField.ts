/**
 * @fileoverview Composable for Three.js star field animation
 * Separates Three.js logic from Vue components (Clean Architecture)
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import * as THREE from 'three'
import type { StarFieldConfig } from '@/types'

interface UseStarFieldOptions extends Partial<StarFieldConfig> {
  container: Ref<HTMLDivElement | null>
}

interface UseStarFieldReturn {
  isInitialized: Ref<boolean>
  initialize: () => void
  cleanup: () => void
}

const DEFAULT_CONFIG: StarFieldConfig = {
  starCount: 4000,
  acceleration: 0.02,
  speedMultiplier: 1,
}

export function useStarField(options: UseStarFieldOptions): UseStarFieldReturn {
  const { container, ...configOverrides } = options
  const config: StarFieldConfig = { ...DEFAULT_CONFIG, ...configOverrides }

  const isInitialized = ref(false)
  
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let renderer: THREE.WebGLRenderer | null = null
  let starGeo: THREE.BufferGeometry | null = null
  let stars: THREE.Points | null = null
  let velocities: Float32Array | null = null
  let animationId: number | null = null

  function initialize(): void {
    if (!container.value || isInitialized.value) return

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 1
    camera.rotation.x = Math.PI / 2

    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.value.appendChild(renderer.domElement)

    const positions = new Float32Array(config.starCount * 3)
    velocities = new Float32Array(config.starCount)

    for (let i = 0; i < config.starCount; i++) {
      const x = Math.random() * 600 - 300
      const y = Math.random() * 600 - 300
      const z = Math.random() * 600 - 300

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      velocities[i] = 0
    }

    starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const sprite = new THREE.TextureLoader().load('white_dot.png')
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
      transparent: true,
    })

    stars = new THREE.Points(starGeo, starMaterial)
    scene.add(stars)

    isInitialized.value = true
    animate()
  }

  function animate(): void {
    if (!starGeo || !velocities || !stars || !renderer || !scene || !camera) return

    const positionAttr = starGeo.attributes.position
    if (!positionAttr) return
    
    const positions = positionAttr.array as Float32Array
    const velocitiesArray = velocities

    for (let i = 0; i < positions.length / 3; i++) {
      const currentVelocity = velocitiesArray[i] ?? 0
      velocitiesArray[i] = currentVelocity + config.acceleration * config.speedMultiplier
      
      const yIndex = i * 3 + 1
      const currentY = positions[yIndex] ?? 0
      positions[yIndex] = currentY - velocitiesArray[i]!

      if ((positions[yIndex] ?? 0) < -200) {
        positions[yIndex] = 200
        velocitiesArray[i] = 0
      }
    }

    positionAttr.needsUpdate = true
    stars.rotation.y += 0.002
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }

  function handleResize(): void {
    if (!camera || !renderer) return

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function cleanup(): void {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    window.removeEventListener('resize', handleResize)

    if (renderer) {
      renderer.dispose()
      renderer = null
    }

    if (starGeo) {
      starGeo.dispose()
      starGeo = null
    }

    scene = null
    camera = null
    stars = null
    velocities = null
    isInitialized.value = false
  }

  onMounted(() => {
    initialize()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isInitialized,
    initialize,
    cleanup,
  }
}
