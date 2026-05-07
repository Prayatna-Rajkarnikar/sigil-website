"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
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

export default function ActorDemoRobot() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <Canvas
        camera={{ position: [0, 0.35, 6.4], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <hemisphereLight args={["#dceaf0", "#1a1410", 0.6]} />
        <directionalLight position={[3, 6, 5]} intensity={1.0} color="#fff8eb" />
        <pointLight position={[-3, 4, -4]} intensity={1.0} color={CYAN_HOT} distance={12} />
        <Robot />
      </Canvas>
    </div>
  );
}
