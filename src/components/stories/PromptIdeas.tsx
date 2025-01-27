import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Quote, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const promptCards = [
  {
    icon: <MessageSquare className="h-8 w-8 text-vaya-primary" />,
    title: "Family Traditions",
    description: "Share the special traditions that make your family unique. From holiday celebrations to weekly rituals, these stories connect generations.",
  },
  {
    icon: <Quote className="h-8 w-8 text-vaya-secondary" />,
    title: "Life Lessons",
    description: "What wisdom would you share with future generations? Tell us about a moment that taught you something valuable.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-vaya-primary" />,
    title: "Childhood Memories",
    description: "Take us back to your favorite childhood memories. The games you played, the places you explored, the adventures you had.",
  }
];

const testimonials = [
  {
    quote: "Narra helped me preserve my grandmother's recipes and the stories behind them. Now my children will always have these precious memories.",
    author: "Maria S.",
    role: "Family Historian"
  },
  {
    quote: "I've recorded stories about our family's journey to Costa Rica. It's amazing to share our heritage with the next generation.",
    author: "Carlos R.",
    role: "Storyteller"
  },
  {
    quote: "Every week, I sit down with Narra to share a new memory. It's become a beautiful way to reflect on life's special moments.",
    author: "Ana M.",
    role: "Memory Keeper"
  }
];

export const PromptIdeas = () => {
  return (
    <section className="bg-vaya-chat-bg py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-vaya-gray-800 mb-4">
            Story Inspiration
          </h2>
          <p className="text-vaya-gray-600 max-w-2xl mx-auto">
            Not sure where to start? Here are some prompts to help you share your stories and create lasting memories with your loved ones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {promptCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{card.icon}</div>
                  <CardTitle className="text-xl text-vaya-gray-800">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-vaya-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-vaya-gray-800 mb-4">
            Stories from Our Community
          </h2>
          <p className="text-vaya-gray-600 max-w-2xl mx-auto">
            See how others are using Narra to preserve their precious memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-vaya-primary mb-4" />
                  <p className="text-vaya-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-vaya-gray-800">
                      {testimonial.author}
                    </p>
                    <p className="text-vaya-gray-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};