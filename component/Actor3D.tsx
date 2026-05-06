"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Actor3D — cognitive loop diagram for the "Meet the Actor" section.
 * Glowing icosahedron core + four fixed trait nodes (Perceive,
 * Remember, Reason, Act). Particles travel along node↔core connector
 * lines on a 2.4s cycle, staggered so the loop reads as
 * Perceive → Remember → Reason → Act → repeat.
 */

const CYAN = "#5fe9ee";
const CYAN_DIM = "#3ccfd6";
const PRIMARY = "#ff791b";

const RING_R = 1.4;
const CYCLE = 2.4; // seconds per full loop

type Trait = {
  id: string;
  label: string;
  pos: [number, number, number];
  labelOffset: [number, number];
};

const TRAITS: Trait[] = [
  { id: "perceive", label: "PERCEIVE", pos: [0, RING_R, 0], labelOffset: [0, 0.42] },
  { id: "remember", label: "REMEMBER", pos: [-RING_R, 0, 0], labelOffset: [-0.6, 0] },
  { id: "reason",   label: "REASON",   pos: [0, -RING_R, 0], labelOffset: [0, -0.42] },
  { id: "act",      label: "ACT",      pos: [RING_R, 0, 0],  labelOffset: [0.4, 0] },
];

type NumArrayRef = React.MutableRefObject<number[]>;
type Vec3ArrayRef = React.MutableRefObject<[number, number, number][]>;

function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const breath = 1 + Math.sin(t * 1.2) * 0.04;
    if (inner.current) {
      inner.current.rotation.y += dt * 0.25;
      inner.current.rotation.x += dt * 0.05;
      inner.current.scale.setScalar(breath);
    }
    if (wire.current) {
      wire.current.rotation.y -= dt * 0.15;
      wire.current.scale.setScalar(breath * 1.06);
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN_DIM}
          emissiveIntensity={1.0}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.65, 1]} />
        <meshBasicMaterial color={PRIMARY} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const geo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <line>
      <primitive object={geo} attach="geometry" />
      <lineBasicMaterial color={PRIMARY} transparent opacity={0.18} />
    </line>
  );
}

function Connector({
  to,
  index,
  opacities,
}: {
  to: [number, number, number];
  index: number;
  opacities: NumArrayRef;
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const geo = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...to),
      ]),
    [to],
  );

  useFrame(() => {
    if (matRef.current) matRef.current.opacity = opacities.current[index];
  });

  return (
    <line>
      <primitive object={geo} attach="geometry" />
      <lineBasicMaterial ref={matRef} color={PRIMARY} transparent opacity={0.18} />
    </line>
  );
}

function Node({
  pos,
  index,
  scales,
  haloOpacities,
}: {
  pos: [number, number, number];
  index: number;
  scales: NumArrayRef;
  haloOpacities: NumArrayRef;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (sphereRef.current) sphereRef.current.scale.setScalar(scales.current[index]);
    if (haloMatRef.current) haloMatRef.current.opacity = haloOpacities.current[index];
  });

  return (
    <group position={pos}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN_DIM}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={CYAN}
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Particle({
  index,
  positions,
}: {
  index: number;
  positions: Vec3ArrayRef;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const [x, y, z] = positions.current[index];
      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color={CYAN} toneMapped={false} />
    </mesh>
  );
}

function LoopDriver({
  scales,
  haloOpacities,
  connectorOpacities,
  positions,
}: {
  scales: NumArrayRef;
  haloOpacities: NumArrayRef;
  connectorOpacities: NumArrayRef;
  positions: Vec3ArrayRef;
}) {
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < TRAITS.length; i++) {
      const trait = TRAITS[i];
      const localPhase = (t / CYCLE + i * 0.25) % 1;

      // particle: triangle wave, 0 at start (at node) → 1 at middle (at core) → 0 at end
      const tri = localPhase < 0.5 ? localPhase * 2 : (1 - localPhase) * 2;
      positions.current[i] = [
        trait.pos[0] * (1 - tri),
        trait.pos[1] * (1 - tri),
        trait.pos[2] * (1 - tri),
      ];

      // node pulses near the ends of its cycle (when particle is at the node)
      let pulse = 0;
      if (localPhase < 0.15) pulse = 1 - localPhase / 0.15;
      else if (localPhase > 0.85) pulse = (localPhase - 0.85) / 0.15;
      pulse = pulse * pulse * (3 - 2 * pulse);

      scales.current[i] = 1 + pulse * 0.35;
      haloOpacities.current[i] = 0.18 + pulse * 0.4;

      // connector brightest mid-transit
      const transit = 1 - Math.abs(localPhase * 2 - 1);
      connectorOpacities.current[i] = 0.18 + transit * 0.7;
    }
  });

  return null;
}

function Scene() {
  const scales = useRef<number[]>([1, 1, 1, 1]);
  const haloOpacities = useRef<number[]>([0.18, 0.18, 0.18, 0.18]);
  const connectorOpacities = useRef<number[]>([0.18, 0.18, 0.18, 0.18]);
  const positions = useRef<[number, number, number][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={0.8} color="#fff8eb" />
      <pointLight position={[0, 2, 2]} intensity={0.6} color={CYAN} />
      <pointLight position={[3, 1, -3]} intensity={0.4} color={PRIMARY} />

      <Core />
      <OrbitRing radius={RING_R} />

      {TRAITS.map((trait, i) => (
        <group key={trait.id}>
          <Connector to={trait.pos} index={i} opacities={connectorOpacities} />
          <Node pos={trait.pos} index={i} scales={scales} haloOpacities={haloOpacities} />
          <Particle index={i} positions={positions} />
          <Html
            position={[
              trait.pos[0] + trait.labelOffset[0],
              trait.pos[1] + trait.labelOffset[1],
              trait.pos[2],
            ]}
            center
            distanceFactor={6}
            style={{ pointerEvents: "none" }}
          >
            <div className="flex items-center gap-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              <span className="h-1 w-1 bg-primary"></span>
              {trait.label}
            </div>
          </Html>
        </group>
      ))}

      <LoopDriver
        scales={scales}
        haloOpacities={haloOpacities}
        connectorOpacities={connectorOpacities}
        positions={positions}
      />
    </>
  );
}

export default function Actor3D() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
