"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";

/**
 * Dispatches a window event ("r3f-ready") when all R3F assets are loaded.
 * Place inside <Canvas> so it tracks Drei's loader state.
 */
export default function R3FReadySignal({ eventName = "r3f-ready" }: { eventName?: string }) {
  const { active, progress } = useProgress();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active && progress >= 100 && !firedRef.current) {
      firedRef.current = true;
      // Dispatch on next frame to avoid race with loaders completing
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event(eventName));
      });
    }
  }, [active, progress, eventName]);

  return null;
}

