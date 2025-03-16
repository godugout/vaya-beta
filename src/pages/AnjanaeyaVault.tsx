
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Key, Lock, Rocket, Star, Archive, FileText } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AnjanaeyaVault } from '@/components/wedding-mode/vault/AnjanaeyaVault';

export default function AnjanaeyaVaultPage() {
  const [showFullVault, setShowFullVault] = useState(false);
  
  const handleEnterVault = () => {
    setShowFullVault(true);
  };
  
  return (
    <>
      <Helmet>
        <title>Anjanaeya Vault | Vaya</title>
      </Helmet>
      
      {showFullVault ? (
        <AnjanaeyaVault />
      ) : (
        <MainLayout>
          <div className="min-h-screen bg-gradient-to-b from-space-black to-space-darkBlue text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center">
              {/* Space background with stars */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/lovable-uploads/dbfde90d-4253-4295-b1e9-e9bb049cd9cd.png')] bg-cover bg-center opacity-20"></div>
                
                {/* Animated stars */}
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-space-lightBlue to-space-purple">
                    Anjanaeya Vault
                  </h1>
                  <p className="text-xl md:text-2xl text-space-text-secondary max-w-3xl mx-auto mb-8">
                    Sacred knowledge and family memories, preserved for generations
                  </p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <Button 
                      onClick={handleEnterVault}
                      className="bg-space-blue hover:bg-space-blue/90 text-white px-8 py-6 rounded-md text-lg flex items-center gap-2"
                    >
                      <Key className="h-5 w-5" />
                      <span>Enter Sacred Vault</span>
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Floating vault seal */}
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="relative inline-block"
                  >
                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-space-gold bg-space-darkBlue/60 backdrop-blur-lg flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-space-lightBlue/30"></div>
                      <div className="absolute inset-2 rounded-full border border-space-lightBlue/20"></div>
                      
                      <div className="relative z-10 text-space-gold">
                        <Lock className="w-16 h-16 md:w-24 md:h-24 mb-2" />
                        <div className="text-xs md:text-sm font-mono tracking-wider">CLASSIFIED</div>
                      </div>
                    </div>
                    
                    {/* Light beam effect */}
                    <motion.div
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-[70vh] bg-gradient-to-b from-space-gold/60 to-transparent"
                      style={{ transformOrigin: 'top' }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </section>
            
            {/* Features Section */}
            <section className="py-20 relative">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-16 text-space-text-primary">
                  <span className="text-space-gold">Sacred</span> Features
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Secure Family Vault",
                      description: "Multi-layered security system to protect your family's most precious artifacts and memories.",
                      icon: <Shield className="h-10 w-10 text-space-blue" />
                    },
                    {
                      title: "Sacred Knowledge",
                      description: "Preserve traditional knowledge, rituals and cultural wisdom for future generations.",
                      icon: <FileText className="h-10 w-10 text-space-purple" />
                    },
                    {
                      title: "Time Capsules",
                      description: "Create time-locked digital capsules to be opened at special family occasions.",
                      icon: <Archive className="h-10 w-10 text-space-orange" />
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-space-surface p-8 rounded-lg border border-space-border backdrop-blur-sm"
                    >
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-space-text-primary">
                        {feature.title}
                      </h3>
                      <p className="text-space-text-secondary">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Background elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-space-indigo/20 to-transparent"></div>
            </section>
            
            {/* Explore Section */}
            <section className="py-20 bg-space-darkBlue relative">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-space-text-primary">
                  Explore <span className="text-space-lightBlue">Vaya</span> Features
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      title: "Family Capsules",
                      path: "/family-capsules",
                      icon: <Archive className="h-6 w-6" />,
                      color: "bg-space-orange/20 text-space-orange"
                    },
                    {
                      title: "Memory Lane",
                      path: "/memory-lane",
                      icon: <Star className="h-6 w-6" />,
                      color: "bg-space-gold/20 text-space-gold"
                    },
                    {
                      title: "Share Stories",
                      path: "/share-stories",
                      icon: <FileText className="h-6 w-6" />,
                      color: "bg-space-lightBlue/20 text-space-lightBlue"
                    },
                    {
                      title: "Media Library",
                      path: "/media-library",
                      icon: <Archive className="h-6 w-6" />,
                      color: "bg-space-purple/20 text-space-purple"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Link
                        to={item.path}
                        className="block p-6 rounded-lg bg-space-surface border border-space-border hover:border-space-lightBlue/50 transition-all duration-300"
                      >
                        <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4`}>
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-medium text-space-text-primary">
                          {item.title}
                        </h3>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <Button 
                    asChild
                    className="bg-space-blue hover:bg-space-blue/90 text-white px-6 py-2"
                  >
                    <Link to="/">
                      <Rocket className="h-4 w-4 mr-2" />
                      Return to Mission Control
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </MainLayout>
      )}
    </>
  );
}
