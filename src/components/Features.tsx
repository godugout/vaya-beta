import { Camera, Users, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { CulturalContent } from "@/types/cultural";

interface FeaturesProps {
  culturalContent?: CulturalContent[];
}

const defaultFeatures = [
  {
    name: "Create Memory Capsules",
    description: "Build digital time capsules filled with photos, stories, and precious moments for future generations.",
    icon: Camera,
    bgColor: "bg-black/20",
    iconColor: "text-[#F97316]",
    feature_key: "create_capsules"
  },
  {
    name: "Family Collaboration",
    description: "Invite family members to contribute their own memories and stories to your shared collection.",
    icon: Users,
    bgColor: "bg-black/20",
    iconColor: "text-[#0EA5E9]",
    feature_key: "family_collab"
  },
  {
    name: "Memory Timeline",
    description: "Organize and view your memories chronologically in a beautiful, interactive timeline.",
    icon: Clock,
    bgColor: "bg-black/20",
    iconColor: "text-[#22C55E]",
    feature_key: "timeline"
  },
  {
    name: "Legacy Preservation",
    description: "Ensure your family's stories and traditions are preserved and passed down through generations.",
    icon: Heart,
    bgColor: "bg-black/20",
    iconColor: "text-[#D946EF]",
    feature_key: "legacy"
  }
];

const Features = ({ culturalContent }: FeaturesProps) => {
  const features = defaultFeatures.map(feature => {
    const culturalFeature = culturalContent?.find(
      content => content.feature_key === feature.feature_key
    );
    
    return {
      ...feature,
      name: culturalFeature?.title || feature.name,
      description: culturalFeature?.description || feature.description
    };
  });

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl whitespace-nowrap sm:whitespace-normal">
            <span className="inline-block">Everything you need</span>{" "}
            <span className="inline-block">to preserve your legacy</span>
          </h2>
          <p className="mt-4 text-lg text-white/90 sm:text-xl">
            Capture, organize, and share your family's most precious memories with tools designed for meaningful connection.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <dt className="text-xl font-semibold leading-7 text-white">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${feature.bgColor} shadow-lg mx-auto backdrop-blur-xl hover:backdrop-blur-2xl transition-all duration-300 border border-white/10 bg-gradient-to-br from-white/10 to-black/20`}>
                    <feature.icon 
                      className={`h-8 w-8 ${feature.iconColor} drop-shadow-lg`} 
                      strokeWidth={2.5}
                      aria-hidden="true" 
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-white/80">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;