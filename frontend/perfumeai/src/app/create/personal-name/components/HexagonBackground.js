'use client';

import { motion } from 'framer-motion';

export function HexagonBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons-name"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <path
              d="M28 0L56 17V50L28 67L0 50V17L28 0Z"
              fill="none"
              stroke="rgba(251, 191, 36, 0.08)"
              strokeWidth="1"
            />
            <path
              d="M28 33L56 50V83L28 100L0 83V50L28 33Z"
              fill="none"
              stroke="rgba(251, 191, 36, 0.08)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-name)" />
      </svg>
    </div>
  );
}
