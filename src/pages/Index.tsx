import { useState } from "react";
import HomeHero from "@/components/hero/HomeHero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Auth from "./Auth";

export default function Index() {
  const [showAuth, setShowAuth] = useState(true);

  return (
    <div className="relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522543558187-768b6df7c25c")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="relative z-10">
        <HomeHero isSpanish={false} />
        <Features />
        <Testimonials />
        <FAQ />
        <Auth open={showAuth} onOpenChange={setShowAuth} />
      </div>
    </div>
  );
}