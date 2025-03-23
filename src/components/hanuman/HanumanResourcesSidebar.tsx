
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Info, Link, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

const HanumanResourcesSidebar: React.FC = () => {
  const resources: ResourceItem[] = [
    {
      title: "Family Tree Guide",
      description: "Learn how to map your family relationships and discover your roots.",
      icon: <Users className="h-4 w-4 text-hanuman-gold" />,
      tag: "Guide"
    },
    {
      title: "Storytelling Tips",
      description: "Helpful prompts to bring out meaningful family stories.",
      icon: <BookOpen className="h-4 w-4 text-hanuman-gold" />,
      tag: "Tips"
    },
    {
      title: "Cultural Context",
      description: "Understand the historical and cultural background of your heritage.",
      icon: <Info className="h-4 w-4 text-hanuman-gold" />,
      tag: "Info"
    },
    {
      title: "Connect Recordings",
      description: "Learn how to link voice stories to your family tree.",
      icon: <Link className="h-4 w-4 text-hanuman-gold" />,
      tag: "Tutorial"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-hanuman-orange/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40 border-b border-hanuman-orange/20 p-4">
        <CardTitle className="text-hanuman-gold text-lg flex items-center">
          <span className="mr-2">✨</span> Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {resources.map((resource, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="hanuman-resource-card transition-all duration-300 hover:bg-hanuman-orange/15 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-hanuman-orange/10 border border-hanuman-orange/20">
                  {resource.icon}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-hanuman-gold text-sm">
                      {resource.title}
                    </h3>
                    {resource.tag && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-hanuman-orange/20 text-white/70">
                        {resource.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-hanuman-purple/20 to-hanuman-orange/20 border border-hanuman-purple/30">
          <h4 className="text-sm font-medium text-hanuman-gold mb-1">
            Create Family Memory Capsule
          </h4>
          <p className="text-xs text-white/70 mb-2">
            Preserve your stories for future generations in a secure digital time capsule.
          </p>
          <button className="text-xs py-1.5 px-3 rounded-md bg-hanuman-purple/80 hover:bg-hanuman-purple text-white w-full transition-colors">
            Start a Memory Capsule
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HanumanResourcesSidebar;
