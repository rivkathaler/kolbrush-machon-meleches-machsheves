import { useEffect, useRef } from "react";
import { initDriftWall } from "@/lib/driftWall";

const GALLERY_COUNT = 56;

export default function DriftWall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from({ length: GALLERY_COUNT }, (_, i) => ({
      image: `/gallery/g-${i + 1}.jpg`,
      title: "A sefer produced by Machon Meleches Machsheves",
    }));

    const cleanup = initDriftWall(el, {
      items,
      columns: 6,
      tileWidth: 200,
      tileHeight: 132,
      gap: 18,
      radius: 18,
      tilt: 16,
      turn: -14,
      perspective: 1200,
      depth: 120,
      speed: 42,
      direction: "up",
      variance: 0.45,
      parallax: 0.6,
      lift: 64,
      fade: 0.6,
      dim: 0.55,
      overlayColor: "#1c120d",
    });

    return cleanup;
  }, []);

  return <div ref={ref} />;
}
