'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Hand } from './Hand';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }} // Adjusted camera for Orthographic-like framing if needed, or keeping perspective
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={null}>
            <Hand />
            <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
