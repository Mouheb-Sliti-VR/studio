
'use client';

import dynamic from 'next/dynamic';

// Dynamically import the 3D Avatar component
const DynamicAvatar3D = dynamic(() => import('@/components/three/Avatar3D'), {
  ssr: false, // Ensure it's client-side only
  loading: () => <div className="w-full h-[300px] md:h-[400px] bg-secondary/30 rounded-lg flex items-center justify-center"><p className="text-muted-foreground">Loading 3D Model...</p></div>,
});

export function ClientAvatar3D() {
  return <DynamicAvatar3D />;
}
