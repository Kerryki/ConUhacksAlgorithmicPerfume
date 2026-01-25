'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ColorWheel from './components/ColorWheel';
import HueSlider from './components/HueSlider';

export default function ColorPickerPage() {
  const router = useRouter();
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
      <div className="w-full relative z-10 pt-8">
        {/* Back button and step indicator */}
        <div className="flex items-center justify-between mb-6 px-4">
          <Link
            href="/create/personality"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          {/* Step indicator */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm bg-amber-500/10 border border-amber-500/30">
            <span className="text-xs font-light tracking-widest uppercase text-amber-400">
              Step 2 of 8
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Your Favorite <span className="text-amber-400 italic font-serif">Color</span>
          </h1>
          <p className="text-white/60 text-sm font-light tracking-wide max-w-md mx-auto">
            Express your aesthetic through color
          </p>
        </div>
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
