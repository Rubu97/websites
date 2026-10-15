import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ToothModel from './ToothModel';

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  thickness = 0.02,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  thickness?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 24, 160]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        transparent
        opacity={0.55}
        roughness={0.25}
        metalness={0.3}
      />
    </mesh>
  );
}

function FloatingBlob({
  position,
  color,
  size,
  shape,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  shape: 'ico' | 'torus' | 'sphere';
}) {
  return (
    <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh position={position}>
        {shape === 'ico' && <icosahedronGeometry args={[size, 0]} />}
        {shape === 'torus' && <torusKnotGeometry args={[size * 0.7, size * 0.24, 80, 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[size, 32, 32]} />}
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function SceneContents() {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(
        rig.current.rotation.y,
        state.pointer.x * 0.18,
        0.04
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 6]} intensity={2.4} color="#ffffff" castShadow />
      <directionalLight position={[-6, -2, -4]} intensity={0.9} color="#67e8f9" />
      <pointLight position={[0, 2, 4]} intensity={22} color="#22d3ee" distance={12} />
      <pointLight position={[-4, -3, 2]} intensity={12} color="#5b9bc7" distance={12} />
      <spotLight position={[0, 9, 3]} angle={0.5} penumbra={1} intensity={30} color="#ffffff" />

      <group ref={rig}>
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
          <ToothModel position={[0, 0.1, 0]} scale={1.15} />
        </Float>

        <OrbitRing radius={2.5} tilt={[1.2, 0.4, 0.2]} speed={0.35} color="#22d3ee" thickness={0.018} />
        <OrbitRing radius={3.1} tilt={[0.6, 1.1, -0.4]} speed={-0.22} color="#7ff0d0" thickness={0.014} />
        <OrbitRing radius={3.7} tilt={[1.5, -0.5, 0.9]} speed={0.16} color="#38bdf8" thickness={0.01} />

        <FloatingBlob position={[-3.1, 1.4, -0.6]} color="#67e8f9" size={0.42} shape="ico" />
        <FloatingBlob position={[3.3, -0.9, -0.4]} color="#7ff0d0" size={0.34} shape="sphere" />
        <FloatingBlob position={[2.7, 1.9, -1.2]} color="#38bdf8" size={0.28} shape="torus" />
        <FloatingBlob position={[-2.9, -1.6, -0.8]} color="#a5f3fc" size={0.3} shape="sphere" />

        <Sparkles count={90} scale={[11, 9, 8]} size={3} speed={0.35} color="#bff3ff" opacity={0.8} />
      </group>

      <ContactShadows
        position={[0, -3.1, 0]}
        opacity={0.32}
        scale={14}
        blur={3}
        far={6}
        color="#0e2a41"
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
