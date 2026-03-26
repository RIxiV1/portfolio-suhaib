"use client"

import { Canvas } from "@react-three/fiber"
import { ShaderPlane, EnergyRing } from "@/components/ui/background-paper-shaders"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useState } from "react"

export default function ShaderDemo() {
  const [color1, setColor1] = useState("#ff5722")
  const [color2, setColor2] = useState("#000000")

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-8 z-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Custom Shader Background</h2>
        <p className="opacity-60">Interactive Three.js Shaders</p>
      </div>

      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        
        <ShaderPlane position={[0, 0, 0]} color1={color1} color2={color2} />
        <EnergyRing radius={1.2} position={[0, 0, 0.1]} />
        
        <group position={[2, 1, -1]}>
           <ShaderPlane position={[0, 0, 0]} color1="#2255ff" color2="#000000" />
        </group>
      </Canvas>

      <div className="absolute bottom-8 flex gap-4 z-10">
        <button 
          onClick={() => setColor1("#" + Math.floor(Math.random()*16777215).toString(16))}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all border border-white/10"
        >
          Randomize Colors
        </button>
      </div>
    </div>
  )
}
