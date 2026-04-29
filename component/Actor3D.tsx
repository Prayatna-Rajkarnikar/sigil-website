"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Sphere } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { exo } from "@/app/font";

type Trait = { label: string; desc: string; angle: number };

const TRAITS: Trait[] = [
  { label: "PERCEPTION", desc: "Multi-modal sensory ingestion", angle: 0 },
  { label: "MEMORY", desc: "Episodic + semantic recall", angle: 72 },
  { label: "GOALS", desc: "Hierarchical objectives", angle: 144 },
  { label: "POLICY", desc: "Goal-directed planning", angle: 216 },
  { label: "ACTION", desc: "Tool use & coordination", angle: 288 },
];

const RADIUS = 3.2;

function Core({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.3;
    ref.current.rotation.x += dt * 0.12;
    const target = active ? 1.18 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ff791b"
          emissive="#ff791b"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial color="#ff791b" transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

function OrbitRing({ radius, opacity = 0.25 }: { radius: number; opacity?: number }) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const t = (i / 128) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    return arr;
  }, [radius]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geo} attach="geometry" />
      <lineBasicMaterial color="#ff791b" transparent opacity={opacity} />
    </line>
  );
}

function Node({
  trait,
  active,
  onHover,
  onLeave,
  onSelect,
}: {
  trait: Trait;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseAngle = (trait.angle * Math.PI) / 180;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * 0.18 + baseAngle;
    ref.current.position.x = Math.cos(t) * RADIUS;
    ref.current.position.z = Math.sin(t) * RADIUS;
    ref.current.position.y = Math.sin(t * 2 + baseAngle) * 0.25;
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
      }}
      onPointerOut={onLeave}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <mesh>
        <sphereGeometry args={[active ? 0.22 : 0.16, 24, 24]} />
        <meshStandardMaterial
          color="#ff791b"
          emissive="#ff791b"
          emissiveIntensity={active ? 1.6 : 0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.45 : 0.32, 24, 24]} />
        <meshBasicMaterial color="#ff791b" transparent opacity={active ? 0.18 : 0.08} />
      </mesh>
      <Html distanceFactor={8} style={{ pointerEvents: "none" }}>
        <div
          className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em] ${
            active ? "text-primary" : "text-foreground"
          }`}
          style={{ transform: "translate(12px, -50%)" }}
        >
          {trait.label}
        </div>
      </Html>
    </group>
  );
}

export default function Actor3D() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(TRAITS[0].label);
  const active = hovered ?? selected;
  const activeTrait = TRAITS.find((t) => t.label === active) ?? TRAITS[0];

  return (
    <div className="corner-brackets relative aspect-square w-full max-w-md mx-auto border border-primary/30 bg-background/60 backdrop-blur-sm">
      <span className="corner-bl"></span>
      <span className="corner-br"></span>

      <div className="absolute top-3 left-6 z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
        ACTOR.SCHEMA / v4
      </div>
      <div className="absolute top-3 right-6 z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
        ID #04-2761
      </div>

      <Canvas camera={{ position: [0, 2.6, 7.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff791b" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#ffffff" />

        <Core active={!!hovered} />
        <OrbitRing radius={RADIUS} />
        <OrbitRing radius={RADIUS * 0.55} opacity={0.12} />

        {TRAITS.map((t) => (
          <Node
            key={t.label}
            trait={t}
            active={active === t.label}
            onHover={() => setHovered(t.label)}
            onLeave={() => setHovered(null)}
            onSelect={() => setSelected(t.label)}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          rotateSpeed={0.4}
        />
      </Canvas>

      <div className="absolute bottom-3 left-6 right-6 z-10 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-muted">
        <span>STATUS · NOMINAL</span>
        <span className="text-primary">●</span>
        <span>UPLINK · OPEN</span>
      </div>

      <div className="absolute bottom-12 left-1/2 z-10 w-[80%] -translate-x-1/2 border border-primary/30 bg-background/85 px-4 py-3 backdrop-blur-sm">
        <div className={`${exo.className} text-sm font-black text-primary`}>
          {activeTrait.label}
        </div>
        <div className="mt-1 text-[11px] text-muted">{activeTrait.desc}</div>
      </div>
    </div>
  );
}
