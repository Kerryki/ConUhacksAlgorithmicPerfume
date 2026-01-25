'use client';

import { useMemo, useEffect, useState, useRef } from 'react';

// Floating particle component
function FloatingParticle({ style, delay, duration, type }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...style,
        animation: `float-${type} ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function AccordEnvironment({ accordType, value, onChange, label }) {
  const intensity = value / 100;
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate particles based on accord type
  useEffect(() => {
    const generateParticles = () => {
      const count = Math.floor(8 + intensity * 12);
      const newParticles = [];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: 2 + Math.random() * 6 + intensity * 4,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4,
          opacity: 0.2 + Math.random() * 0.4 * intensity,
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, [accordType, Math.floor(intensity * 5)]);

  // Environment-specific styles and effects
  const environmentStyle = useMemo(() => {
    switch (accordType) {
      case 'woody':
        return {
          baseGradient: `linear-gradient(135deg, 
            #0d0d0a 0%, 
            #1a1812 30%,
            #2d2416 60%, 
            #1a1408 100%)`,
          intensityOverlay: `
            radial-gradient(ellipse at 20% 30%, rgba(251, 191, 36, ${intensity * 0.35}) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 90, 43, ${intensity * 0.25}) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, rgba(205, 133, 63, ${intensity * 0.2}) 0%, transparent 60%)
          `,
          accentColor: '#fbbf24',
          secondaryColor: '#cd853f',
          particleColor: 'rgba(251, 191, 36, 0.6)',
          glowColor: 'rgba(251, 191, 36, 0.4)',
          treeLines: true,
          lightRays: true,
        };
      
      case 'floral':
        return {
          baseGradient: `linear-gradient(135deg, 
            #1a0a1a 0%, 
            #3d1a3d 30%,
            #6b2d5a 50%, 
            #2d1a2d 100%)`,
          intensityOverlay: `
            radial-gradient(ellipse at 30% 20%, rgba(244, 114, 182, ${intensity * 0.5}) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 80%, rgba(192, 132, 252, ${intensity * 0.4}) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, ${intensity * 0.3}) 0%, transparent 50%)
          `,
          accentColor: '#ec4899',
          secondaryColor: '#c084fc',
          particleColor: 'rgba(244, 114, 182, 0.7)',
          glowColor: 'rgba(236, 72, 153, 0.4)',
          petals: true,
          bloom: true,
        };
      
      case 'fresh':
        return {
          baseGradient: `linear-gradient(135deg, 
            #0a1a2a 0%, 
            #1a3a5a 30%,
            #2563eb 60%, 
            #0ea5e9 100%)`,
          intensityOverlay: `
            radial-gradient(ellipse at 40% 20%, rgba(34, 211, 238, ${intensity * 0.6}) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 70%, rgba(103, 232, 249, ${intensity * 0.5}) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, rgba(6, 182, 212, ${intensity * 0.3}) 0%, transparent 50%)
          `,
          accentColor: '#22d3ee',
          secondaryColor: '#67e8f9',
          particleColor: 'rgba(103, 232, 249, 0.8)',
          glowColor: 'rgba(34, 211, 238, 0.5)',
          bubbles: true,
          ripples: true,
        };
      
      case 'oriental':
        return {
          baseGradient: `linear-gradient(135deg, 
            #1a0a00 0%, 
            #3d1a0a 30%,
            #6b3010 50%, 
            #2a1508 100%)`,
          intensityOverlay: `
            radial-gradient(ellipse at 50% 40%, rgba(251, 191, 36, ${intensity * 0.5}) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(245, 158, 11, ${intensity * 0.4}) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 30%, rgba(251, 146, 60, ${intensity * 0.35}) 0%, transparent 45%)
          `,
          accentColor: '#f59e0b',
          secondaryColor: '#fbbf24',
          particleColor: 'rgba(251, 191, 36, 0.7)',
          glowColor: 'rgba(245, 158, 11, 0.5)',
          smoke: true,
          warmGlow: true,
        };
      
      default:
        return {
          baseGradient: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          intensityOverlay: 'transparent',
          accentColor: '#fbbf24',
          secondaryColor: '#fbbf24',
          particleColor: 'rgba(251, 191, 36, 0.5)',
          glowColor: 'rgba(251, 191, 36, 0.3)',
        };
    }
  }, [accordType, intensity]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? `0 0 40px ${environmentStyle.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
          : `0 10px 40px rgba(0,0,0,0.4)`,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{ background: environmentStyle.baseGradient }}
      />
      
      {/* Animated intensity overlay */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{ 
          background: environmentStyle.intensityOverlay,
          opacity: 0.6 + intensity * 0.4,
        }}
      />

      {/* Woody: Light rays through trees */}
      {accordType === 'woody' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(251, 191, 36, ${intensity * 0.15}) 0%, 
                  transparent 60%
                )
              `,
              opacity: intensity,
            }}
          />
          {/* Tree silhouettes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 + intensity * 0.3 }}>
            <defs>
              <linearGradient id="treeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <polygon points="10,100 15,60 20,100" fill="url(#treeGrad)" style={{ transform: 'scale(2)' }} />
            <polygon points="30,100 37,50 44,100" fill="url(#treeGrad)" style={{ transform: 'scale(2.2)' }} />
            <polygon points="70,100 78,40 86,100" fill="url(#treeGrad)" style={{ transform: 'scale(1.8)' }} />
          </svg>
          {/* Light rays */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                repeating-linear-gradient(
                  120deg,
                  transparent,
                  transparent 40px,
                  rgba(251, 191, 36, ${intensity * 0.08}) 40px,
                  rgba(251, 191, 36, ${intensity * 0.08}) 80px
                )
              `,
              animation: 'lightRays 8s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Floral: Floating petals */}
      {accordType === 'floral' && (
        <>
          {[...Array(Math.floor(6 + intensity * 8))].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                width: `${8 + Math.random() * 12}px`,
                height: `${12 + Math.random() * 16}px`,
                background: i % 2 === 0 
                  ? `radial-gradient(ellipse, ${environmentStyle.accentColor}${Math.floor(40 + intensity * 40).toString(16)} 0%, transparent 70%)`
                  : `radial-gradient(ellipse, ${environmentStyle.secondaryColor}${Math.floor(30 + intensity * 40).toString(16)} 0%, transparent 70%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animation: `petal-fall ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                opacity: 0.4 + intensity * 0.5,
                filter: `blur(${Math.random() * 1}px)`,
              }}
            />
          ))}
          {/* Bloom effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, 
                rgba(244, 114, 182, ${intensity * 0.2}) 0%, 
                transparent 50%)`,
              animation: 'bloom-pulse 3s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Fresh: Water bubbles and ripples */}
      {accordType === 'fresh' && (
        <>
          {/* Ripple effect */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '30%',
              top: '60%',
              width: `${60 + intensity * 80}px`,
              height: `${60 + intensity * 80}px`,
              border: `2px solid rgba(34, 211, 238, ${intensity * 0.3})`,
              borderRadius: '50%',
              animation: 'ripple 3s ease-out infinite',
            }}
          />
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '60%',
              top: '40%',
              width: `${40 + intensity * 60}px`,
              height: `${40 + intensity * 60}px`,
              border: `2px solid rgba(103, 232, 249, ${intensity * 0.25})`,
              borderRadius: '50%',
              animation: 'ripple 4s ease-out 1s infinite',
            }}
          />
          {/* Bubbles */}
          {[...Array(Math.floor(5 + intensity * 10))].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: `-10%`,
                width: `${4 + Math.random() * 8 + intensity * 4}px`,
                height: `${4 + Math.random() * 8 + intensity * 4}px`,
                background: `radial-gradient(circle at 30% 30%, 
                  rgba(255, 255, 255, ${0.4 + intensity * 0.3}) 0%, 
                  rgba(34, 211, 238, ${0.2 + intensity * 0.2}) 50%, 
                  transparent 70%)`,
                animation: `bubble-rise ${3 + Math.random() * 4}s ease-out ${Math.random() * 2}s infinite`,
                opacity: 0.5 + intensity * 0.4,
              }}
            />
          ))}
          {/* Water shimmer */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, ${intensity * 0.1}) 0%, 
                transparent 30%, 
                rgba(34, 211, 238, ${intensity * 0.15}) 100%)`,
              animation: 'shimmer 4s ease-in-out infinite',
            }}
          />
        </>
      )}

      {/* Oriental: Smoke and warm glow */}
      {accordType === 'oriental' && (
        <>
          {/* Smoke wisps */}
          {[...Array(Math.floor(4 + intensity * 6))].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '10%',
                width: `${30 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 80}px`,
                background: `linear-gradient(to top, 
                  rgba(251, 191, 36, ${0.1 + intensity * 0.15}) 0%, 
                  rgba(245, 158, 11, ${0.05 + intensity * 0.1}) 50%,
                  transparent 100%)`,
                borderRadius: '50%',
                filter: `blur(${10 + Math.random() * 10}px)`,
                animation: `smoke-rise ${5 + Math.random() * 4}s ease-out ${Math.random() * 2}s infinite`,
                opacity: 0.4 + intensity * 0.4,
              }}
            />
          ))}
          {/* Warm central glow */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${100 + intensity * 100}px`,
              height: `${100 + intensity * 100}px`,
              background: `radial-gradient(circle, 
                rgba(251, 191, 36, ${intensity * 0.4}) 0%, 
                rgba(245, 158, 11, ${intensity * 0.2}) 40%,
                transparent 70%)`,
              animation: 'glow-pulse 4s ease-in-out infinite',
            }}
          />
          {/* Spice particles */}
          {[...Array(Math.floor(8 + intensity * 12))].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#fb923c',
                animation: `spice-float ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                opacity: 0.3 + intensity * 0.5,
              }}
            />
          ))}
        </>
      )}

      {/* Floating particles for all types */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${environmentStyle.particleColor} 0%, transparent 70%)`,
            opacity: particle.opacity,
            animation: `particle-float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            ${environmentStyle.glowColor} 0%, 
            transparent 60%)`,
          opacity: isHovered ? 0.6 : 0,
        }}
      />
      
      {/* Label overlay with glass effect */}
      <div 
        className="absolute top-4 left-4 z-20 px-4 py-2 rounded-xl transition-all duration-300"
        style={{
          background: `rgba(0, 0, 0, ${0.3 + intensity * 0.2})`,
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255, 255, 255, ${0.1 + intensity * 0.1})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <h3 
          className="text-xl md:text-2xl font-light tracking-wide"
          style={{ 
            color: 'white',
            textShadow: `0 0 30px ${environmentStyle.accentColor}80`,
          }}
        >
          {label}
        </h3>
        <div 
          className="text-sm font-light tracking-widest mt-1 flex items-center gap-2"
          style={{ 
            color: environmentStyle.accentColor,
          }}
        >
          <span>{value}%</span>
          <div 
            className="h-1 flex-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${value}%`,
                background: `linear-gradient(90deg, ${environmentStyle.accentColor}, ${environmentStyle.secondaryColor})`,
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Slider container with glass effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 z-20"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      >
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-accord w-full h-2 bg-transparent appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              ${environmentStyle.accentColor} 0%, 
              ${environmentStyle.secondaryColor} ${value}%, 
              rgba(255, 255, 255, 0.15) ${value}%, 
              rgba(255, 255, 255, 0.15) 100%)`,
            borderRadius: '4px',
          }}
          aria-label={`${label} accord intensity`}
        />
      </div>
      
      {/* Outer glow ring on high intensity */}
      {intensity > 0.6 && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            boxShadow: `inset 0 0 ${30 + intensity * 40}px ${environmentStyle.glowColor}`,
            opacity: (intensity - 0.6) * 1.5,
            transition: 'all 0.5s ease-out',
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(5px) scale(1.1); }
          50% { transform: translateY(-25px) translateX(-5px) scale(1); opacity: 0.6; }
          75% { transform: translateY(-15px) translateX(8px) scale(0.9); }
        }
        
        @keyframes petal-fall {
          0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120px) rotate(360deg) scale(0.8); opacity: 0; }
        }
        
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-200px) scale(0.5); opacity: 0; }
        }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        @keyframes smoke-rise {
          0% { transform: translateY(0) scaleX(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-150px) scaleX(1.5); opacity: 0; }
        }
        
        @keyframes spice-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(90deg); }
          50% { transform: translate(-5px, -20px) rotate(180deg); }
          75% { transform: translate(-10px, -10px) rotate(270deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        
        @keyframes bloom-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes lightRays {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 0.5; transform: translateX(20px); }
        }

        .slider-accord::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            white 0%, 
            ${environmentStyle.accentColor} 50%, 
            ${environmentStyle.secondaryColor} 100%);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2),
                      0 0 20px ${environmentStyle.accentColor},
                      0 4px 15px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .slider-accord::-webkit-slider-thumb:hover {
          transform: scale(1.3);
          box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.3),
                      0 0 35px ${environmentStyle.accentColor},
                      0 6px 20px rgba(0, 0, 0, 0.5);
        }

        .slider-accord::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }

        .slider-accord::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            white 0%, 
            ${environmentStyle.accentColor} 50%, 
            ${environmentStyle.secondaryColor} 100%);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2),
                      0 0 20px ${environmentStyle.accentColor},
                      0 4px 15px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-accord::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 4px;
        }

        .slider-accord::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
