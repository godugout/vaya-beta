import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}) => {
  const isMobile = useIsMobile();
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  if (isMobile) {
    return (
      <div className="min-h-screen py-8 px-4">
        <Header />
        <div className="grid grid-cols-1 gap-4 mt-8">
          {products.map((product) => (
            <MobileProductCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="hidden lg:flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="hidden lg:flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-8 md:py-20 lg:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white font-outfit">
        Family Capsules <br /> Your Digital Time Machine
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-300 font-inter">
        Create and explore digital time capsules filled with your family's most precious memories.
        Each capsule is a unique collection of stories, photos, and moments waiting to be discovered.
      </p>
    </div>
  );
};

const MobileProductCard = ({
  product,
}: {
  product: {
    title: string;
    link: string;
    icon: LucideIcon;
  };
}) => {
  const Icon = product.icon;
  
  return (
    <Link
      to={product.link}
      className="block bg-vaya-purple-light/20 rounded-lg p-6 transition-all duration-300 hover:bg-vaya-purple-light/30"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-vaya-purple-light rounded-lg">
          <Icon size={24} className="text-vaya-purple" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white font-outfit">{product.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    icon: LucideIcon;
  };
  translate: MotionValue<number>;
}) => {
  const Icon = product.icon;
  
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        to={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-vaya-purple-light rounded-lg">
          <Icon size={120} className="text-vaya-purple" />
        </div>
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-outfit">
        {product.title}
      </h2>
    </motion.div>
  );
};