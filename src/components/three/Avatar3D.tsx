
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload, Environment } from '@react-three/drei';
import type { Group } from 'three';
import { Skeleton } from '@/components/ui/skeleton';

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  // Explicitly type the return of useGLTF if necessary, or use 'as any' for simplicity if types are complex.
  // For simple GLTF/GLB files, `scene` is usually of type `Group`.
  const { scene } = useGLTF(url) as { scene: Group };
  return <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} rotation={[0, Math.PI / 4, 0]} />;
}

function CanvasLoader() {
  return (
     <div className="w-full h-full flex items-center justify-center">
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
  );
}

export default function Avatar3D() {
  // IMPORTANT: Replace this URL with the path to your model.
  // 1. Place your model (e.g., my-avatar.glb) in the `/public/models/` directory.
  // 2. Update modelUrl to: '/models/my-avatar.glb'
  const modelUrl = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'; // Placeholder model

  return (
    <div style={{ width: '100%', height: '100%', minHeight:'300px', maxHeight:'400px', borderRadius: '0.5rem', overflow: 'hidden' }} className="shadow-lg border border-border">
      <Canvas
        camera={{ position: [3, 1.5, 6], fov: 45 }} // Adjusted camera
        shadows
        gl={{ preserveDrawingBuffer: true }} // Useful if you want to take screenshots
        aria-label="Interactive 3D model of Mouheb Sliti"
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
         <directionalLight // Fill light from another angle
          position={[-5, 5, -5]}
          intensity={0.5}
        />
        <Suspense fallback={<CanvasLoader />}>
          <Model url={modelUrl} />
          <Environment preset="sunset" /> {/* Adds nice environment lighting & background */}
          <Preload all />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false} // Better for focused object
          autoRotate
          autoRotateSpeed={1.5}
          minPolarAngle={Math.PI / 3} // Limit vertical rotation
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation
        />
      </Canvas>
    </div>
  );
}
