"use client";

import dynamic from "next/dynamic";

const Actor3D = dynamic(() => import("./Actor3D"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-md mx-auto border border-primary/30 bg-background/60" />
  ),
});

export default function Actor3DClient() {
  return <Actor3D />;
}
