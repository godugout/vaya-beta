import React from "react";

export const CapsuleHeader = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-vaya-primary/90 to-vaya-primary/70">
      <div className="max-w-7xl mx-auto text-center py-16 px-4">
        <h1 className="text-4xl font-bold text-white font-outfit drop-shadow-lg mb-2">
          Family Capsules
        </h1>
        <h2 className="text-3xl font-normal text-white/90 font-outfit drop-shadow-lg mb-8">
          Your Digital Time Machine
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white/90 font-inter drop-shadow">
          Create and explore digital time capsules filled with your family's most precious memories.
          Each capsule is a unique collection of stories, photos, and moments waiting to be discovered.
        </p>
      </div>
    </div>
  );
};