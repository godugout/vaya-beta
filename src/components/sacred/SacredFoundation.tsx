
import React from 'react';
import { SacredGlyphGrid } from './SacredGlyphGrid';
import { sacredColors } from '@/styles/theme/colors/sacred';

// Creating styled color swatches for the demo
const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="flex flex-col items-center">
    <div 
      className="w-16 h-16 rounded-full mb-2" 
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-center">{name}</span>
  </div>
);

export const SacredFoundation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold mb-4">Sacred Foundation</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          A visual identity system honoring family heritage through meaningful symbols,
          colors, and typography that bridges generations.
        </p>
      </div>

      {/* Sacred Glyphs */}
      <section className="mb-16">
        <SacredGlyphGrid />
      </section>

      {/* Sacred Colors */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sacred Color System</h2>
        
        <div className="space-y-8">
          {/* Primary Sacred Colors */}
          <div>
            <h3 className="text-xl font-medium mb-4">Primary Sacred Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="h-24 rounded-lg" style={{ backgroundColor: sacredColors.primary.saffron.DEFAULT }}></div>
                <p className="font-medium">Saffron Orange</p>
                <p className="text-sm text-gray-500">{sacredColors.primary.saffron.DEFAULT}</p>
                <div className="flex space-x-1">
                  {[50, 200, 400, 600, 800].map((shade) => (
                    <div 
                      key={shade}
                      className="w-8 h-8 rounded" 
                      style={{ backgroundColor: sacredColors.primary.saffron[shade as keyof typeof sacredColors.primary.saffron] }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-24 rounded-lg" style={{ backgroundColor: sacredColors.primary.teal.DEFAULT }}></div>
                <p className="font-medium">Sacred Teal</p>
                <p className="text-sm text-gray-500">{sacredColors.primary.teal.DEFAULT}</p>
                <div className="flex space-x-1">
                  {[50, 200, 400, 600, 800].map((shade) => (
                    <div 
                      key={shade}
                      className="w-8 h-8 rounded" 
                      style={{ backgroundColor: sacredColors.primary.teal[shade as keyof typeof sacredColors.primary.teal] }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-24 rounded-lg" style={{ backgroundColor: sacredColors.primary.yellow.DEFAULT }}></div>
                <p className="font-medium">Sunshine Yellow</p>
                <p className="text-sm text-gray-500">{sacredColors.primary.yellow.DEFAULT}</p>
                <div className="flex space-x-1">
                  {[50, 200, 400, 600, 800].map((shade) => (
                    <div 
                      key={shade}
                      className="w-8 h-8 rounded" 
                      style={{ backgroundColor: sacredColors.primary.yellow[shade as keyof typeof sacredColors.primary.yellow] }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="h-24 rounded-lg" style={{ backgroundColor: sacredColors.primary.green.DEFAULT }}></div>
                <p className="font-medium">Kelly Green</p>
                <p className="text-sm text-gray-500">{sacredColors.primary.green.DEFAULT}</p>
                <div className="flex space-x-1">
                  {[50, 200, 400, 600, 800].map((shade) => (
                    <div 
                      key={shade}
                      className="w-8 h-8 rounded" 
                      style={{ backgroundColor: sacredColors.primary.green[shade as keyof typeof sacredColors.primary.green] }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Earth Elements */}
          <div>
            <h3 className="text-xl font-medium mb-4">Earth Elements</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Object.entries(sacredColors.earth).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: value.DEFAULT }}></div>
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className="text-sm text-gray-500">{value.DEFAULT}</p>
                  <div className="flex space-x-1">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: value.light }}/>
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: value.DEFAULT }}/>
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: value.dark }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Neutrals */}
          <div>
            <h3 className="text-xl font-medium mb-4">Neutrals</h3>
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(sacredColors.neutral).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: value }}></div>
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className="text-sm text-gray-500">{value}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradients */}
          <div>
            <h3 className="text-xl font-medium mb-4">Sacred Gradients</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(sacredColors.gradients).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="h-20 rounded-lg" style={{ background: value }}></div>
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sacred Typography</h2>
        
        <div className="space-y-12">
          <div className="p-6 border rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Heading Font - Mukta Vaani</p>
            <h1 className="text-5xl font-semibold" style={{ fontFamily: "'Mukta Vaani', sans-serif" }}>
              पवित्र परंपरा
            </h1>
            <h2 className="text-3xl font-semibold mt-2" style={{ fontFamily: "'Mukta Vaani', sans-serif" }}>
              Sacred Heritage
            </h2>
          </div>
          
          <div className="p-6 border rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Subheading - Montserrat</p>
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Connecting Generations Through Stories
            </h3>
            <h4 className="text-xl font-medium mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Preserving Family Wisdom for Future Generations
            </h4>
          </div>
          
          <div className="p-6 border rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Body Text - Inter</p>
            <p className="text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              The Vaya + Hanuman Edition creates a sacred space for families to connect across generations. 
              Through these symbols, we honor the wisdom of our ancestors while creating new memories for 
              future generations. Each glyph represents fundamental values that sustain family bonds.
            </p>
            <p className="text-base mt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Minimum 16px font size ensures readability for all ages, respecting both traditional wisdom 
              and modern accessibility standards.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Story Text - Georgia</p>
            <p className="text-lg" style={{ fontFamily: "'Georgia', serif" }}>
              "When my grandfather told stories of his childhood in Gujarat, his eyes would light up with memories 
              of mango trees and festival celebrations. These stories formed the foundation of our family identity, 
              connecting us to roots that run deeper than we could see."
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Bilingual Text Example</p>
            <div className="space-y-2">
              <p className="text-base" style={{ fontFamily: "'Mukta Vaani', sans-serif" }}>
                परिवार की कहानियां हमारी विरासत हैं।
              </p>
              <p className="text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Family stories are our heritage.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
