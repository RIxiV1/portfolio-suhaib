"use client";

import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "@/components/ui/background-paper-shaders";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ShaderPlane 
            position={[0, 0, 0]} 
            colorPrimary="#00ED64" 
            colorSecondary="#00E5FF" 
            colorBackground="#060606"
        />
      </Canvas>
    </div>
  );
}
