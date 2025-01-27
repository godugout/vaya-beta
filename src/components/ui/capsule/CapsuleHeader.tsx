import React from "react";

export const CapsuleHeader = () => {
  return (
    <div className="relative mx-auto py-24 px-4 w-full left-0 -mt-20 bg-gradient-to-b from-vaya-primary/90 to-vaya-primary/70">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white font-outfit drop-shadow-lg">
          Family Capsules <br /> Your Digital Time Machine
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-xl mt-8 text-white/90 font-inter drop-shadow">
          Create and explore digital time capsules filled with your family's most precious memories.
          Each capsule is a unique collection of stories, photos, and moments waiting to be discovered.
        </p>
      </div>
    </div>
  );
};