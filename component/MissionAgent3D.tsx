"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * MissionAgent3D — same robot character as the hero, but with a body and
 * articulated arms. The right arm periodically performs a salute:
 *   • 0.0s → 0.5s   raise (smoothstep 0 → 1)
 *   • 0.5s → 1.9s   hold the salute
 *   • 1.9s → 2.4s   lower (smoothstep 1 → 0)
 * Then resets and waits 6–9s before the next salute.
 */

const SHELL = "#f1ecdf";
const VISOR = "#0a0908";
const CYAN = "#3ccfd6";
const CYAN_HOT = "#5fe9ee";
const DARK = "#15110d";
const JOINT = "#2a2723";

const SALUTE_DURATION = 2.4;

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

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function Robot() {
  const headRef = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const browL = useRef<THREE.Mesh>(null);
  const browR = useRef<THREE.Mesh>(null);
  const chinDot = useRef<THREE.Mesh>(null);

  /* right-arm pivots — animate during salute */
  const rShoulder = useRef<THREE.Group>(null);
  const rElbow = useRef<THREE.Group>(null);
  const rWrist = useRef<THREE.Group>(null);

  const nextSalute = useRef(2 + Math.random() * 2);
  const saluteUntil = useRef(0);
  /* Set true when the user clicks the robot — triggers an immediate salute
     on the next frame regardless of where the schedule is. */
  const forceSalute = useRef(false);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* user-triggered salute (Easter egg) — fires NOW, overrides schedule */
    if (forceSalute.current) {
      forceSalute.current = false;
      saluteUntil.current = t + SALUTE_DURATION;
      nextSalute.current = saluteUntil.current + 5 + Math.random() * 3;
    }

    /* schedule a new salute */
    if (t >= nextSalute.current && t > saluteUntil.current) {
      saluteUntil.current = t + SALUTE_DURATION;
      nextSalute.current = t + 6 + Math.random() * 3;
    }

    /* salute progress: 0 (idle) ↔ 1 (full salute) */
    let progress = 0;
    if (t < saluteUntil.current) {
      const elapsed = SALUTE_DURATION - (saluteUntil.current - t);
      let p = 0;
      if (elapsed < 0.5) p = elapsed / 0.5; /* raise */
      else if (elapsed < 1.9) p = 1; /* hold */
      else p = 1 - (elapsed - 1.9) / 0.5; /* lower */
      progress = smoothstep(Math.max(0, Math.min(1, p)));
    }
    const saluting = progress > 0.05;

    /* head — sways idle, locks + tilts up slightly while saluting */
    if (headRef.current) {
      const targetY = saluting ? 0 : Math.sin(t * 0.4) * 0.15;
      const targetX = saluting ? -0.18 : Math.sin(t * 0.6) * 0.04;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.12);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.12);
    }

    /* apply salute pose to right arm.
       Reference is the classic salute: upper arm out to the side, elbow
       bent so the forearm angles up to the temple, hand pressed flat
       against the side of the head with fingers pointing up. The hand
       follows the forearm naturally — no wrist flex.
         shoulder.z (2.0) → raise upper arm to ~115° (out and slightly up)
         shoulder.x (+0.15) → minimal forward tilt so the arm stays near
           the body's coronal plane
         elbow.z (1.7) → strong fold so the forearm angles steeply up
           and inward, ending the hand at the brow on the side of the head
         wrist (0) → hand follows the forearm; fingers point up-inward,
           palm faces outward (matching the reference). */
    if (rShoulder.current && rElbow.current && rWrist.current) {
      rShoulder.current.rotation.z = 2.0 * progress;
      rShoulder.current.rotation.x = 0.15 * progress;
      rShoulder.current.rotation.y = 0;
      rElbow.current.rotation.x = 0;
      rElbow.current.rotation.y = 0;
      rElbow.current.rotation.z = 1.85 * progress;
      rWrist.current.rotation.x = 0;
      rWrist.current.rotation.y = 0;
      rWrist.current.rotation.z = 0;
    }

    /* SERIOUS expression — eyes stay round, eyebrows appear and slant down
       toward the bridge of the nose. */
    const eyeIntensity = saluting ? 1.85 : 1.4 + Math.sin(t * 3.6) * 0.3;
    /* slightly narrower eye on salute, but never squinted to a slit */
    const eyeScaleY = saluting ? 0.85 : 1;
    if (eyeL.current) {
      eyeL.current.scale.y = THREE.MathUtils.lerp(eyeL.current.scale.y, eyeScaleY, 0.15);
      (eyeL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
    }
    if (eyeR.current) {
      eyeR.current.scale.y = THREE.MathUtils.lerp(eyeR.current.scale.y, eyeScaleY, 0.15);
      (eyeR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
    }
    /* eyebrows — fade in + slant toward the bridge during salute */
    if (browL.current) {
      browL.current.visible = saluting;
      const m = browL.current.material as THREE.MeshStandardMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, saluting ? 1 : 0, 0.18);
    }
    if (browR.current) {
      browR.current.visible = saluting;
      const m = browR.current.material as THREE.MeshStandardMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, saluting ? 1 : 0, 0.18);
    }
    if (chinDot.current) {
      (chinDot.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.1 + Math.sin(t * 2) * 0.4;
    }
  });

  /* Visor sphere-segment params (same as hero) */
  const visorPhiCenter = Math.PI / 2;
  const visorPhiLen = 2.1;
  const visorPhiStart = visorPhiCenter - visorPhiLen / 2;
  const visorThetaStart = 0.95;
  const visorThetaLen = 0.78;

  return (
    <group
      position={[0, -0.45, 0]}
      onClick={(e) => {
        e.stopPropagation();
        forceSalute.current = true;
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "";
      }}
    >
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
          {/* eye dots */}
          <mesh ref={eyeL} position={[-0.22, 0.08, 0.83]}>
            <sphereGeometry args={[0.085, 22, 22]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          <mesh ref={eyeR} position={[0.22, 0.08, 0.83]}>
            <sphereGeometry args={[0.085, 22, 22]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          {/* SERIOUS EYEBROWS — slant down toward the bridge of the nose,
              hidden by default, shown during salute */}
          <mesh
            ref={browL}
            position={[-0.22, 0.22, 0.835]}
            rotation={[0, 0, -0.5]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.018]} />
            <meshStandardMaterial
              color={CYAN_HOT}
              emissive={CYAN}
              emissiveIntensity={1.4}
              transparent
              opacity={0}
            />
          </mesh>
          <mesh
            ref={browR}
            position={[0.22, 0.22, 0.835]}
            rotation={[0, 0, 0.5]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.018]} />
            <meshStandardMaterial
              color={CYAN_HOT}
              emissive={CYAN}
              emissiveIntensity={1.4}
              transparent
              opacity={0}
            />
          </mesh>
          {/* chin sensor */}
          <mesh position={[0, -0.45, 0.7]}>
            <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh ref={chinDot} position={[0, -0.42, 0.72]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.4} />
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
      {/* dark shoulder seam at top of chest */}
      <mesh position={[0, 0.49, 0.275]}>
        <boxGeometry args={[0.74, 0.025, 0.02]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* WAIST — narrower, exposes a darker mechanical band */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.16, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.85} roughness={0.32} />
      </mesh>
      {/* cyan belt accent */}
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
      {/* hip side recesses (dark mechanical detail) */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.3, -0.22, 0.275]}>
          <boxGeometry args={[0.1, 0.16, 0.014]} />
          <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* CHEST EMBLEM — small cyan disc */}
      <mesh position={[0, 0.32, 0.281]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.32, 0.295]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.012, 24]} />
        <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.3} />
      </mesh>

      {/* ── SHOULDERS (joint balls) ── */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.42, 0.4, 0]}>
          {/* ceramic shoulder cap */}
          <mesh>
            <sphereGeometry args={[0.2, 22, 22]} />
            <GlossyShell />
          </mesh>
          {/* dark inner mechanical ring (visible from front) */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.155, 0.025, 12, 28]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
          </mesh>
          {/* small cyan accent on shoulder */}
          <mesh position={[s * 0.16, 0, 0.05]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* ── LEFT ARM (idle, hanging) ── */}
      <Arm side={-1} />

      {/* ── RIGHT ARM — animates to salute ── */}
      <ArmAnimated rShoulder={rShoulder} rElbow={rElbow} rWrist={rWrist} />
    </group>
  );
}

/* ── Reusable arm + hand assembly ─────────────────────────────
   shoulder (origin) → upper arm capsule → dark elbow band →
   elbow ball → forearm capsule → wrist band + ball → hand. */
function ArmSegments() {
  return (
    <>
      {/* upper arm */}
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.13, 0.4, 8, 16]} />
        <GlossyShell />
      </mesh>
      {/* dark mechanical band at upper-arm top (under shoulder) */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.05, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      {/* dark mechanical band just above elbow */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
    </>
  );
}

function ForearmAndHand({
  wristRef,
}: {
  wristRef?: React.RefObject<THREE.Group | null>;
}) {
  return (
    <>
      {/* elbow ball */}
      <mesh>
        <sphereGeometry args={[0.15, 22, 22]} />
        <meshStandardMaterial color={JOINT} metalness={0.78} roughness={0.4} />
      </mesh>
      {/* small cyan elbow accent */}
      <mesh position={[0, 0, 0.13]}>
        <cylinderGeometry args={[0.038, 0.038, 0.012, 18]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.9} />
      </mesh>
      {/* forearm capsule */}
      <mesh position={[0, -0.32, 0]}>
        <capsuleGeometry args={[0.115, 0.42, 8, 16]} />
        <GlossyShell />
      </mesh>
      {/* wrist band */}
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.04, 22]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      {/* wrist ball — also serves as the wrist pivot for the hand */}
      <group ref={wristRef} position={[0, -0.66, 0]}>
        <mesh>
          <sphereGeometry args={[0.085, 18, 18]} />
          <meshStandardMaterial color={JOINT} metalness={0.78} roughness={0.4} />
        </mesh>
        {/* HAND — offset by -0.12 from wrist pivot (was -0.78 from elbow) */}
        <Hand />
      </group>
    </>
  );
}

function Hand() {
  return (
    <group position={[0, -0.12, 0]}>
      {/* palm */}
      <RoundedBox
        args={[0.15, 0.18, 0.1]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <GlossyShell />
      </RoundedBox>
      {/* knuckle dark line */}
      <mesh position={[0, -0.07, 0.045]}>
        <boxGeometry args={[0.13, 0.018, 0.012]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>
      {/* 3 fingers */}
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
      {/* thumb — angled outward */}
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
  rWrist,
}: {
  rShoulder: React.RefObject<THREE.Group | null>;
  rElbow: React.RefObject<THREE.Group | null>;
  rWrist: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={rShoulder} position={[0.42, 0.4, 0]}>
      <ArmSegments />
      <group ref={rElbow} position={[0, -0.62, 0]}>
        <ForearmAndHand wristRef={rWrist} />
      </group>
    </group>
  );
}

export default function MissionAgent3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4.6], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#dceaf0", "#3a3530", 0.7]} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#fff8eb" />
      <pointLight position={[-2.5, 2, -3]} intensity={0.95} color="#9bd6e0" />
      <pointLight position={[2, 0.5, 2.5]} intensity={0.4} color={CYAN} />
      <pointLight position={[0, -2, 2]} intensity={0.35} color="#ffe1c0" />

      <Robot />
    </Canvas>
  );
}
