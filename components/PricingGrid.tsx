import React from "react";
import { AppState } from "../types";
import { PricingCard } from "./PricingCard";

interface PricingGridProps {
  state: AppState;
  forceDesktop?: boolean;
}

export const PricingGrid: React.FC<PricingGridProps> = ({
  state,
  forceDesktop = false,
}) => {
  // If forceDesktop is true, we apply the grid columns directly without 'md:' prefix
  // This ensures the 1200px capture container renders 3 columns even if the browser window is small.
  const gridClasses = forceDesktop
    ? "grid grid-cols-3"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const flexClasses = "flex-col md:flex-row flex-wrap justify-center";
  const forcedFlexClasses = "flex-row flex-wrap justify-center";

  const layoutClass =
    state.design.layout === "grid"
      ? gridClasses
      : forceDesktop
      ? forcedFlexClasses
      : flexClasses;

  return (
    <div className={`flex gap-6 items-stretch ${layoutClass}`}>
      {state.tiers.map((tier) => (
        <div key={tier.id} className="w-full md:w-80 shrink-0">
          <PricingCard tier={tier} design={state.design} />
        </div>
      ))}
    </div>
  );
};
