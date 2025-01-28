import { motion } from "framer-motion";

const testimonials = [
  {
    title: "Grandmother's Stories",
    quote: "I created a capsule to share my life stories with my grandchildren. Now they'll always have my voice, my memories, and my wisdom to guide them.",
    author: "Margaret, 78",
    icon: "👵"
  },
  {
    title: "Teacher's Legacy",
    quote: "Each year I create a capsule for my class. When they graduate, I share it back - a beautiful time capsule of their journey.",
    author: "Sarah, High School Teacher",
    icon: "👩‍🏫"
  },
  {
    title: "Family Celebrations",
    quote: "We capture every family reunion, holiday, and milestone. It's amazing to look back and see how our family has grown.",
    author: "The Rodriguez Family",
    icon: "👨‍👩‍👧‍👦"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-[#1A1F2C] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stories That Matter
          </h2>
          <p className="mt-4 text-lg text-gray-300 sm:text-xl">
            Discover how people are using Vaya to preserve their most precious memories
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#2A2A2A] p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">{testimonial.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{testimonial.title}</h3>
              <p className="text-base text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-[#8B5CF6]">- {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;