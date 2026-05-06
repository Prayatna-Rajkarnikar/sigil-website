"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ActorSim — single agent inside a wireframe simulated environment.
 * Visualises the Sigil narrative directly:
 *   • a synthetic terrain (wireframe grid) — the simulated environment
 *   • a single glowing actor — the autonomous AI agent
 *   • a sensor cone extending in front — agent perceiving
 *   • ghost decision paths fanning out — agent reasoning under uncertainty
 *   • one ghost path solidifies; actor walks it — agent acting
 *   • loop repeats with a "REHEARSAL N/∞" tick badge top-left
 */

const CYAN = "#5fe9ee";
const CYAN_DIM = "#3ccfd6";
const PRIMARY = "#ff791b";

const FIELD = 6;          // half-extent of the terrain
const POI_COUNT = 6;
const DELIBERATE_MS = 1100;
const SPEED = 1.2;        // units/sec

type POI = { x: number; z: number };

const POIS: POI[] = [
  { x: -3.5, z: 2.4 },
  { x: 3.6, z: -1.5 },
  { x: -2.0, z: -3.4 },
  { x: 2.4, z: 3.4 },
  { x: 0.5, z: 0.5 },
  { x: -4.3, z: -1.2 },
];

function Terrain() {
  const fineWire = useMemo(() => {
    const geo = new THREE.PlaneGeometry(FIELD * 2, FIELD * 2, 24, 24);
    geo.rotateX(-Math.PI / 2);
    return new THREE.WireframeGeometry(geo);
  }, []);
  const coarseWire = useMemo(() => {
    const geo = new THREE.PlaneGeometry(FIELD * 2, FIELD * 2, 12, 12);
    geo.rotateX(-Math.PI / 2);
    return new THREE.WireframeGeometry(geo);
  }, []);
  return (
    <>
      {/* fine faint grid */}
      <lineSegments position={[0, 0, 0]}>
        <primitive object={fineWire} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.18} />
      </lineSegments>
      {/* coarser brighter overlay */}
      <lineSegments position={[0, 0.001, 0]}>
        <primitive object={coarseWire} attach="geometry" />
        <lineBasicMaterial color={PRIMARY} transparent opacity={0.32} />
      </lineSegments>
      {/* ground fill (very dark) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[FIELD * 2, FIELD * 2]} />
        <meshBasicMaterial color="#0a0908" />
      </mesh>
    </>
  );
}

function POIMarkers() {
  return (
    <>
      {POIS.map((p, i) => (
        <group key={i} position={[p.x, 0.06, p.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.18, 0.24, 4]} />
            <meshBasicMaterial color={PRIMARY} transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color={PRIMARY}
              emissive={PRIMARY}
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

type Phase = "deliberate" | "walk";

type Sim = {
  pos: THREE.Vector3;
  heading: number;              // radians around Y
  phase: Phase;
  phaseStart: number;
  current: POI;
  target: POI;
  candidates: POI[];
  chosenIdx: number;
  rehearsal: number;
};

function pickCandidates(current: POI, count = 4): POI[] {
  const others = POIS.filter((p) => p !== current);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function ActorAndPaths() {
  const actorRef = useRef<THREE.Group>(null);
  const sensorRef = useRef<THREE.Mesh>(null);
  const ghostMatRefs = useRef<THREE.LineBasicMaterial[]>([]);
  const ghostGeoRefs = useRef<THREE.BufferGeometry[]>([]);

  // 4 ghost-path placeholders (we cap at 4 candidates per cycle)
  const ghostCount = 4;

  const sim = useRef<Sim>({
    pos: new THREE.Vector3(POIS[0].x, 0.07, POIS[0].z),
    heading: 0,
    phase: "deliberate",
    phaseStart: 0,
    current: POIS[0],
    target: POIS[1],
    candidates: pickCandidates(POIS[0], ghostCount),
    chosenIdx: 0,
    rehearsal: 1,
  });

  // trail history (last N positions)
  const trailPoints = useRef<THREE.Vector3[]>([]);
  const trailGeo = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const s = sim.current;
    if (!actorRef.current) return;

    // ── PHASE: DELIBERATE ────────────────────────────────────
    if (s.phase === "deliberate") {
      const elapsed = (t - s.phaseStart) * 1000;
      const progress = Math.min(elapsed / DELIBERATE_MS, 1);
      // animate ghost-path opacities + lengths
      for (let i = 0; i < ghostCount; i++) {
        const cand = s.candidates[i];
        const mat = ghostMatRefs.current[i];
        const geo = ghostGeoRefs.current[i];
        if (!mat || !geo) continue;
        if (!cand) {
          mat.opacity = 0;
          continue;
        }
        // line grows from actor toward candidate
        const lineProg = Math.min(progress * 1.5, 1);
        const ex = s.pos.x + (cand.x - s.pos.x) * lineProg;
        const ez = s.pos.z + (cand.z - s.pos.z) * lineProg;
        geo.setFromPoints([
          new THREE.Vector3(s.pos.x, 0.04, s.pos.z),
          new THREE.Vector3(ex, 0.04, ez),
        ]);
        // chosen path glows brighter at end of deliberation
        const isChosen = i === s.chosenIdx;
        const baseOpacity = isChosen ? 0.35 + progress * 0.5 : 0.35 - progress * 0.25;
        mat.opacity = baseOpacity;
        mat.color.set(isChosen && progress > 0.6 ? CYAN : PRIMARY);
      }

      if (progress >= 1) {
        s.phase = "walk";
        s.phaseStart = t;
        s.target = s.candidates[s.chosenIdx];
      }
    }

    // ── PHASE: WALK ──────────────────────────────────────────
    if (s.phase === "walk") {
      const dx = s.target.x - s.pos.x;
      const dz = s.target.z - s.pos.z;
      const d = Math.hypot(dx, dz);
      const step = SPEED * delta;

      if (d < 0.15) {
        // arrived — start next deliberation
        s.pos.set(s.target.x, 0.07, s.target.z);
        s.current = s.target;
        s.candidates = pickCandidates(s.current, ghostCount);
        s.chosenIdx = Math.floor(Math.random() * s.candidates.length);
        s.phase = "deliberate";
        s.phaseStart = t;
        s.rehearsal += 1;
      } else {
        const nx = (dx / d) * step;
        const nz = (dz / d) * step;
        s.pos.x += nx;
        s.pos.z += nz;
        s.heading = Math.atan2(nx, nz);
      }

      // dim ghost paths during walk; chosen one stays as the trail
      for (let i = 0; i < ghostCount; i++) {
        const mat = ghostMatRefs.current[i];
        const geo = ghostGeoRefs.current[i];
        if (!mat || !geo) continue;
        if (i === s.chosenIdx) {
          // chosen path: redraw from actor to target as it walks
          geo.setFromPoints([
            new THREE.Vector3(s.pos.x, 0.04, s.pos.z),
            new THREE.Vector3(s.target.x, 0.04, s.target.z),
          ]);
          mat.opacity = 0.85;
          mat.color.set(CYAN);
        } else {
          mat.opacity = Math.max(0, mat.opacity - delta * 1.5);
        }
      }
    }

    // ── ACTOR transform ──────────────────────────────────────
    actorRef.current.position.copy(s.pos);
    actorRef.current.rotation.y = s.heading;

    // sensor cone gently flickers
    if (sensorRef.current) {
      const m = sensorRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 + Math.sin(t * 4) * 0.04;
    }

    // ── trail ─────────────────────────────────────────────
    trailPoints.current.push(s.pos.clone());
    if (trailPoints.current.length > 80) trailPoints.current.shift();
    trailGeo.setFromPoints(trailPoints.current);
  });

  return (
    <>
      {/* GHOST DECISION PATHS (4 reusable line slots) */}
      {Array.from({ length: ghostCount }).map((_, i) => (
        <line key={i}>
          <bufferGeometry
            attach="geometry"
            ref={(el) => {
              if (el) ghostGeoRefs.current[i] = el as unknown as THREE.BufferGeometry;
            }}
          />
          <lineBasicMaterial
            attach="material"
            ref={(el) => {
              if (el) ghostMatRefs.current[i] = el;
            }}
            color={PRIMARY}
            transparent
            opacity={0}
          />
        </line>
      ))}

      {/* TRAIL — line history of where the actor has been */}
      <line>
        <primitive object={trailGeo} attach="geometry" />
        <lineBasicMaterial color={CYAN_DIM} transparent opacity={0.45} />
      </line>

      {/* ACTOR */}
      <group ref={actorRef}>
        {/* sensor cone (flat triangle on the ground in front) */}
        <mesh ref={sensorRef} position={[0, 0.005, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 1.4, 24, 1, true, -Math.PI / 2 - 0.5, 1.0]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
        {/* actor body — small upward triangle/cone */}
        <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.32, 4]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN_DIM}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        {/* actor halo */}
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.3, 24]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.45} />
        </mesh>
      </group>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 4]} intensity={0.6} color="#fff8eb" />
      <pointLight position={[0, 4, 0]} intensity={0.4} color={CYAN} />
      <pointLight position={[3, 2, -3]} intensity={0.3} color={PRIMARY} />

      <Terrain />
      <POIMarkers />
      <ActorAndPaths />
    </>
  );
}

export default function ActorSim() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* HUD chrome — tells the viewer this is a simulation */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        SIM · REHEARSAL
      </div>
      <div className="pointer-events-none absolute right-3 top-3 z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
        ENV.WIRE / 24×24
      </div>
      <div className="pointer-events-none absolute left-3 bottom-3 z-10 text-[9px] uppercase tracking-[0.3em] text-muted">
        ACTOR-01
      </div>
      <div className="pointer-events-none absolute right-3 bottom-3 z-10 text-[9px] uppercase tracking-[0.3em] text-muted">
        TICK · LIVE
      </div>

      <Canvas
        camera={{ position: [0, 6.5, 7.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
