'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { graphData, GraphNode } from '@/data/graphData';
import { motion, AnimatePresence } from 'framer-motion';

const getPos = (id: string): [number, number, number] => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [
    Math.sin(seed * 0.1) * 10,
    Math.cos(seed * 0.2) * 10,
    Math.sin(seed * 0.3) * 10,
  ];
};

function Node({ node, isHovered, onHover }: { node: GraphNode; isHovered: boolean; onHover: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Random initial position based on node ID to keep it consistent
  const pos = useMemo(() => getPos(node.id), [node.id]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time + pos[0]) * 0.002;
    }
  });

  return (
    <group position={pos}>
      <Sphere
        ref={meshRef}
        args={[node.val * 0.05, 32, 32]}
        onClick={() => console.log('Clicked', node.label)}
        onPointerOver={() => onHover(node.id)}
        onPointerOut={() => onHover(null)}
      >
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 2 : 0.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
      {isHovered && (
        <Text
          position={[0, node.val * 0.1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {node.label}
        </Text>
      )}
    </group>
  );
}

function Connections({ hoveredNode }: { hoveredNode: string | null }) {
  const lines = useMemo(() => {
    return (graphData.links).map(link => {
      const sourceNode = (graphData.nodes).find(n => n.id === link.source)!;
      const targetNode = (graphData.nodes).find(n => n.id === link.target)!;
      
      const start = getPos(sourceNode.id);
      const end = getPos(targetNode.id);
      
      const isActive = hoveredNode === link.source || hoveredNode === link.target;
      
      return { start, end, id: `${link.source}-${link.target}`, isActive };
    });
  }, [hoveredNode]);

  return (
    <group>
      {lines.map((l) => (
        <Line
          key={l.id}
          points={[l.start, l.end]}
          color={l.isActive ? "white" : "#444"}
          lineWidth={l.isActive ? 2 : 0.5}
          transparent
          opacity={l.isActive ? 0.8 : 0.2}
        />
      ))}
    </group>
  );
}

export default function NexusGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Connections hoveredNode={hoveredNode} />
          {(graphData.nodes).map((node) => (
            <Node 
              key={node.id} 
              node={node} 
              isHovered={hoveredNode === node.id}
              onHover={setHoveredNode}
            />
          ))}
        </Float>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={40} 
          minDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <h2 className="text-4xl font-bold text-white tracking-tighter mb-2">THE NEXUS</h2>
        <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
          Interconnected Knowledge & Network Theory
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-nexus'))}
          className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
        >
          CLOSE NEXUS
        </button>
      </div>
    </div>
  );
}
