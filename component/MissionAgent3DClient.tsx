"use client";

import dynamic from "next/dynamic";

const MissionAgent3D = dynamic(() => import("./MissionAgent3D"), {
  ssr: false,
  loading: () => null,
});

export default function MissionAgent3DClient() {
  return <MissionAgent3D />;
}
