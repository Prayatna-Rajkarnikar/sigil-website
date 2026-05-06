"use client";

import dynamic from "next/dynamic";

const ActorSim = dynamic(() => import("./ActorSim"), {
  ssr: false,
  loading: () => null,
});

export default function ActorSimClient() {
  return <ActorSim />;
}
