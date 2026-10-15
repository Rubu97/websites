import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Vec3 = [number, number, number];

function EnamelMaterial({ tint = '#f7fbff' }: { tint?: string }) {
  return (
    <meshPhysicalMaterial
      color={tint}
      roughness={0.12}
      metalness={0.0}
      clearcoat={1}
      clearcoatRoughness={0.08}
      reflectivity={0.65}
      sheen={0.6}
      sheenColor="#bff3ff"
      envMapIntensity={0.9}
    />
  );
}

function Root({ position, rotation }: { position: Vec3; rotation: Vec3 }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <coneGeometry args={[0.34, 1.5, 48, 1, false]} />
      <EnamelMaterial tint="#eef6ff" />
    </mesh>
  );
}

function Cusp({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <EnamelMaterial />
    </mesh>
  );
}

export default function ToothModel({ ...props }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const crownGeo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 64, 64);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      v.y *= 0.95;
      v.z *= 0.95;
      if (v.y < 0) v.y *= 0.75;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
      group.current.position.y = Math.sin(t * 0.8) * 0.18;
      const px = state.pointer.x;
      const py = state.pointer.y;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.35, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, px * 0.22, 0.05);
    }
    if (inner.current) {
      inner.current.rotation.y = Math.sin(t * 0.4) * 0.12;
    }
  });

  return (
    <group ref={group} {...props}>
      <group ref={inner} position={[0, 0.15, 0]}>
        <mesh geometry={crownGeo} scale={[0.98, 0.92, 0.92]} castShadow>
          <EnamelMaterial />
        </mesh>

        <mesh position={[0, -0.62, 0]} scale={[0.86, 0.55, 0.86]}>
          <cylinderGeometry args={[0.86, 0.62, 1, 48]} />
          <EnamelMaterial tint="#eef6ff" />
        </mesh>

        <Cusp position={[-0.4, 0.78, 0.1]} scale={0.9} />
        <Cusp position={[0.42, 0.76, -0.1]} scale={0.85} />
        <Cusp position={[0.02, 0.86, 0.42]} scale={0.7} />
        <Cusp position={[0.0, 0.3, 0.9]} scale={0.45} />
        <Cusp position={[0.0, 0.32, -0.9]} scale={0.45} />

        <Root position={[-0.33, -1.35, 0.02]} rotation={[0.06, 0, 0.16]} />
        <Root position={[0.33, -1.35, -0.02]} rotation={[-0.06, 0, -0.16]} />
      </group>
    </group>
  );
}
