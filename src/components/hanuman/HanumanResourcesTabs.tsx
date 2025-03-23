
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Book, Bookmark, Leaf, History, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const HanumanResourcesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("sacred-texts");

  const resources = {
    "sacred-texts": [
      { title: "Ramayana", description: "The epic story of Lord Rama", link: "#ramayana" },
      { title: "Sundara Kanda", description: "The beautiful chapter of the Ramayana", link: "#sundara" },
      { title: "Hanuman Chalisa", description: "Forty verses in praise of Lord Hanuman", link: "#chalisa" }
    ],
    "wisdom": [
      { title: "Devotional Wisdom", description: "Lessons from Hanuman's devotion", link: "#devotion" },
      { title: "Courage and Strength", description: "Teachings on inner and outer strength", link: "#strength" },
      { title: "Service and Selflessness", description: "The path of selfless service", link: "#service" }
    ],
    "history": [
      { title: "Historical Context", description: "The historical background of the Ramayana", link: "#history" },
      { title: "Cultural Impact", description: "Hanuman's influence across cultures", link: "#cultural" },
      { title: "Ancient Temples", description: "Sacred sites dedicated to Hanuman", link: "#temples" }
    ],
    "meditation": [
      { title: "Hanuman Meditation", description: "Practices to connect with Hanuman's energy", link: "#meditation" },
      { title: "Mantras and Chants", description: "Sacred sounds for spiritual practice", link: "#mantras" },
      { title: "Visualization Techniques", description: "Methods to visualize divine presence", link: "#visualization" }
    ]
  };

  type ResourceCategory = keyof typeof resources;

  const getIcon = (category: ResourceCategory) => {
    switch(category) {
      case "sacred-texts": return <Book className="h-5 w-5" />;
      case "wisdom": return <Leaf className="h-5 w-5" />;
      case "history": return <History className="h-5 w-5" />;
      case "meditation": return <Flame className="h-5 w-5" />;
      default: return <Bookmark className="h-5 w-5" />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <Card className="hanuman-content-bg border-hanuman-orange/10 overflow-hidden">
      <CardHeader className="pb-2 border-b border-hanuman-gold/10 bg-gradient-to-r from-black/40 via-hanuman-orange/10 to-black/40">
        <CardTitle className="text-hanuman-gold text-xl flex items-center">
          <Flame className="h-5 w-5 mr-2 text-hanuman-orange" />
          Sacred Resources
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-black/30 border border-hanuman-orange/10 p-1 mb-4">
            {Object.keys(resources).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-hanuman-primary/20 data-[state=active]:to-hanuman-saffron/20 data-[state=active]:border-hanuman-gold/20 data-[state=active]:text-hanuman-gold"
              >
                {getIcon(category as ResourceCategory)}
                <span className="ml-2 capitalize">{category.replace("-", " ")}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(resources).map(([category, items]) => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    initial="hidden"
                    animate={activeTab === category ? "visible" : "hidden"}
                    variants={cardVariants}
                  >
                    <Card className="hanuman-glow-card h-full">
                      <CardContent className="p-4">
                        <h3 className="text-hanuman-gold flex items-center text-lg font-medium mb-2">
                          {getIcon(category as ResourceCategory)}
                          <span className="ml-2">{item.title}</span>
                        </h3>
                        <p className="text-white/80 text-sm mb-3">{item.description}</p>
                        <a 
                          href={item.link} 
                          className="hanuman-fancy-link flex items-center text-sm text-hanuman-orange"
                        >
                          <span>Explore</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
