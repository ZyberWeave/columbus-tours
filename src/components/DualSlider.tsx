"use client";
import React from "react";
import { Range, getTrackBackground } from "react-range";

interface DualSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const DualSlider: React.FC<DualSliderProps> = ({ min, max, value, onChange }) => {
  return (
    <div className="w-full">
      <Range
        values={value}
        step={1}
        min={min}
        max={max}
        onChange={(values) => onChange(values as [number, number])}
        renderTrack={({ props, children }) => (
          // Outer container for mouse and touch events
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Inner container that receives the ref */}
            <div
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: value,
                  colors: ["#C6C6C6", "#25daa5", "#C6C6C6"],
                  min: min,
                  max: max,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => {
          // Destructure to remove the key from the spread
          const { key, ...thumbProps } = props;
          return (
            <div
              key={key}
              {...thumbProps}
              style={{
                ...thumbProps.style,
                height: "24px",
                width: "24px",
                borderRadius: "50%",
                backgroundColor: "#25daa5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              {/* Optional: Display current value when dragged */}
              <div
                style={{
                  position: "absolute",
                  top: "-28px",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {isDragged ? value[index] : ""}
              </div>
            </div>
          );
        }}
      />

      {/* Number inputs for precise control */}
      <div className="flex justify-between mt-4">
        <input
          type="number"
          value={value[0]}
          min={min}
          max={value[1]}
          onChange={(e) => {
            const newMin = parseInt(e.target.value, 10);
            if (newMin <= value[1]) {
              onChange([newMin, value[1]]);
            }
          }}
          aria-label="Minimum value input"
          className="w-20 p-1 text-center border border-gray-300 rounded"
        />
        <input
          type="number"
          value={value[1]}
          min={value[0]}
          max={max}
          onChange={(e) => {
            const newMax = parseInt(e.target.value, 10);
            if (newMax >= value[0]) {
              onChange([value[0], newMax]);
            }
          }}
          aria-label="Maximum value input"
          className="w-20 p-1 text-center border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default DualSlider;
