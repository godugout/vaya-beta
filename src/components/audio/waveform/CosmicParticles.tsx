
import { motion } from "framer-motion";

interface CosmicParticlesProps {
  colors?: string[];
  count?: number;
  size?: number;
  duration?: number;
  opacity?: [number, number, number];
}

const CosmicParticles = ({
  colors = ["#FF7675", "#6C5CE7", "#FFFFFF"],
  count = 30,
  size = 2.5,
  duration = 3,
  opacity = [0.1, 0.7, 0.1]
}: CosmicParticlesProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * size + 1 + 'px',
            height: Math.random() * size + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: colors[Math.floor(Math.random() * colors.length)],
          }}
          animate={{
            opacity: opacity,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * duration + (duration / 2),
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
};

export default CosmicParticles;
