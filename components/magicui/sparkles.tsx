"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  children?: React.ReactNode;
}

const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1200,
    particleColor = "#FFC107",
  } = props;
  const generateId = useId();
  const sparklesId = id || generateId;

  return (
    <div
      className={cn("opacity-0 animate-in fade-in-0 duration-4000", className)}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath={`url(#clip-${sparklesId})`}>
          <g transform="translate(200 200)">
            <circle
              r="1.8"
              fill={particleColor}
              opacity="0.8"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="6s"
                values="0;360"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur="2s"
                values="0.8;0.2;0.8"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r="1.2"
              fill={particleColor}
              opacity="0.6"
              transform="rotate(45) translate(25 0)"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="4s"
                values="45;405"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r="0.8"
              fill={particleColor}
              opacity="0.4"
              transform="rotate(90) translate(35 0)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="8s"
                values="90;450"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
        <defs>
          <clipPath id={`clip-${sparklesId}`}>
            <rect width="400" height="400" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default function Sparkles({
  children,
  className,
  ...props
}: SparklesProps & { children?: React.ReactNode }) {
  return (
    <div className={cn("relative inline-block", className)}>
      <SparklesCore {...props} />
      {children}
    </div>
  );
}
