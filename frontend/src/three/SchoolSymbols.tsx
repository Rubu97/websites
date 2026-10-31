import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Book({
  color = '#d97706',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.15, 0.07, 0.82]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[1.06, 0.16, 0.74]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.15, 0.07, 0.82]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.265, 0.05]}>
        <boxGeometry args={[1.16, 0.02, 0.28]} />
        <meshStandardMaterial color="#fde68a" roughness={0.4} metalness={0.5} />
      </mesh>
    </group>
  );
}

export function GradCap({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* head cap */}
      <mesh position={[0, -0.26, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.46, 28]} />
        <meshStandardMaterial color="#0e2a41" roughness={0.4} metalness={0.25} />
      </mesh>
      {/* mortarboard */}
      <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.07, 1.5]} />
        <meshStandardMaterial color="#07192a" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.07, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.44, 0.03, 1.44]} />
        <meshStandardMaterial color="#123a5c" roughness={0.3} metalness={0.35} />
      </mesh>
      {/* button */}
      <mesh position={[0, 0.11, 0]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* tassel */}
      <mesh position={[0.38, 0.09, 0.38]} rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.72, 10]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} />
      </mesh>
      <mesh position={[0.72, -0.1, 0.72]}>
        <cylinderGeometry args={[0.02, 0.02, 0.45, 10]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} />
      </mesh>
      <mesh position={[0.72, -0.36, 0.72]}>
        <coneGeometry args={[0.07, 0.2, 12]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.45} />
      </mesh>
    </group>
  );
}

export function KnowledgeGlobe() {
  const wire = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (wire.current) wire.current.rotation.y += delta * 0.16;
    if (core.current) core.current.rotation.y -= delta * 0.05;
  });

  return (
    <group>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.72, 1]} />
        <meshBasicMaterial
          color="#fbbf24"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={core} scale={0.96}>
        <sphereGeometry args={[1.72, 48, 48]} />
        <meshPhysicalMaterial
          color="#0c2f49"
          roughness={0.22}
          metalness={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.78, 48, 48]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  thickness = 0.02,
  opacity = 0.55,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  thickness?: number;
  opacity?: number;
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
        opacity={opacity}
        roughness={0.25}
        metalness={0.3}
      />
    </mesh>
  );
}
