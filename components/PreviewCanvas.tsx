import React, { forwardRef } from "react";
import { AppState } from "../types";
import { PricingGrid } from "./PricingGrid";

interface PreviewCanvasProps {
  state: AppState;
}

export const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(
  ({ state }, ref) => {
    return (
      <div className="flex-1 overflow-auto bg-slate-200/50 p-3 flex items-center justify-center">
        <div
          id="preview-container"
          ref={ref}
          className="p-6 min-w-min min-h-min transition-colors duration-500 ease-in-out shadow-2xl rounded-xl"
          style={{ backgroundColor: state.design.backgroundColor }}>
          <PricingGrid state={state} />

          {/* Optional footer credit in PDF/Preview */}
          <div
            className="mt-12 text-center text-sm opacity-50 font-medium"
            style={{ color: state.design.textColor }}>
            Generated with PriceCraft
          </div>
        </div>
      </div>
    );
  },
);

PreviewCanvas.displayName = "PreviewCanvas";
