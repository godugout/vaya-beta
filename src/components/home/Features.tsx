
import { motion } from "framer-motion";
import { Mic, Users, Clock, Sparkles, BookOpen, Shield } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const Feature = ({ icon, title, description, color, delay }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className={`p-3 rounded-full mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold text-vaya-text-primary mb-2">
        {title}
      </h3>
      <p className="text-vaya-text-secondary">
        {description}
      </p>
    </motion.div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <Mic className="h-6 w-6 text-white" />,
      title: "Voice-First Story Capture",
      description: "Record family stories with ease using our intuitive voice recording interface.",
      color: "bg-vaya-stories",
      delay: 0.1,
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Family Tree Integration",
      description: "Organize stories within an interactive family tree that grows with your connections.",
      color: "bg-vaya-home",
      delay: 0.2,
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Memory Capsules",
      description: "Create multimedia time capsules to preserve your most meaningful family moments.",
      color: "bg-vaya-accent-turquoise",
      delay: 0.3,
    },
    {
      icon: <Sparkles className="h-6 w-6 text-white" />,
      title: "AI Story Assistant",
      description: "Narra, our AI companion, helps you capture deeper and more meaningful stories.",
      color: "bg-vaya-accent-yellow",
      delay: 0.4,
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Wedding Event Mode",
      description: "Capture multiple generations of stories at once during special family gatherings.",
      color: "bg-vaya-accent-coral",
      delay: 0.5,
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Secret Family Vault",
      description: "Securely store special family stories with enhanced privacy controls.",
      color: "bg-gray-800",
      delay: 0.6,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-vaya-text-primary mb-4">
            How Vaya Preserves Your Family Legacy
          </h2>
          <p className="text-lg text-vaya-text-secondary max-w-2xl mx-auto">
            Our platform combines voice recording, AI assistance, and thoughtful organization to keep your family stories alive for generations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
