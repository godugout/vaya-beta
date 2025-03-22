
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeWelcomeSection } from '@/components/home/HomeWelcomeSection';
import StoriesHeroSection from '@/components/stories/StoriesHeroSection';
import { ContentShowcase } from '@/components/showcase/ContentShowcase';
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
      
      {/* Record Stories Section - Replacing DualPaneRecordingSection */}
      <section className="bg-gray-50 dark:bg-gray-800 relative py-16">
        <motion.div 
          className="absolute inset-0 bg-dots opacity-[0.15] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-hanuman-orange">Record Your Stories</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Use our simple voice recording tools to preserve your family memories for generations to come.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Voice recording features available after login
                </p>
              </div>
            </div>
          </div>
        </div>
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
