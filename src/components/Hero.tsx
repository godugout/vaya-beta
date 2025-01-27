import { ArrowRight, Mic, Image, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const heroConfigs = {
  "/": {
    title: "Preserve Your Family's Legacy",
    subtitle: "Capture and share your precious memories with loved ones. Let Vaya help you create a lasting legacy for generations to come.",
    primaryCta: {
      text: "Start Recording",
      icon: <Mic className="ml-2 h-4 w-4" />,
    },
  },
  "/stories": {
    title: "Share Your Stories",
    subtitle: "Record and preserve the stories that make your family unique. Every voice adds to your family's legacy.",
    primaryCta: {
      text: "Record a Story",
      icon: <Mic className="ml-2 h-4 w-4" />,
    },
  },
  "/photos": {
    title: "Cherish Every Moment",
    subtitle: "Upload and organize your family photos. Each picture tells a story worth preserving.",
    primaryCta: {
      text: "Upload Photos",
      icon: <Image className="ml-2 h-4 w-4" />,
    },
  },
  "/families": {
    title: "Connect with Your Family",
    subtitle: "Create and manage your family groups. Share memories with those who matter most.",
    primaryCta: {
      text: "Manage Family",
      icon: <Users className="ml-2 h-4 w-4" />,
    },
  },
};

const Hero = () => {
  const location = useLocation();
  const config = heroConfigs[location.pathname as keyof typeof heroConfigs] || heroConfigs["/"];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-vaya-peach py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {config.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {config.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-vaya-orange hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
              {config.primaryCta.text}
              {config.primaryCta.icon}
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-vaya-orange to-vaya-peach opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-vaya-orange to-vaya-peach opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Hero;