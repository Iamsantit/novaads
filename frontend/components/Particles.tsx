"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Props = { count?: number; className?: string };

export default function Particles({ count = 24, className = "" }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 8
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0]
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size
          }}
          className="absolute rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 blur-[1px]"
        />
      ))}
    </div>
  );
}
