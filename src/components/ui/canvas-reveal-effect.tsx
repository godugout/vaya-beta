"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  containerClassName,
  colors = [[255, 255, 255]],
  dotSize = 1,
  animationSpeed = 3,
  opacities = [0.3, 0.3, 0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.5, 1],
}: {
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
  animationSpeed?: number;
  opacities?: number[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: number[];
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * dotSize + dotSize/2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = opacities[Math.floor(Math.random() * opacities.length)];
      }

      update() {
        if (!canvas) return;
        
        this.x += this.speedX * animationSpeed;
        this.y += this.speedY * animationSpeed;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        const dx = mousePosRef.current.x - this.x;
        const dy = mousePosRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.speedX -= dx * force * 0.02;
          this.speedY -= dy * force * 0.02;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    initParticles();
    animate();
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors, dotSize, animationSpeed, opacities]);

  return (
    <div ref={containerRef} className={cn("h-full w-full relative", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};