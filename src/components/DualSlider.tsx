"use client";
import React, { useEffect, useRef } from "react";

interface DualSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const DualSlider: React.FC<DualSliderProps> = ({ min, max, value, onChange }) => {
  const [minVal, maxVal] = value;
  const trackRef = useRef<HTMLDivElement>(null);
  const minDistance = 1;

  useEffect(() => {
    if (trackRef.current) {
      const range = max - min;
      const minPercent = ((minVal - min) / range) * 100;
      const maxPercent = ((maxVal - min) / range) * 100;

      trackRef.current.style.background = `linear-gradient(to right, #C6C6C6 0%, #C6C6C6 ${minPercent}%, #25daa5 ${minPercent}%, #25daa5 ${maxPercent}%, #C6C6C6 ${maxPercent}%, #C6C6C6 100%)`;
    }
  }, [minVal, maxVal, min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxVal - minDistance);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minVal + minDistance);
    onChange([minVal, newMax]);
  };

  return (
    <div className="w-full">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 my-6 rounded bg-gray-300"
      ></div>

      {/* Sliders with offset layering technique */}
      <div className="relative -mt-10 h-6">
        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent z-20 pointer-events-auto 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-[#25daa5] 
          [&::-webkit-slider-thumb]:cursor-pointer"
        />

        {/* Max Slider (rtl to avoid overlap issues) */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          dir="rtl"
          className="absolute w-full appearance-none bg-transparent z-30 pointer-events-auto 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-[#25daa5] 
          [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>

      {/* Number inputs */}
      <div className="flex justify-between mt-4">
        <input
          type="number"
          value={minVal}
          min={min}
          max={max - minDistance}
          onChange={handleMinChange}
          className="w-20 p-1 text-center border border-gray-300 rounded"
        />
        <input
          type="number"
          value={maxVal}
          min={min + minDistance}
          max={max}
          onChange={handleMaxChange}
          className="w-20 p-1 text-center border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default DualSlider;
