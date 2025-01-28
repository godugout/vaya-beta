import { useState } from "react";
import { HomeHero } from "@/components/hero/HomeHero";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import Auth from "./Auth";

export default function Index() {
  const [showAuth, setShowAuth] = useState(true);

  return (
    <div className="relative">
      <HomeHero />
      <Features />
      <Testimonials />
      <FAQ />
      <Auth open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
}