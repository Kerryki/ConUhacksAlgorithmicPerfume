'use client';

import { useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Define three molecule configurations (relative to center) - scaled down by 0.4
const feminineConfig = [
  { x: 0, y: -24, radius: 8 },       // Top center (large)
  { x: 21, y: -12, radius: 6 },      // Top-right
  { x: 21, y: 12, radius: 6 },       // Bottom-right
  { x: 0, y: 24, radius: 8 },        // Bottom center (large)
  { x: -21, y: 12, radius: 6 },      // Bottom-left
  { x: -21, y: -12, radius: 6 },     // Top-left
];

const unisexConfig = [
  { x: 0, y: -28, radius: 7 },       // Top
  { x: 24, y: -14, radius: 7 },      // Top-right
  { x: 24, y: 14, radius: 7 },       // Bottom-right
  { x: 0, y: 28, radius: 7 },        // Bottom
  { x: -24, y: 14, radius: 7 },      // Bottom-left
  { x: -24, y: -14, radius: 7 },     // Top-left
];

const masculineConfig = [
  { x: -28, y: 0, radius: 9 },       // Left (large)
  { x: -14, y: 0, radius: 7 },       // Center-left
  { x: 0, y: 0, radius: 7 },         // Center
  { x: 14, y: 0, radius: 7 },        // Center-right
  { x: 28, y: 0, radius: 9 },        // Right (large)
  { x: 0, y: -16, radius: 5 },       // Top branch
];

// Smooth interpolation function
const interpolateConfigs = (config1, config2, t) => {
  return config1.map((atom, i) => ({
    x: atom.x + (config2[i].x - atom.x) * t,
    y: atom.y + (config2[i].y - atom.y) * t,
    radius: atom.radius + (config2[i].radius - atom.radius) * t,
  }));
};

// Get atom color based on gender value
const getAtomColor = (genderValue) => {
  if (genderValue < 0.33) {
    // Feminine: Pink
    const t = genderValue / 0.33;
    const hue = 330 + t * 10; // 330 (pink) to 340 (lighter pink)
    return `hsl(${hue}, 75%, 65%)`;
  } else if (genderValue < 0.67) {
    // Neutral: Purple tones
    const t = (genderValue - 0.33) / 0.34;
    const hue = 260 + t * 20; // 260 (purple) to 280 (violet)
    return `hsl(${hue}, 70%, 65%)`;
  } else {
    // Masculine: Blue
    const t = (genderValue - 0.67) / 0.33;
    const hue = 220 - t * 10; // 220 (light blue) to 210 (blue)
    return `hsl(${hue}, 75%, 60%)`;
  }
};

// Get bond color (slightly darker than atoms)
const getBondColor = (genderValue) => {
  if (genderValue < 0.33) {
    return 'rgba(236, 72, 153, 0.6)'; // Pink
  } else if (genderValue < 0.67) {
    return 'rgba(167, 139, 250, 0.6)'; // Purple
  } else {
    return 'rgba(59, 130, 246, 0.6)'; // Blue
  }
};

export default function DraggableMolecule({ genderValue, onPositionChange, constraintsRef }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth motion
  const springConfig = { stiffness: 80, damping: 25, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Calculate current molecule configuration based on genderValue
  const currentConfig = useMemo(() => {
    if (genderValue < 0.5) {
      const t = genderValue * 2; // 0 to 1
      return interpolateConfigs(feminineConfig, unisexConfig, t);
    } else {
      const t = (genderValue - 0.5) * 2; // 0 to 1
      return interpolateConfigs(unisexConfig, masculineConfig, t);
    }
  }, [genderValue]);

  // Get colors
  const atomColor = useMemo(() => getAtomColor(genderValue), [genderValue]);
  const bondColor = useMemo(() => getBondColor(genderValue), [genderValue]);

  // Define bonds between atoms (indices)
  const bonds = useMemo(() => {
    if (genderValue < 0.33) {
      // Feminine: circular connections
      return [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
      ];
    } else if (genderValue < 0.67) {
      // Unisex: hexagonal connections
      return [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]
      ];
    } else {
      // Masculine: linear connections
      return [
        [0, 1], [1, 2], [2, 3], [3, 4], [2, 5]
      ];
    }
  }, [genderValue]);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDrag={(event, info) => {
        onPositionChange(info.point.x, info.point.y);
      }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      style={{
        x: springX,
        y: springY,
        cursor: 'grab',
        width: '80px',
        height: '80px',
        pointerEvents: 'auto',
      }}
      className="relative"
    >
      <svg
        width="80"
        height="80"
        viewBox="-40 -40 80 80"
        className="overflow-visible"
      >
        {/* Bonds (draw first so they appear behind atoms) */}
        {bonds.map(([i, j], index) => {
          const atom1 = currentConfig[i];
          const atom2 = currentConfig[j];
          return (
            <motion.line
              key={`bond-${index}`}
              x1={atom1.x}
              y1={atom1.y}
              x2={atom2.x}
              y2={atom2.y}
              stroke={bondColor}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          );
        })}

        {/* Atoms */}
        {currentConfig.map((atom, index) => (
          <motion.g key={`atom-${index}`}>
            {/* Glow effect */}
            <motion.circle
              cx={atom.x}
              cy={atom.y}
              r={atom.radius + 8}
              fill={atomColor}
              opacity="0.3"
              filter="blur(8px)"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
            
            {/* Main atom */}
            <motion.circle
              cx={atom.x}
              cy={atom.y}
              r={atom.radius}
              fill={atomColor}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))',
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />

            {/* Inner highlight */}
            <motion.circle
              cx={atom.x - atom.radius * 0.3}
              cy={atom.y - atom.radius * 0.3}
              r={atom.radius * 0.3}
              fill="rgba(255, 255, 255, 0.3)"
              style={{ pointerEvents: 'none' }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
