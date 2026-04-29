"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

const COUNT = 320;

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const swarmTimeRef = useRef(0);
  const { viewport, size } = useThree();

  const data = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 2] = 0;
    }
    return { pos, vel };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -((e.clientY / size.height) * 2 - 1);
      mouseRef.current.set((x * viewport.width) / 2, (y * viewport.height) / 2, 0);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [size.width, size.height, viewport.width, viewport.height]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    swarmTimeRef.current += delta;
    const swarmPulse = (Math.sin(swarmTimeRef.current * 0.25) + 1) * 0.5;
    const m = meshRef.current;
    const { pos, vel } = data;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const dx = mx - pos[ix];
      const dy = my - pos[ix + 1];
      const distSq = dx * dx + dy * dy + 0.001;
      const inv = 1 / Math.sqrt(distSq);

      // Cursor attraction (gentle), stronger during swarm pulse
      const attract = 0.0008 + swarmPulse * 0.0028;
      vel[ix] += dx * inv * attract;
      vel[ix + 1] += dy * inv * attract;

      // Gentle drift toward origin so they don't escape
      vel[ix] += -pos[ix] * 0.0006;
      vel[ix + 1] += -pos[ix + 1] * 0.0006;

      // Damping
      vel[ix] *= 0.96;
      vel[ix + 1] *= 0.96;

      // Velocity cap
      const speedSq = vel[ix] * vel[ix] + vel[ix + 1] * vel[ix + 1];
      const cap = 0.08;
      if (speedSq > cap * cap) {
        const s = cap / Math.sqrt(speedSq);
        vel[ix] *= s;
        vel[ix + 1] *= s;
      }

      pos[ix] += vel[ix];
      pos[ix + 1] += vel[ix + 1];

      tmpVec.set(pos[ix], pos[ix + 1], pos[ix + 2]);
      dummy.position.copy(tmpVec);
      dummy.scale.setScalar(0.018 + swarmPulse * 0.012);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ff791b" toneMapped={false} />
    </instancedMesh>
  );
}

function ConnectingLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = useMemo(() => new Float32Array(60 * 6), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < 60; i++) {
      const a = t * 0.2 + i * 0.4;
      const b = t * 0.15 + i * 0.7;
      positions[i * 6 + 0] = Math.cos(a) * 6;
      positions[i * 6 + 1] = Math.sin(a) * 4;
      positions[i * 6 + 2] = 0;
      positions[i * 6 + 3] = Math.cos(b) * 8;
      positions[i * 6 + 4] = Math.sin(b) * 5;
      positions[i * 6 + 5] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#ff791b" transparent opacity={0.08} />
    </lineSegments>
  );
}

export default function ActorSwarm() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduce);
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
        <ConnectingLines />
      </Canvas>
    </div>
  );
}
