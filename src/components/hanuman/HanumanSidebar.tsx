
import React from "react";
import { HanumanSidebarCategory } from "@/types/hanuman";
import SidebarCard from "@/components/hanuman/SidebarCard";
import { motion } from "framer-motion";
import { Flame, Leaf, Star, Heart, BookOpen, Calendar } from "lucide-react";

interface HanumanSidebarProps {
  categories: HanumanSidebarCategory[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const HanumanSidebar: React.FC<HanumanSidebarProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "family":
        return <Heart className="h-4 w-4" />;
      case "traditions":
        return <Flame className="h-4 w-4" />;
      case "stories":
        return <BookOpen className="h-4 w-4" />;
      case "wisdom":
        return <Leaf className="h-4 w-4" />;
      case "celebrations":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-green-900/15 rounded-3xl shadow-[0_0_40px_rgba(255,126,0,0.15)] p-5 h-full overflow-hidden border-none relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-hanuman-primary/10 blur-2xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-hanuman-gold/5 blur-2xl rounded-full"></div>
      
      <h2 className="text-lg font-heading text-hanuman-gold mb-3 flex items-center">
        <Star className="h-4 w-4 mr-2 text-hanuman-gold" />
        Categories
      </h2>
      
      <div className="space-y-2.5 relative">
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                activeCategory === category.id
                ? "bg-gradient-to-r from-hanuman-primary/20 to-hanuman-saffron/20 border border-hanuman-gold/20 shadow-[0_4px_15px_rgba(255,126,0,0.15)]"
                : "bg-black/20 hover:bg-black/30 border border-white/5"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg ${
                  activeCategory === category.id
                  ? "bg-gradient-to-br from-hanuman-primary to-hanuman-saffron text-white"
                  : "bg-black/30 text-hanuman-gold/70"
                }`}>
                  {getCategoryIcon(category.id)}
                </div>
                <div>
                  <h3 className={`font-medium text-sm ${
                    activeCategory === category.id ? "text-hanuman-gold" : "text-white/90"
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">{category.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 p-3 rounded-xl bg-black/30 border border-hanuman-orange/10">
        <h3 className="text-xs font-medium text-hanuman-gold mb-1 flex items-center">
          <Star className="h-3 w-3 mr-1 text-hanuman-gold" />
          Hanuman Edition
        </h3>
        <p className="text-xs text-white/70">
          Sacred family storytelling guided by spiritual wisdom and cultural heritage
        </p>
      </div>
    </div>
  );
};

export default HanumanSidebar;
