import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Perlin } from 'perlin-noise'

const generateTexture = (color) => {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  const imageData = context.createImageData(size, size)
  const data = imageData.data
  const perlin = new Perlin()

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const value = Math.abs(perlin.noise2D(x / 100, y / 100))
      const cell = (x + y * size) * 4
      data[cell] = color.r * value
      data[cell + 1] = color.g * value
      data[cell + 2] = color.b * value
      data[cell + 3] = 255
    }
  }

  context.putImageData(imageData, 0, 0)
  return new THREE.CanvasTexture(canvas)
}

const PlanetRenderer = ({ planets }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (window === undefined) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const planetMeshes = planets.map((planet) => {
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshBasicMaterial({
        map: generateTexture(new THREE.Color(planet.color))
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.scale.set(planet.scale, planet.scale, planet.scale)
      scene.add(sphere)
      return sphere
    })

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      planetMeshes.forEach((mesh) => {
        mesh.rotation.y += 0.01
      })
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [planets])

  return <div ref={mountRef} />
}

export default PlanetRenderer
