"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * HeroAgent3D — friendly mascot robot.
 *
 *  • White ceramic sphere head (clearcoat shine)
 *  • Wide WRAPAROUND visor — sphere segment that follows the head curve
 *  • Two cyan eye dots inside the visor
 *  • Cyan chin sensor below the visor
 *  • Bright cyan EAR DISCS on each side — the iconic accent
 *  • Small white shoulders + chest peeking up from the bottom
 */

const SHELL      = "#f1ecdf";   // warm white ceramic
const VISOR      = "#0a0908";
const CYAN       = "#3ccfd6";
const CYAN_HOT   = "#5fe9ee";
const DARK       = "#15110d";

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

function Head() {
  const headRef = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  /* angle-bracket arms for the > < laugh face */
  const laughL_top = useRef<THREE.Mesh>(null);
  const laughL_bot = useRef<THREE.Mesh>(null);
  const laughR_top = useRef<THREE.Mesh>(null);
  const laughR_bot = useRef<THREE.Mesh>(null);
  /* toothy smile group — appears during laugh */
  const smileRef = useRef<THREE.Group>(null);
  const chinDot = useRef<THREE.Mesh>(null);
  const earL = useRef<THREE.Mesh>(null);
  const earR = useRef<THREE.Mesh>(null);
  const visorBar = useRef<THREE.Mesh>(null);

  /* expression scheduler — blink frequently, laugh frequently */
  const nextBlink = useRef(2 + Math.random() * 2);
  const blinkUntil = useRef(0);
  const nextLaugh = useRef(3 + Math.random() * 3);
  const laughUntil = useRef(0);

  const LAUGH_DURATION = 1.5;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.4;
      headRef.current.rotation.x = Math.sin(t * 0.7) * 0.04;
      headRef.current.position.y = Math.sin(t * 1.1) * 0.04;
    }

    /* trigger LAUGH — eyes become >< for ~1.5s */
    if (t >= nextLaugh.current && t > blinkUntil.current && t > laughUntil.current) {
      laughUntil.current = t + LAUGH_DURATION;
      nextLaugh.current = t + 5 + Math.random() * 4;
      nextBlink.current = Math.max(nextBlink.current, laughUntil.current + 0.6);
    }

    /* trigger BLINK — only when not laughing */
    if (t >= nextBlink.current && t > blinkUntil.current && t > laughUntil.current) {
      const isDouble = Math.random() < 0.18;
      blinkUntil.current = t + (isDouble ? 0.34 : 0.13);
      nextBlink.current = t + 2.4 + Math.random() * 3;
    }

    const laughing = t < laughUntil.current;
    const blinking = !laughing && t < blinkUntil.current;

    /* === LAUGH expression (>< shape + toothy smile) === */
    if (laughing) {
      if (eyeL.current) eyeL.current.visible = false;
      if (eyeR.current) eyeR.current.visible = false;

      const phase = (t - (laughUntil.current - LAUGH_DURATION)) / LAUGH_DURATION;
      const pulse = 1 + Math.sin(phase * Math.PI * 6) * 0.08;

      [laughL_top, laughL_bot, laughR_top, laughR_bot].forEach((armRef) => {
        if (armRef.current) {
          armRef.current.visible = true;
          armRef.current.scale.x = pulse;
        }
      });

      /* show toothy smile and let it pulse with the laugh */
      if (smileRef.current) {
        smileRef.current.visible = true;
        const smilePulse = 1 + Math.sin(phase * Math.PI * 6) * 0.06;
        smileRef.current.scale.x = smilePulse;
        smileRef.current.scale.y = smilePulse;
      }

      /* head bobs while laughing */
      if (headRef.current) {
        headRef.current.position.y += Math.sin(phase * Math.PI * 6) * 0.04;
      }
    } else {
      /* hide laugh arms + smile */
      [laughL_top, laughL_bot, laughR_top, laughR_bot].forEach((armRef) => {
        if (armRef.current) armRef.current.visible = false;
      });
      if (smileRef.current) smileRef.current.visible = false;

      /* show eye spheres + handle blink scaling */
      const flicker = 1.4 + Math.sin(t * 3.6) * 0.4 + Math.random() * 0.04;
      let scaleY = 1;
      if (blinking) {
        const remaining = blinkUntil.current - t;
        const within = blinkUntil.current - remaining;
        const wasDouble = (blinkUntil.current - t) > 0.13 && remaining > 0.13;
        scaleY = wasDouble && within > 0.13 && within < 0.21 ? 1 : 0.05;
      }
      if (eyeL.current) {
        eyeL.current.visible = true;
        eyeL.current.scale.y = scaleY;
        eyeL.current.rotation.z = 0;
        (eyeL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker;
      }
      if (eyeR.current) {
        eyeR.current.visible = true;
        eyeR.current.scale.y = scaleY;
        eyeR.current.rotation.z = 0;
        (eyeR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flicker;
      }
    }

    const chinP = 1.1 + Math.sin(t * 2.0) * 0.4;
    if (chinDot.current) (chinDot.current.material as THREE.MeshStandardMaterial).emissiveIntensity = chinP;
    const earP = 1.5 + Math.sin(t * 2.4) * 0.5;
    const earP2 = 1.5 + Math.sin(t * 2.4 + Math.PI) * 0.5;
    if (earL.current) (earL.current.material as THREE.MeshStandardMaterial).emissiveIntensity = earP;
    if (earR.current) (earR.current.material as THREE.MeshStandardMaterial).emissiveIntensity = earP2;
    if (visorBar.current) {
      const v = 0.9 + Math.sin(t * 1.5) * 0.3;
      (visorBar.current.material as THREE.MeshStandardMaterial).emissiveIntensity = v;
    }
  });

  /* Visor sphere-segment: centered on +Z (front). In three.js, phi=0 is at -X,
     so the visor must be centered on phi = π/2 for the band to face the camera. */
  const visorPhiCenter = Math.PI / 2;
  const visorPhiLen   = 2.1;
  const visorPhiStart = visorPhiCenter - visorPhiLen / 2;
  const visorThetaStart = 0.95;
  const visorThetaLen   = 0.78;

  return (
    <group ref={headRef}>
      {/* ── HEAD SUBASSEMBLY — fills the canvas tightly */}
      <group scale={0.95} position={[0, 0, 0]}>
        {/* skull */}
        <mesh>
          <sphereGeometry args={[0.85, 48, 48]} />
          <GlossyShell />
        </mesh>

        {/* wraparound visor — outer dark sphere segment */}
        <mesh>
          <sphereGeometry
            args={[
              0.87, 64, 48,
              visorPhiStart, visorPhiLen,
              visorThetaStart, visorThetaLen,
            ]}
          />
          <meshStandardMaterial
            color={VISOR}
            metalness={1.0}
            roughness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* inner glossy "glass" layer — slightly smaller, near-mirror */}
        <mesh>
          <sphereGeometry
            args={[
              0.86, 64, 48,
              visorPhiStart + 0.03, visorPhiLen - 0.06,
              visorThetaStart + 0.03, visorThetaLen - 0.06,
            ]}
          />
          <meshStandardMaterial
            color="#000"
            metalness={1.0}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* visor bottom accent bar */}
        <mesh ref={visorBar} position={[0, -0.18, 0.85]}>
          <boxGeometry args={[0.42, 0.012, 0.01]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.0} />
        </mesh>

        {/* LEFT eye group — sphere when normal, > arms when laughing */}
        <group position={[-0.22, 0.08, 0.83]}>
          <mesh ref={eyeL}>
            <sphereGeometry args={[0.085, 22, 22]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          {/* > shape: top arm \ slants down to right vertex */}
          <mesh
            ref={laughL_top}
            position={[-0.016, 0.045, 0]}
            rotation={[0, 0, -0.6]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.028]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.7} />
          </mesh>
          {/* > shape: bottom arm / slants up to right vertex */}
          <mesh
            ref={laughL_bot}
            position={[-0.016, -0.045, 0]}
            rotation={[0, 0, 0.6]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.028]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.7} />
          </mesh>
        </group>

        {/* RIGHT eye group — sphere when normal, < arms when laughing */}
        <group position={[0.22, 0.08, 0.83]}>
          <mesh ref={eyeR}>
            <sphereGeometry args={[0.085, 22, 22]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.6} />
          </mesh>
          {/* < shape: top arm / slants down to left vertex */}
          <mesh
            ref={laughR_top}
            position={[0.016, 0.045, 0]}
            rotation={[0, 0, 0.6]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.028]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.7} />
          </mesh>
          {/* < shape: bottom arm \ slants up to left vertex */}
          <mesh
            ref={laughR_bot}
            position={[0.016, -0.045, 0]}
            rotation={[0, 0, -0.6]}
            visible={false}
          >
            <boxGeometry args={[0.16, 0.028, 0.028]} />
            <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.7} />
          </mesh>
        </group>

        {/* chin sensor */}
        <mesh position={[0, -0.45, 0.7]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
          <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh ref={chinDot} position={[0, -0.42, 0.72]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color={CYAN_HOT} emissive={CYAN} emissiveIntensity={1.4} />
        </mesh>

        {/* TOOTHY SMILE — only visible during laugh */}
        <group ref={smileRef} position={[0, -0.30, 0.83]} visible={false}>
          {/* dark mouth interior — lower semicircle */}
          <mesh>
            <circleGeometry args={[0.13, 28, Math.PI, Math.PI]} />
            <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* teeth — 5 small white rectangles */}
          {[-0.07, -0.035, 0, 0.035, 0.07].map((x, i) => (
            <mesh key={i} position={[x, -0.04, 0.008]}>
              <boxGeometry args={[0.022, 0.055, 0.012]} />
              <meshStandardMaterial color={SHELL} metalness={0.05} roughness={0.4} />
            </mesh>
          ))}
          {/* smile arc — dark rim defining the lower lip */}
          <mesh position={[0, 0, 0.012]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.13, 0.014, 8, 24, Math.PI]} />
            <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.3} />
          </mesh>
        </group>

        {/* ear discs — outside the head sphere */}
        {[-1, 1].map((s) => {
          const ref = s === -1 ? earL : earR;
          return (
            <group key={s} position={[s * 0.85, 0.0, 0]}>
              <mesh position={[s * 0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.22, 0.22, 0.06, 36]} />
                <meshStandardMaterial color={DARK} metalness={0.92} roughness={0.28} />
              </mesh>
              <mesh ref={ref} position={[s * 0.075, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.16, 0.16, 0.022, 36]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} />
              </mesh>
              <mesh position={[s * 0.088, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.06, 0.06, 0.006, 24]} />
                <meshStandardMaterial color="#e7feff" emissive="#caf9fb" emissiveIntensity={2.0} />
              </mesh>
              <mesh position={[s * 0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.225, 0.022, 12, 36]} />
                <meshStandardMaterial color={DARK} metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
          );
        })}

        {/* tiny crown knob */}
        <mesh position={[0, 0.86, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <GlossyShell />
        </mesh>
      </group>

    </group>
  );
}

export default function HeroAgent3D() {
  return (
    <Canvas
      camera={{ position: [0.2, 0.05, 3.6], fov: 30 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#dceaf0", "#3a3530", 0.7]} />
      {/* Strong key light — gives the dome a bright highlight */}
      <directionalLight position={[4, 5, 4]} intensity={1.2} color="#fff8eb" />
      {/* Soft fill from below */}
      <pointLight position={[0, -2, 3]} intensity={0.45} color="#ffe1c0" />
      {/* Cyan kick from left so the ear disc casts color */}
      <pointLight position={[-2.5, 0.5, 2.5]} intensity={0.55} color={CYAN} />
      {/* Cool rim from behind to separate from the dark page */}
      <pointLight position={[1, 1, -3]} intensity={0.6} color="#9bd6e0" />

      <Head />
    </Canvas>
  );
}
