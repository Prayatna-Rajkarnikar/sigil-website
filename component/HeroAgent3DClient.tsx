"use client";

import dynamic from "next/dynamic";

const HeroAgent3D = dynamic(() => import("./HeroAgent3D"), {
  ssr: false,
  loading: () => null,
});

export default function HeroAgent3DClient() {
  return <HeroAgent3D />;
}
