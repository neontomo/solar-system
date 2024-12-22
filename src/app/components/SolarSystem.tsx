/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { planets } from '@/app/constants/planets'
import {
  createPerlinBasedTextureWithColor,
  createPlanetMeshes
} from '@/app/utils/texture'
import {
  handleKeyDown,
  handleMouseMove,
  handleWheel
} from '@/app/utils/keyhandlers'
import { setupCanvas } from '@/app/utils/canvas'
import { cn } from '@/app/lib/utils'

const setAnglesOfPlanets = (
  planetMeshes: {
    mesh: THREE.Mesh
    distance: number
    orbitalPeriod: number
  }[]
) => {
  const time = Date.now() * 0.001
  const dayInSeconds = 10

  planetMeshes.forEach((planet) => {
    const angle = (time / dayInSeconds) * ((2 * Math.PI) / planet.orbitalPeriod)
    planet.mesh.position.x = planet.distance * Math.cos(angle)
    planet.mesh.position.z = planet.distance * Math.sin(angle)
  })
}

function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  planetMeshes: {
    mesh: THREE.Mesh
    distance: number
    orbitalPeriod: number
  }[]
) {
  setAnglesOfPlanets(planetMeshes)

  renderer.render(scene, camera)
  requestAnimationFrame(() => animate(renderer, scene, camera, planetMeshes))
}

const SolarSystem = ({ hasLoaded }: { hasLoaded: boolean }) => {
  const mountNode = useRef<HTMLDivElement>(null)
  const [lookingAtPlanetIndex, setLookingAtPlanetIndex] = useState<
    number | null
  >(null)
  const [planetMeshes] = useState(createPlanetMeshes(planets))
  const [scene] = useState<THREE.Scene>(new THREE.Scene())
  const [camera] = useState<THREE.PerspectiveCamera | null>(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  )

  useEffect(() => {
    const lookingAtPlanInterval = setInterval(() => {
      if (lookingAtPlanetIndex !== null && camera) {
        camera.position.set(0, 10, 40)

        if (lookingAtPlanetIndex === 0) {
          camera.position.z =
            planetMeshes[lookingAtPlanetIndex].mesh.position.z - 20
        } else {
          camera.position.z =
            planetMeshes[lookingAtPlanetIndex].mesh.position.z - 5
        }
        camera.lookAt(planetMeshes[lookingAtPlanetIndex].mesh.position)
      }
    }, 1)

    return () => {
      clearInterval(lookingAtPlanInterval)
    }
  }, [lookingAtPlanetIndex])

  useEffect(() => {
    if (!camera) return

    const renderer = setupCanvas(
      camera,
      scene,
      mountNode,
      planetMeshes,
      planets
    )
    animate(renderer, scene, camera, planetMeshes)

    setInterval(() => {
      planetMeshes.forEach((planetMesh, index) => {
        const planet = planets[index]
        if (planet.name !== 'Sun') return

        const texture = createPerlinBasedTextureWithColor(
          planet.name,
          32,
          new THREE.Color(planet.color)
        )

        const material = new THREE.MeshBasicMaterial({
          map: texture
        })

        planetMesh.mesh.material = material
      })
    }, 400)

    if (typeof window !== 'undefined') {
      window.addEventListener('wheel', (event) => {
        handleWheel(event, camera, setLookingAtPlanetIndex)
      })

      window.addEventListener('keydown', (event) => {
        handleKeyDown(event, camera, setLookingAtPlanetIndex)
      })

      window.addEventListener('mousemove', (event) => {
        handleMouseMove(event, camera, setLookingAtPlanetIndex)
      })

      window.addEventListener('resize', () => {
        if (!camera) return
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      })
    }

    setTimeout(() => {
      camera.position.set(0, 10, 40)
      camera.lookAt(0, 0, 0)
    }, 1000)
  }, [])

  return (
    <div>
      <div className={cn(!hasLoaded && 'hidden')}>
        <div className="text-white fixed top-4 right-4 p-2 bg-black/50 font-mono text-[11px]">
          <p>Space Rocket Console</p>
          <p>Use the arrow keys to move around</p>
          <p>Press 1-9 to follow a specific planet</p>
          <p>Use scroll wheel to zoom in and out</p>
          <p>Press R to reset the camera</p>
          <p>Press O to toggle top-down / side view</p>
        </div>

        <div ref={mountNode}>
          <div
            className={cn('text-white fixed top-4 left-4 font-mono text-sm')}>
            {lookingAtPlanetIndex !== null && (
              <span>Following {planets[lookingAtPlanetIndex].name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolarSystem
