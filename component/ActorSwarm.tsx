"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ActorSwarm — narrative replacement for the placeholder robot.
 * A top-down tactical operations grid with ~110 cyan agents flowing
 * between objective beacons. Each agent picks an objective, heads to
 * it, and re-targets on arrival — producing visible flow lanes that
 * visualize Sigil's "drop a thousand actors, they form a city" copy.
 */

const FIELD = 5;            // half-extent of the operations grid
const COUNT = 110;          // number of agents
const SPEED = 0.7;          // base movement speed (units/sec)

const CYAN = "#5fe9ee";
const CYAN_DIM = "#3ccfd6";
const PRIMARY = "#ff791b";

const OBJECTIVES: [number, number, number][] = [
  [-3.2, 0.05, 2.4],
  [3.5, 0.05, -1.4],
  [-1.4, 0.05, -3.4],
  [2.4, 0.05, 3.4],
  [0, 0.05, 0],
];

type Agent = {
  x: number;
  z: number;
  target: number;
  jitter: number;
};

function Agents() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const agents = useMemo<Agent[]>(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        x: (Math.random() - 0.5) * 2 * FIELD,
        z: (Math.random() - 0.5) * 2 * FIELD,
        target: Math.floor(Math.random() * OBJECTIVES.length),
        jitter: 0.8 + Math.random() * 0.5,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < COUNT; i++) {
      const a = agents[i];
      const obj = OBJECTIVES[a.target];
      const dx = obj[0] - a.x;
      const dz = obj[2] - a.z;
      const d = Math.hypot(dx, dz) || 0.0001;

      if (d < 0.42) {
        let next: number;
        do {
          next = Math.floor(Math.random() * OBJECTIVES.length);
        } while (next === a.target);
        a.target = next;
      }

      const step = SPEED * a.jitter * dt;
      a.x += (dx / d) * step;
      a.z += (dz / d) * step;

      dummy.position.set(a.x, 0.07, a.z);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.085, 12, 12]} />
      <meshStandardMaterial
        color={CYAN}
        emissive={CYAN_DIM}
        emissiveIntensity={1.3}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

function Beacon({
  pos,
  idx,
}: {
  pos: [number, number, number];
  idx: number;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) {
      const s = 1 + Math.sin(t * 2 + idx * 0.7) * 0.18;
      ring.current.scale.set(s, 1, s);
    }
    if (pulse.current) {
      const cycle = ((t * 0.5 + idx * 0.4) % 2) / 2;
      const s = 0.6 + cycle * 4;
      pulse.current.scale.set(s, 1, s);
      const m = pulse.current.material as THREE.MeshBasicMaterial;
      m.opacity = (1 - cycle) * 0.55;
    }
  });

  return (
    <group position={pos}>
      <mesh
        ref={ring}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.012, 0]}
      >
        <ringGeometry args={[0.22, 0.28, 28]} />
        <meshBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
      <mesh
        ref={pulse}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.006, 0]}
      >
        <ringGeometry args={[0.28, 0.3, 32]} />
        <meshBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 18]} />
        <meshStandardMaterial
          color={PRIMARY}
          emissive={PRIMARY}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[FIELD * 2 + 2, FIELD * 2 + 2]} />
        <meshStandardMaterial color="#0a0908" roughness={0.95} />
      </mesh>
      <gridHelper
        args={[FIELD * 2 + 2, 24, "#231a14", "#231a14"]}
        position={[0, 0.001, 0]}
      />
      <gridHelper
        args={[1.6, 1, "#3a2810", "#3a2810"]}
        position={[0, 0.002, 0]}
      />
    </>
  );
}

export default function ActorSwarm() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <Canvas
        camera={{ position: [0, 7, 6.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[6, 12, 4]}
          intensity={0.6}
          color="#fff8eb"
        />
        <pointLight position={[0, 4, 0]} intensity={0.4} color={CYAN} />
        <pointLight position={[3, 2, -3]} intensity={0.3} color={PRIMARY} />

        <Floor />
        <Agents />
        {OBJECTIVES.map((p, i) => (
          <Beacon key={i} pos={p} idx={i} />
        ))}
      </Canvas>
    </div>
  );
}
