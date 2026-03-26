"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Smoother, fluid vertex movement
const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Slow, subtle wave motion
    pos.z += sin(pos.x * 2.0 + time * 0.2) * 0.1;
    pos.z += cos(pos.y * 2.0 + time * 0.3) * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// High-tech, smooth gradient fragment shader
const fragmentShader = `
  uniform float time;
  uniform vec3 colorPrimary;
  uniform vec3 colorSecondary;
  uniform vec3 colorBackground;
  varying vec2 vUv;
  
  // Basic noise function for organic blending
  float noise(vec2 p) {
    return sin(p.x * 10.0 + time * 0.1) * cos(p.y * 10.0 + time * 0.15);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create soft, fluid moving coordinates
    vec2 p1 = uv + vec2(sin(time * 0.05), cos(time * 0.08));
    vec2 p2 = uv + vec2(cos(time * 0.07), sin(time * 0.06));
    
    // Generate organic mixing values
    float mix1 = (noise(p1) + 1.0) * 0.5;
    float mix2 = (noise(p2 * 1.5) + 1.0) * 0.5;
    
    // Blend colors to create a "glowing nebula" effect
    vec3 finalColor = mix(colorBackground, colorPrimary, mix1 * 0.4);
    finalColor = mix(finalColor, colorSecondary, mix2 * 0.3);
    
    // Add a subtle vignette (darker edges, brighter center)
    float vignette = length(uv - 0.5);
    finalColor = mix(finalColor, colorBackground, vignette * 1.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function ShaderPlane({
  position = [0, 0, -1],
  colorPrimary = "#00ED64",    // Vibrant Neon Green
  colorSecondary = "#00684A",  // Deep Emerald
  colorBackground = "#020B14", // Very Dark Slate/Blue
}: {
  position?: [number, number, number]
  colorPrimary?: string
  colorSecondary?: string
  colorBackground?: string
}) {
  const mesh = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorPrimary: { value: new THREE.Color(colorPrimary) },
      colorSecondary: { value: new THREE.Color(colorSecondary) },
      colorBackground: { value: new THREE.Color(colorBackground) },
    }),
    [colorPrimary, colorSecondary, colorBackground]
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  })

  return (
    // Scaled up to cover the full background smoothly
    <mesh ref={mesh} position={position} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  )
}
