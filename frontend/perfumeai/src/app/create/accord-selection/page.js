'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccordEnvironment from './components/AccordEnvironment';

// Animated background particles
function BackgroundParticles({ accords }) {
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < 30; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 10,
      });
    }
    return p;
  }, []);

  // Determine dominant color based on highest accord
  const dominantColor = useMemo(() => {
    const { woody, floral, fresh, oriental } = accords;
    const max = Math.max(woody, floral, fresh, oriental);
    if (max === 0) return 'rgba(251, 191, 36, 0.3)';
    if (max === woody) return 'rgba(251, 191, 36, 0.4)';
    if (max === floral) return 'rgba(236, 72, 153, 0.4)';
    if (max === fresh) return 'rgba(34, 211, 238, 0.4)';
    return 'rgba(245, 158, 11, 0.4)';
  }, [accords]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: dominantColor,
            animation: `float-background ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-background {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          25% { transform: translate(30px, -30px) scale(1.2); opacity: 0.4; }
          50% { transform: translate(-20px, -60px) scale(1); opacity: 0.3; }
          75% { transform: translate(20px, -30px) scale(0.8); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// Animated circular progress indicator
function CircularProgress({ normalizedValues }) {
  const segments = [
    { key: 'woody', color: '#fbbf24', label: 'Woody' },
    { key: 'floral', color: '#ec4899', label: 'Floral' },
    { key: 'fresh', color: '#22d3ee', label: 'Fresh' },
    { key: 'oriental', color: '#f59e0b', label: 'Oriental' },
  ];

  let cumulativePercent = 0;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
        />
        {/* Segments */}
        {segments.map((segment, index) => {
          const percent = normalizedValues[segment.key] * 100;
          const dashArray = `${percent * 2.51} ${251.2 - percent * 2.51}`;
          const dashOffset = -cumulativePercent * 2.51;
          cumulativePercent += percent;

          return (
            <circle
              key={segment.key}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={segment.color}
              strokeWidth="8"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              style={{
                filter: `drop-shadow(0 0 6px ${segment.color}80)`,
              }}
            />
          );
        })}
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/60 text-xs font-light tracking-wider">BLEND</span>
      </div>
    </div>
  );
}

export default function AccordSelectionPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Independent slider states for each accord (0-100)
  const [woodyValue, setWoodyValue] = useState(25);
  const [floralValue, setFloralValue] = useState(25);
  const [freshValue, setFreshValue] = useState(25);
  const [orientalValue, setOrientalValue] = useState(25);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calculate normalized values in real-time
  const normalizedValues = useMemo(() => {
    const total = woodyValue + floralValue + freshValue + orientalValue;
    
    if (total === 0) {
      return { woody: 0, floral: 0, fresh: 0, oriental: 0 };
    }
    
    return {
      woody: woodyValue / total,
      floral: floralValue / total,
      fresh: freshValue / total,
      oriental: orientalValue / total
    };
  }, [woodyValue, floralValue, freshValue, orientalValue]);

  const handleContinue = () => {
    const accordData = [
      { floral: parseFloat(normalizedValues.floral.toFixed(2)) },
      { oriental: parseFloat(normalizedValues.oriental.toFixed(2)) },
      { woody: parseFloat(normalizedValues.woody.toFixed(2)) },
      { fresh: parseFloat(normalizedValues.fresh.toFixed(2)) }
    ];

    localStorage.setItem('perfume_accord_data', JSON.stringify({
      normalized_accords: accordData,
      raw_values: { woody: woodyValue, floral: floralValue, fresh: freshValue, oriental: orientalValue },
      timestamp: new Date().toISOString()
    }));

    console.log('=== Accord Selection Output ===');
    console.log('Normalized Accords:', accordData);
    console.log('================================');

    // router.push('/create/next-page');
    console.log('Ready to navigate to next page');
  };

  return (
    <div className="min-h-screen bg-[#030305] flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <BackgroundParticles accords={{ woody: woodyValue, floral: floralValue, fresh: freshValue, oriental: orientalValue }} />
      
      {/* Gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(251, 191, 36, ${woodyValue * 0.001}) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, ${floralValue * 0.001}) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(34, 211, 238, ${freshValue * 0.001}) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, ${orientalValue * 0.001}) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 py-6 md:py-10">
        {/* Header Section */}
        <div 
          className={`text-center space-y-4 mb-6 md:mb-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-wide">
            Blend Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 italic font-serif">Essence</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base font-light tracking-wide max-w-lg mx-auto">
            Shape the soul of your fragrance by balancing these primal scent worlds
          </p>
        </div>

        {/* Circular Progress */}
        <div 
          className={`mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <CircularProgress normalizedValues={normalizedValues} />
        </div>

        {/* 2x2 Grid of Accord Environments */}
        <div 
          className={`flex-1 flex items-center justify-center w-full max-w-6xl mx-auto mb-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
            {/* Woody Environment */}
            <div 
              className="aspect-[4/3] min-h-[180px] md:min-h-[220px]"
              style={{ 
                animation: 'card-appear 0.8s ease-out 0.1s both',
              }}
            >
              <AccordEnvironment
                accordType="woody"
                value={woodyValue}
                onChange={setWoodyValue}
                label="Woody"
              />
            </div>

            {/* Floral Environment */}
            <div 
              className="aspect-[4/3] min-h-[180px] md:min-h-[220px]"
              style={{ 
                animation: 'card-appear 0.8s ease-out 0.2s both',
              }}
            >
              <AccordEnvironment
                accordType="floral"
                value={floralValue}
                onChange={setFloralValue}
                label="Floral"
              />
            </div>

            {/* Fresh Environment */}
            <div 
              className="aspect-[4/3] min-h-[180px] md:min-h-[220px]"
              style={{ 
                animation: 'card-appear 0.8s ease-out 0.3s both',
              }}
            >
              <AccordEnvironment
                accordType="fresh"
                value={freshValue}
                onChange={setFreshValue}
                label="Fresh"
              />
            </div>

            {/* Oriental Environment */}
            <div 
              className="aspect-[4/3] min-h-[180px] md:min-h-[220px]"
              style={{ 
                animation: 'card-appear 0.8s ease-out 0.4s both',
              }}
            >
              <AccordEnvironment
                accordType="oriental"
                value={orientalValue}
                onChange={setOrientalValue}
                label="Oriental"
              />
            </div>
          </div>
        </div>

        {/* Normalized Values Display */}
        <div 
          className={`w-full max-w-3xl mx-auto mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
            {[
              { key: 'woody', color: '#fbbf24', value: normalizedValues.woody },
              { key: 'floral', color: '#ec4899', value: normalizedValues.floral },
              { key: 'fresh', color: '#22d3ee', value: normalizedValues.fresh },
              { key: 'oriental', color: '#f59e0b', value: normalizedValues.oriental },
            ].map((item) => (
              <div 
                key={item.key}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ 
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
                <span 
                  className="text-xs font-light capitalize"
                  style={{ color: item.color }}
                >
                  {item.key}
                </span>
                <span className="text-white/60 text-xs font-medium">
                  {(item.value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div 
          className={`w-full max-w-md mx-auto pb-4 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button
            onClick={handleContinue}
            className="group w-full py-4 relative overflow-hidden rounded-full text-white font-light text-lg tracking-wide transition-all duration-500 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(236, 72, 153, 0.2), rgba(34, 211, 238, 0.2), rgba(245, 158, 11, 0.2))',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(236, 72, 153, 0.3), rgba(34, 211, 238, 0.3), rgba(245, 158, 11, 0.3))',
              }}
            />
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
            />
            <span className="relative z-10">Continue</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
