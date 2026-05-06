"use client";

import dynamic from "next/dynamic";

const Actor3D = dynamic(() => import("./Actor3D"), {
  ssr: false,
  loading: () => null,
});

export default function Actor3DClient() {
  return <Actor3D />;
}
