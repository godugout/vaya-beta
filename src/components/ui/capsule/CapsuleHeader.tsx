import React from "react";

export const CapsuleHeader = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-vaya-primary/90 to-vaya-primary/70 pb-28">
      <div className="relative z-10 max-w-7xl mx-auto text-center py-16 px-4">
        <h1 className="font-outfit font-bold text-4xl tracking-tight text-white sm:text-6xl mb-4 leading-tight">
          Family Capsules
        </h1>
        <h2 className="font-outfit font-normal text-2xl sm:text-3xl text-white/90 mb-6 leading-relaxed">
          Your Digital Time Machine
        </h2>
        <p className="font-inter text-lg leading-8 text-white/90 mb-10">
          Create and explore digital time capsules filled with your family's most precious memories.
          Each capsule is a unique collection of stories, photos, and moments waiting to be discovered.
        </p>
      </div>
    </div>
  );
};