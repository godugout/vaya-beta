
import React from 'react';

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Vaya</h1>
        <p className="text-lg mb-8">Your family history preservation platform</p>
        
        <div className="p-8 bg-slate-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">
            This is a simplified layout with a solid background color to ensure everything is rendering correctly.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
            Explore Features
          </button>
        </div>
      </div>
    </div>
  );
}
