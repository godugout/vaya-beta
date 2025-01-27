import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-fadeIn">
            Preserve Your Family's Legacy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Capture and share your precious memories with loved ones. Let Vaya help you create a lasting legacy for generations to come.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <Button className="bg-vaya-orange hover:bg-orange-600">
              Start Recording
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-vaya-orange to-vaya-peach opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default Hero;