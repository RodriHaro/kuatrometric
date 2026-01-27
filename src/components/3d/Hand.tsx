import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Color,
  DoubleSide,
  Euler,
  MathUtils,
  Mesh,
  Object3D,
  MeshPhysicalMaterial,
  Vector3,
  Group
} from 'three'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Helper function mapRange
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

const steps = [
  {
    position: [0.25, -1.75, 0],
    scale: 0.045,
    rotation: [0, Math.PI * 0.5, 0],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-45),
      MathUtils.degToRad(-135),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.15, -0.4, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(45),
      MathUtils.degToRad(-315),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-0.2, -0.35, 0],
    scale: 0.02,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.2, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [-1.6, -0.6, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ],
    type: 1,
  },
  {
    position: [0.16, -1.38, 0],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(200),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0, -0.68, 0],
    scale: 0.04,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-14),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [-0.22, -0.61, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(157 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
  {
    position: [0.2, -0.46, 0],
    scale: 0.03,
    rotation: [
      MathUtils.degToRad(0),
      MathUtils.degToRad(-(340 + 360)),
      MathUtils.degToRad(-16),
    ],
    type: 2,
  },
]

const material = new MeshPhysicalMaterial({
  color: new Color('#FF4500'),
  metalness: 1,
  roughness: 0.2,
  wireframe: false,
  transparent: true,
  opacity: 0,
  side: DoubleSide,
})

export function Hand() {
  const { scene: arm1 } = useGLTF('/models/arm.glb')
  const [type, setType] = useState(1)

  const parent = useRef<Group>(null)
  const { viewport } = useThree()

  useLayoutEffect(() => {
    if (arm1) {
      arm1.traverse((node: Object3D) => {
        if ((node as Mesh).isMesh) {
          (node as Mesh).material = material
        }
      })
    }
  }, [arm1])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetOpacity = 0.7

    if (prefersReducedMotion) {
      material.opacity = targetOpacity
      return
    }

    gsap.fromTo(
      material,
      { opacity: 0 },
      { opacity: targetOpacity, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const section = document.getElementById('clientes')
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReducedMotion ? 0 : 0.6
    const darkColor = new Color('#000000')
    const originalColor = new Color('#FF4500')

    const toDark = () =>
      gsap.to(material.color, {
        r: darkColor.r,
        g: darkColor.g,
        b: darkColor.b,
        duration,
        ease: 'power2.out',
      })
    const toOriginal = () =>
      gsap.to(material.color, {
        r: originalColor.r,
        g: originalColor.g,
        b: originalColor.b,
        duration,
        ease: 'power2.out',
      })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 45%',
      onEnter: toDark,
      onEnterBack: toDark,
      onLeave: toOriginal,
      onLeaveBack: toOriginal,
    })

    return () => trigger.kill()
  }, [])

  useFrame(() => {
    if (!parent.current) return

    // Calculate scroll progress (0 to 1) based on window scroll
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight
    const scroll = scrollMax > 0 ? window.scrollY / scrollMax : 0
    
    // We need segments. If 10 steps, 9 segments.
    // progress within total steps
    const totalSegments = steps.length - 1
    const currentSegmentIndex = Math.min(Math.floor(scroll * totalSegments), totalSegments - 1)
    const nextSegmentIndex = currentSegmentIndex + 1
    
    const segmentProgress = (scroll * totalSegments) - currentSegmentIndex

    const from = steps[currentSegmentIndex]
    const to = steps[nextSegmentIndex]
    
    if (parent.current) {
        parent.current.visible = from?.type === to?.type
    }

    if (!to || !from) return

    const _scale = mapRange(segmentProgress, 0, 1, from.scale, to.scale)
    
    // Interpolate Vector3 manually
    const _positionX = mapRange(segmentProgress, 0, 1, from.position[0], to.position[0])
    const _positionY = mapRange(segmentProgress, 0, 1, from.position[1], to.position[1])
    
    const _position = new Vector3(
      viewport.width * _positionX,
      viewport.height * _positionY,
      0
    )

    const _rotation = new Euler().fromArray(
      new Array(3)
        .fill(0)
        .map((_, i) =>
          mapRange(segmentProgress, 0, 1, from.rotation[i], to.rotation[i])
        ) as [number, number, number]
    )

    parent.current.scale.setScalar(viewport.height * _scale)
    parent.current.position.copy(_position)
    parent.current.rotation.copy(_rotation)

    if (to.type !== type) {
        setType(to.type)
    }
  })

  return (
    <group ref={parent}>
      {type === 1 && <primitive object={arm1} scale={[1, 1, 1]} />}
    </group>
  )
}
