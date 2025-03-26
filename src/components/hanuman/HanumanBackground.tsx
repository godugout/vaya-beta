
import React from "react";
import { motion } from "framer-motion";

const HanumanBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="w-full h-full overflow-hidden relative">
        <img 
          src="/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png" 
          alt="Hanuman background" 
          className="w-full h-full object-cover opacity-30 md:object-cover md:object-top scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-hanuman-primary/20 via-hanuman-cosmic-blue/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-hanuman-saffron/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-hanuman-saffron/30 to-transparent"></div>
        <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-hanuman-saffron/30 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-hanuman-saffron/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-hanuman-cosmic-purple/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-hanuman-saffron/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-hanuman-saffron/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-hanuman-cosmic-blue/30 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default HanumanBackground;
