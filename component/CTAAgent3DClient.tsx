"use client";

import dynamic from "next/dynamic";

const CTAAgent3D = dynamic(() => import("./CTAAgent3D"), {
  ssr: false,
  loading: () => null,
});

export default function CTAAgent3DClient() {
  return <CTAAgent3D />;
}
