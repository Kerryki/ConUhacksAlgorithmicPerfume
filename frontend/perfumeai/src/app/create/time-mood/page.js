'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TimeIndicator from './components/TimeIndicator';
import StarsBackground from './components/StarsBackground';
import CloudsBackground from './components/CloudsBackground';

export default function TimeMoodPage() {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    setSliderValue(Number(e.target.value));
  };

  // Calculate background gradient based on slider value
  const getBackgroundGradient = () => {
    const value = sliderValue;
    
    if (value <= 25) {
      // Dawn: Purple/pink gradient
      const progress = value / 25;
      return `linear-gradient(to bottom, 
        rgb(${147 + progress * 20}, ${51 + progress * 80}, ${234 - progress * 100}),
        rgb(${236 - progress * 100}, ${72 + progress * 80}, ${153 - progress * 50}),
        rgb(${245 - progress * 50}, ${158 + progress * 80}, ${11 + progress * 80}))`;
    } else if (value <= 50) {
      // Noon: Bright blue sky
      const progress = (value - 25) / 25;
      return `linear-gradient(to bottom,
        rgb(${59 + progress * 80}, ${130 + progress * 35}, ${246 - progress * 90}),
        rgb(${96 + progress * 51}, ${165 + progress * 20}, ${250 - progress * 103}),
        rgb(${147 + progress * 50}, ${197 + progress * 30}, ${253 - progress * 106}))`;
    } else if (value <= 75) {
      // Dusk: Orange/purple sunset
      const progress = (value - 50) / 25;
      return `linear-gradient(to bottom,
        rgb(${245 - progress * 138}, ${158 - progress * 86}, ${11 + progress * 97}),
        rgb(${236 - progress * 129}, ${72 + progress * 0}, ${153 - progress * 46}),
        rgb(${107 + progress * 0}, ${33 + progress * 0}, ${168 - progress * 0}))`;
    } else {
      // Midnight: Deep dark with purple tones
      const progress = (value - 75) / 25;
      return `linear-gradient(to bottom,
        rgb(${10 - progress * 5}, ${10 - progress * 5}, ${10 - progress * 5}),
        rgb(${30 - progress * 10}, ${27 - progress * 10}, ${75 - progress * 25}),
        rgb(${49 - progress * 20}, ${46 - progress * 20}, ${129 - progress * 50}))`;
    }
  };

  const handleContinue = () => {
    // Determine time period category
    let timePeriod;
    if (sliderValue <= 25) {
      timePeriod = 'dawn';
    } else if (sliderValue <= 50) {
      timePeriod = 'noon';
    } else if (sliderValue <= 75) {
      timePeriod = 'dusk';
    } else {
      timePeriod = 'midnight';
    }

    const timeData = {
      time_value: sliderValue,
      time_period: timePeriod,
      timestamp: new Date().toISOString()
    };

    // Store to localStorage
    localStorage.setItem('perfume_time_data', JSON.stringify(timeData));

    // Log to console
    console.log('=== Time & Mood Output ===');
    console.log('Time Value (0-100):', timeData.time_value);
    console.log('Time Period:', timeData.time_period);
    console.log('Full Payload:', timeData);
    console.log('==========================');

    // Navigate to next page (placeholder - update when next page is ready)
    // router.push('/create/next-page');
    console.log('Ready to navigate to next page');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col transition-all duration-500"
      style={{ background: getBackgroundGradient() }}
    >
      {/* Stars Background - visible at night */}
      <StarsBackground sliderValue={sliderValue} />

      {/* Clouds Background - visible during day */}
      <CloudsBackground sliderValue={sliderValue} />

      {/* Header Section */}
      <div className="text-center space-y-3 pt-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-light text-white drop-shadow-lg">
          Choose Your <span className="text-amber-400 italic font-serif">Moment</span>
        </h1>
        <p className="text-white/80 text-sm font-light tracking-wide max-w-md mx-auto drop-shadow">
          When does your fragrance shine brightest?
        </p>
      </div>

      {/* Central Time Indicator (Sun/Moon) */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-12">
        <TimeIndicator sliderValue={sliderValue} />
      </div>

      {/* Slider Section - Bottom */}
      <div className="w-full max-w-2xl mx-auto pb-8 px-6 relative z-10 space-y-8">
        {/* Custom Styled Slider */}
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
            aria-label="Time of day selector"
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
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
