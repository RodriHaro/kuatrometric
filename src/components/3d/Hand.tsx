import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
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

const primarySteps = [
  ...steps.filter((step) => step.type === 1),
  {
    position: [-2.25, -0.62, 0] as [number, number, number],
    scale: 0.05,
    rotation: [
      MathUtils.degToRad(-90),
      MathUtils.degToRad(-405),
      MathUtils.degToRad(-45),
    ] as [number, number, number],
    type: 1,
  },
]

const material = new MeshPhysicalMaterial({
  color: new Color('#ff0000'),
  metalness: 0.6,
  roughness: 0.25,
  wireframe: false,
  transparent: true,
  opacity: 0,
  side: DoubleSide,
})

export function Hand() {
  const { scene: arm1 } = useGLTF('/models/arm.glb')

  const parent = useRef<Group>(null)
  const progressRef = useRef(0)
  const endBoundaryRef = useRef<number | null>(null)
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
    const originalColor = new Color('#ff0000')

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

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const resolveEndBoundary = () => {
      const fallbackBoundary = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const servicesTrigger = ScrollTrigger.getById('services-horizontal-scroll')
      const triggerStart =
        typeof servicesTrigger?.start === 'number' && Number.isFinite(servicesTrigger.start)
          ? servicesTrigger.start
          : null
      const triggerEnd =
        typeof servicesTrigger?.end === 'number' && Number.isFinite(servicesTrigger.end)
          ? servicesTrigger.end
          : null

      const servicesSection = document.getElementById('servicios')
      const sectionTop = servicesSection?.offsetTop ?? null
      const firstServiceCard = document.querySelector<HTMLElement>('[data-service-card="first"]')

      const desktopBase = triggerStart ?? sectionTop ?? fallbackBoundary
      const desktopExtra = firstServiceCard ? Math.max(0, firstServiceCard.offsetLeft) : 0
      const desktopBoundary = desktopBase + desktopExtra

      const mobileBoundary = triggerEnd ?? triggerStart ?? sectionTop ?? fallbackBoundary

      const baseBoundary = window.innerWidth < 768 ? mobileBoundary : desktopBoundary

      if (typeof baseBoundary === 'number' && Number.isFinite(baseBoundary) && baseBoundary > 0) {
        endBoundaryRef.current = Math.max(1, baseBoundary)
      }
    }

    resolveEndBoundary()
    window.addEventListener('resize', resolveEndBoundary)
    ScrollTrigger.addEventListener('refresh', resolveEndBoundary)

    return () => {
      window.removeEventListener('resize', resolveEndBoundary)
      ScrollTrigger.removeEventListener('refresh', resolveEndBoundary)
    }
  }, [])

  useFrame(() => {
    if (!parent.current) return

    const scrollY = window.scrollY
    if (scrollY <= 24) {
      progressRef.current = 0
      material.opacity = 0.7
    }

    const fallbackBoundary = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

    const endBoundary = Math.max(1, endBoundaryRef.current ?? fallbackBoundary)

    progressRef.current = MathUtils.clamp(scrollY / endBoundary, 0, 1)
    const scroll = progressRef.current
    parent.current.visible = scroll < 0.999
    if (!parent.current.visible) return

    const fadeStart = 0.9
    if (scroll > fadeStart) {
      const fadeProgress = MathUtils.clamp((scroll - fadeStart) / (1 - fadeStart), 0, 1)
      material.opacity = 0.7 * (1 - fadeProgress)
    } else if (material.opacity < 0.7) {
      material.opacity = Math.min(0.7, material.opacity + 0.06)
    }
    
    // Use only the primary phase to avoid a second perceived cycle.
    // progress within total steps
    const totalSegments = primarySteps.length - 1
    const currentSegmentIndex = Math.min(Math.floor(scroll * totalSegments), totalSegments - 1)
    const nextSegmentIndex = currentSegmentIndex + 1
    
    const segmentProgress = (scroll * totalSegments) - currentSegmentIndex

    const from = primarySteps[currentSegmentIndex]
    const to = primarySteps[nextSegmentIndex]

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
  })

  return (
    <group ref={parent}>
      <primitive object={arm1} scale={[1, 1, 1]} />
    </group>
  )
}
