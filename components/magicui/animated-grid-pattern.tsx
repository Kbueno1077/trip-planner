"use client";

import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export default function AnimatedGridPattern({
  className,
  ...props
}: GridPatternProps) {
  const [squares, setSquares] = useState<Array<[number, number]>>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSquares = () => {
      if (!gridRef.current) return;

      const { width, height } = gridRef.current.getBoundingClientRect();
      const cols = Math.floor(width / 40);
      const rows = Math.floor(height / 40);

      const newSquares: Array<[number, number]> = [];

      for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        newSquares.push([x, y]);
      }

      setSquares(newSquares);
    };

    updateSquares();
    const interval = setInterval(updateSquares, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={gridRef} className="absolute inset-0">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        squares={squares}
        className={cn(
          "fill-primary/20 stroke-primary/20 transition-all duration-1000",
          className,
        )}
        {...props}
      />
    </div>
  );
}
