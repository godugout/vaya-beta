
import { FadeIn } from "@/components/animation/FadeIn";
import { Clock, Heart, BookOpen, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Share Stories",
    description: "Record and preserve your family's most precious memories and traditions."
  },
  {
    icon: Heart,
    title: "Connect Generations",
    description: "Bridge the gap between past and present, ensuring your legacy lives on."
  },
  {
    icon: Clock,
    title: "Time Capsules",
    description: "Create digital time capsules filled with photos, stories, and cherished moments."
  },
  {
    icon: Users,
    title: "Family Together",
    description: "Collaborate with family members to build a rich tapestry of shared experiences."
  }
];

export const ValueProposition = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Preserve What Matters Most
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            More than just memories - we help you create a lasting legacy for your family.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="w-12 h-12 text-autumn mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
