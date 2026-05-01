"use client";

import dynamic from "next/dynamic";

const ActorDemoRobot = dynamic(() => import("./ActorDemoRobot"), {
  ssr: false,
  loading: () => null,
});

export default function ActorDemoRobotClient() {
  return <ActorDemoRobot />;
}
