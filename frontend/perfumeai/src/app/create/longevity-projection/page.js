'use client';

import { useState } from 'react';
import LongevityClock from './components/LongevityClock';
import ProjectionAura from './components/ProjectionAura';

export default function LongevityProjectionPage() {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  const handleNext = async () => {
    // Normalize slider value (0-100) to float (0.0-1.0)
    const normalizedValue = sliderValue / 100;
    
    // Calculate longevity and projection scores (inverse relationship)
    const longevityScore = (100 - sliderValue) / 100; // Inverse
    const projectionScore = normalizedValue; // Direct
    
    // Prepare payload for backend
    const payload = {
      projection_score: parseFloat(projectionScore.toFixed(2)),
      longevity_score: parseFloat(longevityScore.toFixed(2)),
      raw_slider_value: sliderValue,
      timestamp: new Date().toISOString()
    };
    
    // Log to console (mock backend call)
    console.log('=== Sillage Selector Output ===');
    console.log('Normalized Projection Score:', payload.projection_score);
    console.log('Normalized Longevity Score:', payload.longevity_score);
    console.log('Full Payload:', payload);
    console.log('================================');
    
    // TODO: Send to actual backend
    // try {
    //   const response = await fetch('http://localhost:5000/api/perfumes/sillage', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload)
    //   });
    //   const data = await response.json();
    //   console.log('Backend response:', data);
    // } catch (error) {
    //   console.error('Error sending to backend:', error);
    // }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center space-y-3 pt-8">
        <h1 className="text-4xl md:text-5xl font-light text-white">
          Define Your <span className="text-amber-400 italic font-serif">Aura</span>
        </h1>
        <p className="text-white/60 text-sm font-light tracking-wide max-w-md">
          Balance the enduring nature of your fragrance with its radiant projection.
        </p>
      </div>

      {/* Central Visual - Overlaid Clock and Aura */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl relative pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Projection Aura - Behind */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ProjectionAura sliderValue={sliderValue} />
          </div>
          
          {/* Longevity Clock - On Top */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <LongevityClock sliderValue={sliderValue} />
          </div>
        </div>
      </div>

      {/* Slider Section - Bottom */}
      <div className="w-full max-w-2xl pb-8 space-y-8">
        {/* Slider Container */}
        <div className="space-y-6">
          {/* Labels with Subtitles */}
          <div className="flex justify-between items-start px-1">
            <div className="text-left">
              <div className="text-white text-base font-light tracking-wide mb-1">
                Long Lasting
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest">
                Intimate & Enduring
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-base font-light tracking-wide mb-1">
                Enormous Projection
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest">
                Bold & Radiant
              </div>
            </div>
          </div>

          {/* Custom Styled Slider with Golden Track */}
          <div className="relative py-2">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onInput={handleSliderChange}
              onChange={handleSliderChange}
              className="slider-luxury w-full h-2 bg-transparent appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  rgba(251, 191, 36, 0.4) 0%, 
                  rgba(251, 191, 36, 0.7) ${sliderValue}%, 
                  rgba(255, 255, 255, 0.15) ${sliderValue}%, 
                  rgba(255, 255, 255, 0.15) 100%)`
              }}
            />
            
            {/* Percentage Markers */}
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-white/30 text-xs">0%</span>
              <span className="text-white/30 text-xs">50%</span>
              <span className="text-white/30 text-xs">100%</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-white font-light text-lg tracking-wide hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/20"
        >
          Continue
        </button>
      </div>

      <style jsx>{`
        .slider-luxury::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #fde68a 0%, #fbbf24 40%, #f59e0b 100%);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.25),
                      0 0 25px rgba(251, 191, 36, 0.5),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid rgba(255, 255, 255, 0.4);
          position: relative;
        }

        .slider-luxury::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.35),
                      0 0 40px rgba(251, 191, 36, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.7),
                      inset 0 1px 3px rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .slider-luxury::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.4),
                      0 0 35px rgba(251, 191, 36, 0.6),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }

        .slider-luxury::-moz-range-thumb {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #fde68a 0%, #fbbf24 40%, #f59e0b 100%);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.25),
                      0 0 25px rgba(251, 191, 36, 0.5),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slider-luxury::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.35),
                      0 0 40px rgba(251, 191, 36, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.7),
                      inset 0 1px 3px rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .slider-luxury::-moz-range-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.4),
                      0 0 35px rgba(251, 191, 36, 0.6),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }

        .slider-luxury::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 8px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4),
                      0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .slider-luxury::-moz-range-track {
          height: 6px;
          border-radius: 8px;
          background: transparent;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4),
                      0 1px 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
