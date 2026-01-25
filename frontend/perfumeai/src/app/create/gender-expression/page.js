'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DraggableMolecule from './components/DraggableMolecule';

export default function GenderExpressionPage() {
  const router = useRouter();
  const [moleculePosition, setMoleculePosition] = useState({ x: 0, y: 0 });
  const [genderValue, setGenderValue] = useState(0.5);
  const constraintsRef = useRef(null);

  // Calculate gender value from 2D position
  const calculateGenderValue = useCallback((x, y) => {
    if (!constraintsRef.current) return 0.5;
    
    const rect = constraintsRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Convert from center-based coordinates to normalized 0-1
    const normalizedX = (x + centerX) / rect.width;
    const normalizedY = (y + centerY) / rect.height;
    
    // Diagonal mapping: bottom-left (0,1) = 0.0, top-right (1,0) = 1.0
    const value = (normalizedX + (1 - normalizedY)) / 2;
    
    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, value));
  }, []);

  const handlePositionChange = useCallback((x, y) => {
    setMoleculePosition({ x, y });
    const newGenderValue = calculateGenderValue(x, y);
    setGenderValue(newGenderValue);
  }, [calculateGenderValue]);

  const handleContinue = () => {
    // Determine category based on gender value
    let category;
    if (genderValue < 0.33) {
      category = 'feminine';
    } else if (genderValue < 0.67) {
      category = 'neutral';
    } else {
      category = 'masculine';
    }

    const genderData = {
      gender_expression: parseFloat(genderValue.toFixed(2)),
      position: {
        x: Math.round(moleculePosition.x),
        y: Math.round(moleculePosition.y)
      },
      category: category,
      timestamp: new Date().toISOString()
    };

    // Store to localStorage
    localStorage.setItem('perfume_gender_data', JSON.stringify(genderData));

    // Log for debugging
    console.log('=== Gender Expression Output ===');
    console.log(genderData);
    console.log('================================');

    // Navigate to time-mood page
    router.push('/create/time-mood');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Diagonal Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            #ec4899 0%, 
            #f472b6 20%, 
            #a78bfa 50%, 
            #60a5fa 80%, 
            #3b82f6 100%)`
        }}
      />

      {/* Dark overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)`
        }}
      />

      {/* Unisex Balance Line */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <line 
          x1="0" 
          y1="100%" 
          x2="100%" 
          y2="0" 
          stroke="#fbbf24" 
          strokeWidth="2" 
          strokeDasharray="10,5"
          opacity="0.4"
        />
      </svg>

      {/* Corner Labels */}
      <div 
        className="absolute bottom-8 left-8 text-white/60 text-sm font-light tracking-wide" 
        style={{ 
          zIndex: 5,
          transform: 'rotate(-45deg)',
          transformOrigin: 'left bottom'
        }}
      >
        Feminine
      </div>
      <div 
        className="absolute bottom-8 right-8 text-white/60 text-sm font-light tracking-wide" 
        style={{ 
          zIndex: 5,
          transform: 'rotate(-45deg)',
          transformOrigin: 'right bottom'
        }}
      >
        Masculine
      </div>

      {/* Header Section - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-light text-white/40">
            Choose <span className="text-amber-400/40 italic font-serif">Gender</span>
          </h1>
        </div>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6 z-10 pointer-events-none">
        <button
          onClick={handleContinue}
          className="py-3 px-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/60 font-light text-sm tracking-wide hover:bg-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-300 pointer-events-auto"
        >
          Continue
        </button>
      </div>

      {/* Central Draggable Molecule Area */}
      <div 
        ref={constraintsRef}
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{ pointerEvents: 'none' }}
      >
        <DraggableMolecule
          genderValue={genderValue}
          onPositionChange={handlePositionChange}
          constraintsRef={constraintsRef}
        />
      </div>
    </div>
  );
}
