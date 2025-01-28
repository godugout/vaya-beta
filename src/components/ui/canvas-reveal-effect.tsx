"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: [number, number, number];
  opacity: number;
}

interface CanvasRevealEffectProps {
  containerClassName?: string;
  colors?: Array<[number, number, number]>;
  dotSize?: number;
  animationSpeed?: number;
  opacities?: number[];
}

export const CanvasRevealEffect = ({
  containerClassName = "",
  colors = [[255, 255, 255]],
  dotSize = 3,
  animationSpeed = 4,
  opacities = [0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1],
}: CanvasRevealEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createParticles = () => {
      particles.current = [];
      const nParticles = 100;
      for (let i = 0; i < nParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * animationSpeed,
          vy: (Math.random() - 0.5) * animationSpeed,
          size: dotSize,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: opacities[Math.floor(Math.random() * opacities.length)],
        });
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          particle.vx -= dx * force * 0.02;
          particle.vy -= dy * force * 0.02;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const [r, g, b] = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;
        ctx.fill();
      });

      raf.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [colors, dotSize, animationSpeed, opacities]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full absolute inset-0 ${containerClassName}`}
    />
  );
};