
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeWelcomeSection } from '@/components/home/HomeWelcomeSection';
import StoriesHeroSection from '@/components/stories/StoriesHeroSection';
import { ContentShowcase } from '@/components/showcase/ContentShowcase';
import { DualPaneRecordingSection } from '@/components/stories/DualPaneRecordingSection';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animation/FadeIn';

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HomeWelcomeSection />
      
      {/* Stories Section */}
      <FadeIn>
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
          <div className="container mx-auto px-4">
            <StoriesHeroSection />
          </div>
        </section>
      </FadeIn>
      
      {/* Record Stories Section */}
      <section className="bg-gray-50 dark:bg-gray-800 relative">
        <motion.div 
          className="absolute inset-0 bg-dots opacity-[0.15] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        />
        <DualPaneRecordingSection />
      </section>
      
      {/* Content Showcase */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ContentShowcase />
        </div>
      </section>
      
      {/* App Features Grid */}
      <section className="bg-gradient-to-t from-autumn/5 to-transparent dark:from-leaf/5 dark:to-transparent py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Family Capsules",
                description: "Create digital time capsules filled with memories to be opened at special moments.",
                icon: "🎁"
              },
              {
                title: "Story Recording",
                description: "Capture your family's oral history with high-quality voice recordings.",
                icon: "🎙️"
              },
              {
                title: "Memory Lane",
                description: "A beautiful timeline of your family's most precious moments and stories.",
                icon: "📸"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
