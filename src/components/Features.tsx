import { motion } from "framer-motion";
import { ArrowRight, Camera, Heart, Hourglass } from "lucide-react";

const Features = () => {
  return (
    <section 
      className="relative py-24"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1522543558187-768b6df7c25c")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0" 
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Preserve Your Legacy
          </h2>
          <p className="mt-4 text-lg text-gray-100 sm:text-xl">
            Create meaningful connections across generations through shared stories and memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-vaya-stories/20 text-vaya-stories mb-4">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Capture Memories</h3>
            <p className="text-gray-100 mb-4">Record stories, share photos, and preserve precious moments with your loved ones.</p>
            <ArrowRight className="text-vaya-stories h-5 w-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-vaya-memories/20 text-vaya-memories mb-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Share Stories</h3>
            <p className="text-gray-100 mb-4">Create lasting connections by sharing your family's unique stories and traditions.</p>
            <ArrowRight className="text-vaya-memories h-5 w-5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-vaya-capsules/20 text-vaya-capsules mb-4">
              <Hourglass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Time Capsules</h3>
            <p className="text-gray-100 mb-4">Create digital time capsules to preserve memories for future generations.</p>
            <ArrowRight className="text-vaya-capsules h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;