
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  relationship: string;
  image: string;
  delay: number;
}

const Testimonial = ({ quote, name, relationship, image, delay }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <Quote className="h-8 w-8 text-vaya-accent-yellow mb-4" />
      <p className="text-lg font-story text-vaya-text-secondary mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-heading font-semibold text-vaya-text-primary">{name}</p>
          <p className="text-sm text-vaya-text-secondary">{relationship}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Vaya helped me record my grandmother's stories about immigrating to America. These recordings are now priceless to our family.",
      name: "Maria Rodriguez",
      relationship: "Preserving grandmother's legacy",
      image: "/lovable-uploads/family-gathering.jpg",
      delay: 0.1,
    },
    {
      quote: "We used Vaya at our wedding and captured stories from relatives we rarely see. It was magical to hear their memories.",
      name: "David Chen",
      relationship: "Wedding memories collection",
      image: "/lovable-uploads/family-dinner.jpg",
      delay: 0.2,
    },
    {
      quote: "The AI assistant asked questions I never thought to ask my parents. Now I have stories about their childhood I never knew before.",
      name: "James Williams",
      relationship: "Discovering family history",
      image: "/lovable-uploads/family-picnic.jpg",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 bg-[#F8F5FF]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-vaya-text-primary mb-4">
            Stories From Our Community
          </h2>
          <p className="text-lg text-vaya-text-secondary max-w-2xl mx-auto">
            See how families are using Vaya to capture and preserve their most meaningful memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              relationship={testimonial.relationship}
              image={testimonial.image}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
