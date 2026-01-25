'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ColorWheel from './components/ColorWheel';
import HueSlider from './components/HueSlider';

export default function ColorPickerPage() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState(false);
  const [hue, setHue] = useState(180); // Start with cyan
  const [saturation, setSaturation] = useState(50);
  const [brightness, setBrightness] = useState(80);

  // HSB to HEX conversion function
  const hsbToHex = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    const rgb = [f(5), f(3), f(1)].map(x => Math.round(x * 255));
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
  };

  // Calculate selected color HEX value
  const selectedColor = useMemo(() => {
    return hsbToHex(hue, saturation, brightness);
  }, [hue, saturation, brightness]);

  // Calculate darker shade for gradient
  const darkerShade = useMemo(() => {
    const s = saturation / 100;
    const b = brightness / 100;
    const k = (n) => (n + hue / 60) % 6;
    const f = (n) => (b * 0.3) * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    const rgb = [f(5), f(3), f(1)].map(x => Math.round(x * 255));
    return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
  }, [hue, saturation, brightness]);

  const handleHueChange = (newHue) => {
    setHue(newHue);
  };

  const handleSaturationBrightnessChange = (newSaturation, newBrightness) => {
    setSaturation(newSaturation);
    setBrightness(newBrightness);
  };

  const handleContinue = () => {
    const colorData = {
      hex_color: selectedColor,
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      brightness: Math.round(brightness),
      timestamp: new Date().toISOString()
    };
    
    // Store to localStorage
    localStorage.setItem('perfume_color_data', JSON.stringify(colorData));
    
    // Log for debugging
    console.log('=== Color Picker Output ===');
    console.log(colorData);
    console.log('===========================');
    
    // Navigate to next page
    router.push('/create/longevity-projection');
  };

  // Show start screen if flow hasn't started
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-md">
          <h1 className="text-3xl md:text-4xl font-light text-white tracking-wide">
            Choose Your <span className="text-amber-400 italic font-serif">Essence</span>
          </h1>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            Select a color that resonates with your emotional tone and aesthetic taste
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between px-6 py-12 relative overflow-hidden"
      style={{
        backgroundColor: selectedColor,
        transition: 'background-color 0.3s ease-in-out'
      }}
    >
      {/* Dark overlay for readability and depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.85) 100%)`
        }}
      />

      {/* Header Section */}
      <div className="text-center space-y-3 pt-8 relative z-10">
        {/* Step indicator */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm bg-amber-500/10 border border-amber-500/30">
          <span className="text-xs font-light tracking-widest uppercase text-amber-400">
            Step 2 of 7
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light text-white">
          Choose Your <span className="text-amber-400 italic font-serif">Essence</span>
        </h1>
        <p className="text-white/60 text-sm font-light tracking-wide max-w-md">
          Express your aesthetic through color
        </p>
      </div>

      {/* Central Visual - Color Circle */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl relative z-10">
        <ColorWheel
          hue={hue}
          saturation={saturation}
          brightness={brightness}
          onSaturationBrightnessChange={handleSaturationBrightnessChange}
        />
      </div>

      {/* Controls Section - Bottom */}
      <div className="w-full max-w-2xl pb-8 space-y-8 relative z-10">
        {/* Hue Slider */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-white/40 text-xs uppercase tracking-widest">
              Hue
            </div>
          </div>
          <HueSlider hue={hue} onHueChange={handleHueChange} />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-white font-light text-lg tracking-wide hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/20"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
