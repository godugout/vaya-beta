import { Camera, Users, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Create Memory Capsules",
    description: "Build digital time capsules filled with photos, stories, and precious moments for future generations.",
    icon: Camera,
    bgColor: "bg-gray-50",
    iconColor: "text-vaya-stories",
  },
  {
    name: "Family Collaboration",
    description: "Invite family members to contribute their own memories and stories to your shared collection.",
    icon: Users,
    bgColor: "bg-gray-50",
    iconColor: "text-vaya-memories",
  },
  {
    name: "Memory Timeline",
    description: "Organize and view your memories chronologically in a beautiful, interactive timeline.",
    icon: Clock,
    bgColor: "bg-gray-50",
    iconColor: "text-vaya-capsules",
  },
  {
    name: "Legacy Preservation",
    description: "Ensure your family's stories and traditions are preserved and passed down through generations.",
    icon: Heart,
    bgColor: "bg-gray-50",
    iconColor: "text-vaya-stories",
  },
];

const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to preserve your legacy
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">
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
                className="flex flex-col"
              >
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${feature.bgColor} shadow-sm`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
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