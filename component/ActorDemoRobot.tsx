"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * ActorDemoRobot — same character / body as MissionAgent3D, but instead of
 * a periodic salute the right arm performs a continuous "hello" wave.
 */

const SHELL = "#f1ecdf";
const VISOR = "#0a0908";
const CYAN = "#3ccfd6";
const CYAN_HOT = "#5fe9ee";
const DARK = "#15110d";
const JOINT = "#2a2723";

function GlossyShell() {
  return (
    <meshPhysicalMaterial
      color={SHELL}
      metalness={0.05}
      roughness={0.4}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
    />
  );
}

function Robot() {
  const headRef = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const chinDot = useRef<THREE.Mesh>(null);

  /* right-arm pivots — continuous wave */
  const rShoulder = useRef<THREE.Group>(null);
  const rElbow = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* head — gentle look-around + nod */
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.12;
      headRef.current.rotation.x = -0.06 + Math.sin(t * 1.1) * 0.03;
    }

    /* eyes — gentle flicker */
    const eyeBase = 1.5 + Math.sin(t * 3) * 0.3;
    if (eyeL.current)
      (eyeL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeBase;
    if (eyeR.current)
      (eyeR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeBase;
    if (chinDot.current)
      (chinDot.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.1 + Math.sin(t * 2) * 0.4;

    /* WAVE — right arm raised straight up; forearm sways side-to-side */
    if (rShoulder.current && rElbow.current) {
      rShoulder.current.rotation.z = 2.75 + Math.sin(t * 2.4) * 0.12;
      rShoulder.current.rotation.x = -0.25;
      rElbow.current.rotation.x = -0.7;
      rElbow.current.rotation.z = Math.sin(t * 2.4 + 0.5) * 0.45;
    }
  });

  /* visor sphere-segment params (same as hero / mission) */
  const visorPhiCenter = Math.PI / 2;
  const visorPhiLen = 2.1;
  const visorPhiStart = visorPhiCenter - visorPhiLen / 2;
  const visorThetaStart = 0.95;
  const visorThetaLen = 0.78;

  return (
    <group position={[0, -0.85, 0]}>
      {/* HEAD */}
      <group ref={headRef} position={[0, 1.05, 0]}>
        <group scale={0.55}>
          {/* skull */}
          <mesh>
            <sphereGeometry args={[0.85, 48, 48]} />
            <GlossyShell />
          </mesh>
          {/* wraparound visor */}
          <mesh>
            <sphereGeometry
              args={[0.87, 64, 48, visorPhiStart, visorPhiLen, visorThetaStart, visorThetaLen]}
            />
            <meshStandardMaterial
              color={VISOR}
              metalness={1.0}
              roughness={0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* SMILING EYES — half-torus arcs (∩) instead of round dots */}
          <mesh ref={eyeL} position={[-0.22, 0.06, 0.83]}>
            <torusGeometry args={[0.085, 0.02, 8, 22, Math.PI]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          <mesh ref={eyeR} position={[0.22, 0.06, 0.83]}>
            <torusGeometry args={[0.085, 0.02, 8, 22, Math.PI]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          {/* SMILE — wide grin showing teeth */}
          {/* dark mouth interior (slightly recessed behind teeth) */}
          <mesh position={[0, -0.34, 0.755]}>
            <boxGeometry args={[0.34, 0.13, 0.02]} />
            <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.6} />
          </mesh>
          {/* TEETH — row of 5 white tiles */}
          {[-0.12, -0.06, 0, 0.06, 0.12].map((x, i) => (
            <mesh key={i} position={[x, -0.32, 0.768]}>
              <boxGeometry args={[0.045, 0.07, 0.02]} />
              <meshStandardMaterial color={SHELL} metalness={0.05} roughness={0.45} />
            </mesh>
          ))}
          {/* SMILE LIP — cyan U-arc framing the bottom of the grin */}
          <mesh ref={chinDot} position={[0, -0.34, 0.778]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.18, 0.012, 6, 26, Math.PI]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.2} />
          </mesh>
          {/* ear discs */}
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.85, 0, 0]}>
              <mesh position={[s * 0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.06, 36]} />
                <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.28} />
              </mesh>
              <mesh position={[s * 0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.16, 0.16, 0.022, 36]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.3} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* NECK */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.13, 0.16, 0.18, 18]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.32} />
      </mesh>

      {/* ── TORSO — segmented: chest + waist + hip ── */}
      {/* CHEST */}
      <RoundedBox
        args={[0.78, 0.45, 0.55]}
        radius={0.16}
        smoothness={5}
        position={[0, 0.27, 0]}
      >
        <GlossyShell />
      </RoundedBox>
      <mesh position={[0, 0.49, 0.275]}>
        <boxGeometry args={[0.74, 0.025, 0.02]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* WAIST */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.16, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.0, 0.27]}>
        <boxGeometry args={[0.42, 0.018, 0.008]} />
        <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={0.9} />
      </mesh>

      {/* HIP */}
      <RoundedBox
        args={[0.7, 0.3, 0.55]}
        radius={0.14}
        smoothness={5}
        position={[0, -0.22, 0]}
      >
        <GlossyShell />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.3, -0.22, 0.275]}>
          <boxGeometry args={[0.1, 0.16, 0.014]} />
          <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* CHEST EMBLEM */}
      <mesh position={[0, 0.32, 0.281]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.32, 0.295]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.012, 24]} />
        <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.3} />
      </mesh>

      {/* SHOULDERS */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.42, 0.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 22, 22]} />
            <GlossyShell />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.155, 0.025, 12, 28]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[s * 0.16, 0, 0.05]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* LEFT ARM — hangs idle */}
      <Arm side={-1} />

      {/* RIGHT ARM — waves */}
      <ArmAnimated rShoulder={rShoulder} rElbow={rElbow} />
    </group>
  );
}

function ArmSegments() {
  return (
    <>
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.13, 0.4, 8, 16]} />
        <GlossyShell />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.05, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
    </>
  );
}

function ForearmAndHand({ flipPalm = false }: { flipPalm?: boolean }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.15, 22, 22]} />
        <meshStandardMaterial color={JOINT} metalness={0.78} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <cylinderGeometry args={[0.038, 0.038, 0.012, 18]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <capsuleGeometry args={[0.115, 0.42, 8, 16]} />
        <GlossyShell />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.04, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.66, 0]}>
        <sphereGeometry args={[0.085, 18, 18]} />
        <meshStandardMaterial color={JOINT} metalness={0.78} roughness={0.4} />
      </mesh>
      {flipPalm ? (
        <group rotation={[0, Math.PI, 0]}>
          <Hand />
        </group>
      ) : (
        <Hand />
      )}
    </>
  );
}

function Hand() {
  return (
    <group position={[0, -0.78, 0]}>
      <RoundedBox args={[0.15, 0.18, 0.1]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <GlossyShell />
      </RoundedBox>
      <mesh position={[0, -0.07, 0.045]}>
        <boxGeometry args={[0.13, 0.018, 0.012]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      {[-0.045, 0, 0.045].map((x, i) => (
        <RoundedBox
          key={i}
          args={[0.032, 0.1, 0.05]}
          radius={0.012}
          smoothness={3}
          position={[x, -0.15, 0.01]}
        >
          <GlossyShell />
        </RoundedBox>
      ))}
      <RoundedBox
        args={[0.034, 0.09, 0.05]}
        radius={0.013}
        smoothness={3}
        position={[-0.085, -0.06, 0.02]}
        rotation={[0, 0, 0.55]}
      >
        <GlossyShell />
      </RoundedBox>
    </group>
  );
}

function Arm({ side }: { side: -1 | 1 }) {
  return (
    <group position={[side * 0.42, 0.4, 0]}>
      <ArmSegments />
      <group position={[0, -0.62, 0]}>
        <ForearmAndHand />
      </group>
    </group>
  );
}

function ArmAnimated({
  rShoulder,
  rElbow,
}: {
  rShoulder: React.RefObject<THREE.Group | null>;
  rElbow: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={rShoulder} position={[0.42, 0.4, 0]}>
      <ArmSegments />
      <group ref={rElbow} position={[0, -0.62, 0]}>
        <ForearmAndHand flipPalm />
      </group>
    </group>
  );
}

/* ─── GAME-STAGE ELEMENTS — pedestal, aura rings, spiraling particles ─── */

function HexPedestal() {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.3;
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.08 + Math.sin(t * 2) * 0.03;
    }
  });
  return (
    <group position={[0, -1.78, 0]}>
      {/* solid hex base */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.3, 0.18, 6]} />
        <meshStandardMaterial color="#15110d" metalness={0.7} roughness={0.45} />
      </mesh>
      {/* glowing top edge */}
      <mesh position={[0, 0.095, 0]}>
        <torusGeometry args={[1.45, 0.022, 16, 64]} />
        <meshStandardMaterial
          color={CYAN_HOT}
          emissive={CYAN_HOT}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      {/* rotating decorative inscription ring */}
      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.32, 6, 1]} />
        <meshBasicMaterial color="#ff791b" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* underglow puddle */}
      <mesh ref={glowRef} position={[0, -0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.6, 32]} />
        <meshBasicMaterial color={CYAN_HOT} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function AuraRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.55;
    if (r2.current) r2.current.rotation.z = -t * 0.35;
    if (r3.current) r3.current.rotation.z = t * 0.25;
  });
  return (
    <group position={[0, -0.9, 0]}>
      {/* low waist-height cyan ring */}
      <mesh ref={r1} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.012, 8, 80]} />
        <meshBasicMaterial color={CYAN_HOT} transparent opacity={0.65} toneMapped={false} />
      </mesh>
      {/* mid-height orange ring */}
      <mesh ref={r2} rotation={[-Math.PI / 2 + 0.18, 0, 0]} position={[0, 0.45, 0]}>
        <torusGeometry args={[1.0, 0.008, 8, 64]} />
        <meshBasicMaterial color="#ff791b" transparent opacity={0.5} toneMapped={false} />
      </mesh>
      {/* high cyan ring */}
      <mesh ref={r3} rotation={[-Math.PI / 2 - 0.12, 0, 0]} position={[0, 1.1, 0]}>
        <torusGeometry args={[0.78, 0.008, 8, 56]} />
        <meshBasicMaterial color={CYAN_HOT} transparent opacity={0.45} toneMapped={false} />
      </mesh>
    </group>
  );
}

const PARTICLE_COUNT = 36;
function Particles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seed = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.95 + Math.random() * 0.7,
        speed: 0.35 + Math.random() * 0.35,
        ySeed: Math.random() * 3,
        size: 0.025 + Math.random() * 0.025,
      })),
    [],
  );
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = seed[i];
      const a = p.angle + t * p.speed;
      const cycle = (p.ySeed + t * 0.6) % 3;
      const y = -1.7 + cycle; // rises from -1.7 to 1.3 then loops
      dummy.position.set(Math.cos(a) * p.radius, y, Math.sin(a) * p.radius);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={CYAN_HOT} toneMapped={false} />
    </instancedMesh>
  );
}

/* ─── HUD CHROME — game-style overlay ─── */

function HUDBar({ label, value, tone }: { label: string; value: number; tone: "cyan" | "orange" }) {
  const fillColor = tone === "cyan" ? "bg-[#5fe9ee]" : "bg-primary";
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 text-[8px] font-bold uppercase tracking-[0.18em] text-muted">{label}</div>
      <div className="relative flex-1 h-1.5 bg-white/8 border border-white/10">
        <div className={`h-full ${fillColor}`} style={{ width: `${value * 100}%` }}></div>
      </div>
      <div className="w-8 text-right text-[8px] font-bold tracking-widest text-foreground">
        {Math.round(value * 100)}
      </div>
    </div>
  );
}

const SKILLS = [
  { id: "Q", label: "PRC", glyph: "◎" },
  { id: "W", label: "MEM", glyph: "↺" },
  { id: "E", label: "RSN", glyph: "ϟ" },
  { id: "R", label: "ACT", glyph: "✦" },
];

function SkillIcon({ skill, ulti, cooldown }: { skill: typeof SKILLS[number]; ulti?: boolean; cooldown?: number }) {
  return (
    <div
      className={`relative flex h-10 w-10 flex-col items-center justify-center border ${
        ulti ? "border-primary bg-primary/15" : "border-white/30 bg-background/70"
      } backdrop-blur-sm`}
    >
      <div className={`text-[14px] leading-none ${ulti ? "text-primary" : "text-foreground"}`}>{skill.glyph}</div>
      <div className="text-[7px] mt-0.5 font-bold uppercase tracking-[0.15em] text-muted">{skill.label}</div>
      <div className="absolute -top-1 -right-1 px-1 text-[7px] font-bold bg-background border border-white/20 text-foreground">
        {skill.id}
      </div>
      {cooldown != null && cooldown > 0 && (
        <div className="absolute inset-0 bg-background/70 flex items-center justify-center text-[10px] font-black text-primary">
          {cooldown.toFixed(1)}
        </div>
      )}
    </div>
  );
}

export default function ActorDemoRobot() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto select-none">
      {/* HUD: top-left character banner */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className="h-6 w-6 border border-primary bg-background/70 flex items-center justify-center text-[10px] font-black text-primary">
          01
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary leading-none">
            ACTOR-01
          </div>
          <div className="mt-0.5 text-[8px] uppercase tracking-[0.25em] text-muted leading-none">
            Elite · Lv 99
          </div>
        </div>
      </div>

      {/* HUD: top-right tier badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 border border-primary/60 bg-background/70 px-2 py-1 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary">Tier S+</span>
      </div>

      {/* HUD: cognition + autonomy gauges */}
      <div className="absolute bottom-16 left-3 right-3 z-10 space-y-1.5 border border-white/10 bg-background/55 px-2 py-1.5 backdrop-blur-sm">
        <HUDBar label="COG" value={0.84} tone="cyan" />
        <HUDBar label="AUT" value={0.62} tone="orange" />
      </div>

      {/* HUD: skill bar */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        <SkillIcon skill={SKILLS[0]} />
        <SkillIcon skill={SKILLS[1]} />
        <SkillIcon skill={SKILLS[2]} cooldown={3.4} />
        <SkillIcon skill={SKILLS[3]} ulti />
      </div>

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <hemisphereLight args={["#dceaf0", "#1a1410", 0.6]} />
        {/* key light from upper-front */}
        <directionalLight position={[3, 6, 5]} intensity={1.0} color="#fff8eb" />
        {/* rim/back light — strong cyan from behind for game champion silhouette */}
        <pointLight position={[-3, 4, -4]} intensity={2.0} color={CYAN_HOT} distance={12} />
        {/* secondary rim (orange) from low back-right */}
        <pointLight position={[4, 0.5, -3]} intensity={1.4} color="#ff791b" distance={10} />
        {/* fill from bottom — lifts the pedestal glow */}
        <pointLight position={[0, -1.2, 2]} intensity={0.7} color={CYAN} distance={6} />

        <HexPedestal />
        <AuraRings />
        <Particles />
        <Robot />
      </Canvas>
    </div>
  );
}
