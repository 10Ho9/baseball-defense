import { useEffect, useRef } from "react";
import { useSessionStore } from "../session/store";

export const useAnimationClock = (durationMs: number) => {
  const playbackStatus = useSessionStore((state) => state.playbackStatus);
  const setElapsedMs = useSessionStore((state) => state.setElapsedMs);
  const setPlaybackStatus = useSessionStore((state) => state.setPlaybackStatus);
  const lastFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (playbackStatus !== "playing") {
      lastFrameRef.current = null;
      return;
    }

    let frameId = 0;

    const tick = (now: number) => {
      const previous = lastFrameRef.current ?? now;
      const delta = now - previous;
      lastFrameRef.current = now;

      setElapsedMs((current) => {
        const nextValue = Math.min(current + delta, durationMs);
        if (nextValue >= durationMs) {
          setPlaybackStatus("paused");
        }
        return nextValue;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      lastFrameRef.current = null;
    };
  }, [durationMs, playbackStatus, setElapsedMs, setPlaybackStatus]);
};
