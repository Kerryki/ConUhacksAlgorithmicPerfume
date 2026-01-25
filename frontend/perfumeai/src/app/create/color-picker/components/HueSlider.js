'use client';

export default function HueSlider({ hue, onHueChange }) {
  const handleChange = (e) => {
    onHueChange(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={handleChange}
        onInput={handleChange}
        className="hue-slider w-full h-2 bg-transparent appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, 
            #ff0000 0%, 
            #ffff00 17%, 
            #00ff00 33%, 
            #00ffff 50%, 
            #0000ff 67%, 
            #ff00ff 83%, 
            #ff0000 100%)`
        }}
        aria-label="Hue selector"
      />
      
      <style jsx>{`
        .hue-slider::-webkit-slider-thumb {
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

        .hue-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.35),
                      0 0 40px rgba(251, 191, 36, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.7),
                      inset 0 1px 3px rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .hue-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.4),
                      0 0 35px rgba(251, 191, 36, 0.6),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }

        .hue-slider::-moz-range-thumb {
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

        .hue-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.35),
                      0 0 40px rgba(251, 191, 36, 0.7),
                      0 6px 16px rgba(0, 0, 0, 0.7),
                      inset 0 1px 3px rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .hue-slider::-moz-range-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.4),
                      0 0 35px rgba(251, 191, 36, 0.6),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 1px 3px rgba(255, 255, 255, 0.4);
        }

        .hue-slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 8px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4),
                      0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .hue-slider::-moz-range-track {
          height: 8px;
          border-radius: 8px;
          background: transparent;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4),
                      0 1px 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
