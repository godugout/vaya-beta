
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Link, Download, Calendar, Star } from "lucide-react";

const HanumanResourcesSidebar: React.FC = () => {
  const resources = [
    {
      title: "Family Heritage Guide",
      description: "Tips for exploring your ancestral roots",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      title: "Cultural Traditions",
      description: "Common practices across generations",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Recording Guide",
      description: "How to capture meaningful stories",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Heritage Resources",
      description: "External resources for genealogy research",
      icon: <Link className="h-4 w-4" />,
    },
    {
      title: "Story Template",
      description: "Structure for sharing family memories",
      icon: <Download className="h-4 w-4" />,
    },
  ];

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] p-6 h-full overflow-hidden border-none relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-hanuman-primary/10 blur-2xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-hanuman-gold/5 blur-2xl rounded-full"></div>
      
      <h2 className="text-xl font-heading text-hanuman-gold mb-4 flex items-center">
        <Star className="h-5 w-5 mr-2 text-hanuman-gold" />
        Resources
      </h2>
      
      <div className="space-y-3 relative">
        {resources.map((resource, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button className="w-full p-4 rounded-xl transition-all duration-300 bg-black/20 hover:bg-black/30 border border-white/5 text-left">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-hanuman-primary/30 to-hanuman-saffron/30 text-hanuman-gold">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white/90">{resource.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{resource.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-hanuman-cosmic-blue/30 to-hanuman-cosmic-purple/30 border border-hanuman-gold/10">
        <h3 className="text-sm font-medium text-hanuman-gold mb-2">Family Archives</h3>
        <p className="text-xs text-white/70">
          Your collected stories and memories will be preserved here for generations to come
        </p>
      </div>
    </div>
  );
};

export default HanumanResourcesSidebar;
