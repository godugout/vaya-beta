
import { motion } from "framer-motion";

interface CosmicParticlesProps {
  color?: string;
  count?: number;
  size?: number;
  duration?: number;
  opacity?: [number, number, number];
}

const CosmicParticles = ({
  color = "white",
  count = 20,
  size = 2,
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
            background: color,
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
