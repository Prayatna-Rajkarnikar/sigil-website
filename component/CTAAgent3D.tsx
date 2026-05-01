"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * CTAAgent3D — same character as the Mission robot, but here he POINTS
 * down toward the call-to-action buttons that sit below him in the
 * layout. Visually directs the eye to the CTA cards.
 * Cycle:
 *   • 0.0s → 0.5s   raise arm into pointing pose (down + forward)
 *   • 0.5s → 2.8s   hold the point + a small "look here" emphasis bob
 *   • 2.8s → 3.3s   lower
 * Then waits 3–6s before pointing again.
 */

const SHELL = "#f1ecdf";
const VISOR = "#0a0908";
const CYAN = "#3ccfd6";
const CYAN_HOT = "#5fe9ee";
const DARK = "#15110d";
const JOINT = "#2a2723";

const POINT_DURATION = 3.3;

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
  const chinDot = useRef<THREE.Mesh>(null);

  /* right-arm pivots — animate during point */
  const rShoulder = useRef<THREE.Group>(null);
  const rElbow = useRef<THREE.Group>(null);
  const rWrist = useRef<THREE.Group>(null);

  /* hand-morph refs: extended index + curled stubs are shown during the
     point; the regular 3-finger group is shown when idle */
  const indexFingerRef = useRef<THREE.Group>(null);
  const curledRef = useRef<THREE.Group>(null);
  const normalFingersRef = useRef<THREE.Group>(null);

  const nextPoint = useRef(1.2 + Math.random() * 1.2);
  const pointUntil = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* schedule a new point */
    if (t >= nextPoint.current && t > pointUntil.current) {
      pointUntil.current = t + POINT_DURATION;
      nextPoint.current = t + 3 + Math.random() * 3;
    }

    /* envelope progress: 0 (idle) ↔ 1 (arm in pointing pose) */
    let progress = 0;
    let holding = false;
    if (t < pointUntil.current) {
      const elapsed = POINT_DURATION - (pointUntil.current - t);
      let p = 0;
      if (elapsed < 0.5) p = elapsed / 0.5; /* raise */
      else if (elapsed < 2.8) {
        p = 1; /* hold the point */
        holding = true;
      } else p = 1 - (elapsed - 2.8) / 0.5; /* lower */
      progress = smoothstep(Math.max(0, Math.min(1, p)));
    }
    const arming = progress > 0.05;

    /* head — looks DOWN at the hand/CTAs while pointing, idle sway otherwise */
    if (headRef.current) {
      const targetY = arming ? -0.18 : Math.sin(t * 0.4) * 0.15;
      const targetX = arming ? 0.22 : Math.sin(t * 0.6) * 0.04; /* tilt down */
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.12);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.12);
    }

    /* arm pose — bent at the elbow so the hand sits at chest height,
       wrist sharply flexed so the index finger drops STRAIGHT DOWN.
       Walked through the math:
         shoulder.z (0.1)  → just enough outward to clear the body
         shoulder.x (0)    → arm hangs at the side, no forward tilt
         elbow.x (-1.6)    → ~90° backward fold; forearm comes UP and
           FORWARD, putting the hand at chest level in front of the body
         wrist.x (+1.5)    → ~85° wrist flex so the hand drops 90° from
           the forearm — finger ends up pointing in world (0.10, -0.99, 0.10)
           which is essentially straight down
         The back of the hand faces the camera (mostly +Z world), matching
         the icon. Small wrist-tap bob during the hold for emphasis. */
    if (rShoulder.current && rElbow.current && rWrist.current) {
      /* bounce envelope: opens/closes the elbow ~±0.2 rad at ~0.65 Hz
         while the wrist stays sharply flexed — the whole hand bobs
         up-down with the finger steady-pointing at the CTAs. */
      const bounce = holding ? Math.sin(t * 4) * 0.2 : 0;
      rShoulder.current.rotation.z = 0.1 * progress;
      rShoulder.current.rotation.x = 0;
      rShoulder.current.rotation.y = 0;
      rElbow.current.rotation.x = (-1.6 + bounce) * progress;
      rElbow.current.rotation.y = 0;
      rElbow.current.rotation.z = 0;
      rWrist.current.rotation.x = 1.5 * progress;
      rWrist.current.rotation.y = 0;
      rWrist.current.rotation.z = 0;
    }

    /* Hand morph: switch the right-arm hand between the extended-index
       pointing pose and the regular 3-finger pose based on whether the
       arm is currently in the gesture. */
    if (indexFingerRef.current) indexFingerRef.current.visible = arming;
    if (curledRef.current) curledRef.current.visible = arming;
    if (normalFingersRef.current) normalFingersRef.current.visible = !arming;

    /* expression — eyes stay round and bright (alert/focused) */
    const eyeIntensity = arming ? 1.85 : 1.4 + Math.sin(t * 3.6) * 0.3;
    if (eyeL.current) {
      eyeL.current.scale.y = THREE.MathUtils.lerp(eyeL.current.scale.y, 1, 0.15);
      (eyeL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
    }
    if (eyeR.current) {
      eyeR.current.scale.y = THREE.MathUtils.lerp(eyeR.current.scale.y, 1, 0.15);
      (eyeR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
    }
    if (chinDot.current) {
      (chinDot.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.1 + Math.sin(t * 2) * 0.4;
    }
  });

  /* Visor sphere-segment params (same as hero/mission) */
  const visorPhiCenter = Math.PI / 2;
  const visorPhiLen = 2.1;
  const visorPhiStart = visorPhiCenter - visorPhiLen / 2;
  const visorThetaStart = 0.95;
  const visorThetaLen = 0.78;

  return (
    <group position={[0, -0.45, 0]}>
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

      {/* SHOULDERS (joint balls) */}
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

      {/* LEFT ARM (idle) */}
      <Arm side={-1} />

      {/* RIGHT ARM — animates to point */}
      <ArmAnimated
        rShoulder={rShoulder}
        rElbow={rElbow}
        rWrist={rWrist}
        indexFingerRef={indexFingerRef}
        curledRef={curledRef}
        normalFingersRef={normalFingersRef}
      />
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

function ForearmAndHand({
  wristRef,
  pointing = false,
  indexFingerRef,
  curledRef,
  normalFingersRef,
}: {
  wristRef?: React.RefObject<THREE.Group | null>;
  pointing?: boolean;
  indexFingerRef?: React.RefObject<THREE.Group | null>;
  curledRef?: React.RefObject<THREE.Group | null>;
  normalFingersRef?: React.RefObject<THREE.Group | null>;
}) {
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
      <group ref={wristRef} position={[0, -0.66, 0]}>
        <mesh>
          <sphereGeometry args={[0.085, 18, 18]} />
          <meshStandardMaterial color={JOINT} metalness={0.78} roughness={0.4} />
        </mesh>
        {pointing ? (
          <MorphHand
            indexFingerRef={indexFingerRef}
            curledRef={curledRef}
            normalFingersRef={normalFingersRef}
          />
        ) : (
          <Hand />
        )}
      </group>
    </>
  );
}

/* Regular hand — three fingers + thumb, used by the idle (left) arm so
   it looks normal hanging at the side. */
function Hand() {
  return (
    <group position={[0, -0.12, 0]}>
      <RoundedBox
        args={[0.15, 0.18, 0.1]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0]}
      >
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

/* Morphing hand — used by the right (animated) arm. Holds BOTH the
   pointing geometry (extended index + curled stubs) AND the regular
   3-finger geometry. Refs let the animation toggle visibility so the
   hand looks normal when idle and switches to a pointing pose during
   the gesture. */
function MorphHand({
  indexFingerRef,
  curledRef,
  normalFingersRef,
}: {
  indexFingerRef?: React.RefObject<THREE.Group | null>;
  curledRef?: React.RefObject<THREE.Group | null>;
  normalFingersRef?: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group position={[0, -0.12, 0]}>
      {/* palm — always */}
      <RoundedBox
        args={[0.15, 0.18, 0.1]}
        radius={0.04}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <GlossyShell />
      </RoundedBox>
      {/* knuckle dark line — always */}
      <mesh position={[0, -0.07, 0.045]}>
        <boxGeometry args={[0.13, 0.018, 0.012]} />
        <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* POINTING GEOMETRY — extended index, only visible during point */}
      <group ref={indexFingerRef} visible={false}>
        <RoundedBox
          args={[0.036, 0.18, 0.05]}
          radius={0.014}
          smoothness={3}
          position={[-0.045, -0.19, 0.012]}
        >
          <GlossyShell />
        </RoundedBox>
      </group>

      {/* CURLED STUBS — only visible during point */}
      <group ref={curledRef} visible={false}>
        {[0, 0.045].map((x, i) => (
          <group key={i}>
            <mesh position={[x, -0.085, 0.05]}>
              <boxGeometry args={[0.034, 0.005, 0.012]} />
              <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
            </mesh>
            <RoundedBox
              args={[0.032, 0.05, 0.045]}
              radius={0.012}
              smoothness={3}
              position={[x, -0.105, 0.015]}
            >
              <GlossyShell />
            </RoundedBox>
          </group>
        ))}
      </group>

      {/* NORMAL FINGERS — three regular fingers, only visible when idle */}
      <group ref={normalFingersRef}>
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
      </group>

      {/* THUMB — same in both states (uses the regular hand position) */}
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
  indexFingerRef,
  curledRef,
  normalFingersRef,
}: {
  rShoulder: React.RefObject<THREE.Group | null>;
  rElbow: React.RefObject<THREE.Group | null>;
  rWrist: React.RefObject<THREE.Group | null>;
  indexFingerRef: React.RefObject<THREE.Group | null>;
  curledRef: React.RefObject<THREE.Group | null>;
  normalFingersRef: React.RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={rShoulder} position={[0.42, 0.4, 0]}>
      <ArmSegments />
      <group ref={rElbow} position={[0, -0.62, 0]}>
        <ForearmAndHand
          wristRef={rWrist}
          pointing
          indexFingerRef={indexFingerRef}
          curledRef={curledRef}
          normalFingersRef={normalFingersRef}
        />
      </group>
    </group>
  );
}

export default function CTAAgent3D() {
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
