"use client";

import dynamic from "next/dynamic";

const ActorSwarm = dynamic(() => import("./ActorSwarm"), {
  ssr: false,
});

export default function ActorSwarmClient() {
  return <ActorSwarm />;
}
