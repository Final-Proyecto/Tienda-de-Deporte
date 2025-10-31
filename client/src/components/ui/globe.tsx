"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1.2,
  diffuse: 1.1,
  mapSamples: 16000,
  // *** AUMENTADO para mejor visibilidad de los países ***
  mapBrightness: 1.5,
  // *** Colores ajustados a la estética SPORTGLOW (Naranja/Rojo) ***
  baseColor: [0.9, 0.3, 0.1], // Naranja rojizo, similar al original pero más vibrante
  markerColor: [1, 0.5, 0.1], // Rojo/Naranja para los puntos
  glowColor: [1, 0.3, 0], // Naranja brillante para el halo
  // ----------------------------------------------------------------
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
    { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
    { location: [30.0444, 31.2357], size: 0.07 }, // Cairo
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
    { location: [19.4326, -99.1332], size: 0.1 }, // Mexico City
    { location: [40.7128, -74.006], size: 0.1 }, // New York
    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka
    { location: [41.0082, 28.9784], size: 0.06 }, // Istanbul
    { location: [45.4642, 9.19], size: 0.06 }, // Milan (Italia - vóley fuerte)
    { location: [48.8566, 2.3522], size: 0.07 }, // Paris
    { location: [52.52, 13.405], size: 0.07 }, // Berlin
    { location: [55.7558, 37.6173], size: 0.08 }, // Moscow
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[1/1] w-full max-w-[500px]",
        className
      )}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
