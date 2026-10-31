import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Book, GradCap, KnowledgeGlobe, OrbitRing } from './SchoolSymbols';

function OrbitingBooks() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
        <Book color="#d97706" position={[2.9, 0.5, 0]} rotation={[0.25, -0.5, 0.15]} scale={0.85} />
      </Float>
      <Float speed={1.7} rotationIntensity={0.9} floatIntensity={1.4}>
        <Book color="#276692" position={[-2.7, -0.4, 0.6]} rotation={[-0.2, 0.7, -0.2]} scale={0.8} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.1}>
        <Book color="#b45309" position={[0.6, -1.6, 2.2]} rotation={[0.5, 0.2, 0.3]} scale={0.7} />
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Book color="#1c4463" position={[-1.2, 1.9, -1.8]} rotation={[-0.4, 1.1, 0.35]} scale={0.75} />
      </Float>
    </group>
  );
}

function Pencil() {
  return (
    <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.6}>
      <group position={[2.2, -1.7, 1.2]} rotation={[0.6, 0.2, -0.9]} scale={0.9}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 1.5, 6]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.87, 0]}>
          <coneGeometry args={[0.12, 0.35, 6]} />
          <meshStandardMaterial color="#fde8c8" roughness={0.6} />
        </mesh>
        <mesh position={[0, -1.06, 0]}>
          <coneGeometry args={[0.045, 0.1, 6]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.83, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.18, 6]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  const world = useRef<THREE.Group>(null);

  useFrame(({ pointer }, delta) => {
    if (!world.current) return;
    const tx = pointer.y * 0.18;
    const ty = pointer.x * 0.3;
    world.current.rotation.x = THREE.MathUtils.damp(world.current.rotation.x, tx, 3, delta);
    world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, ty, 3, delta);
  });

  return (
    <group ref={world}>
      <KnowledgeGlobe />

      <OrbitRing radius={2.55} tilt={[1.15, 0.2, 0.35]} speed={0.25} color="#f59e0b" />
      <OrbitRing radius={3.1} tilt={[1.45, -0.35, -0.5]} speed={-0.18} color="#fcd34d" thickness={0.014} opacity={0.4} />
      <OrbitRing radius={3.6} tilt={[1.3, 0.6, 1.2]} speed={0.12} color="#5b9bc7" thickness={0.012} opacity={0.35} />

      <OrbitingBooks />
      <Pencil />

      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.6}>
        <GradCap position={[0.2, 3.0, -0.4]} rotation={[0.15, -0.3, -0.08]} scale={0.95} />
      </Float>

      <Sparkles count={70} scale={[9, 6, 5]} size={2.4} speed={0.35} color="#fcd34d" opacity={0.7} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={1.3} color="#fff7e6" />
      <pointLight position={[-7, -3, 4]} intensity={30} color="#f59e0b" />
      <pointLight position={[6, 4, -6]} intensity={26} color="#377fae" />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
