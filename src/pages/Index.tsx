import Hero from "@/components/Hero";
import VoiceRecorder from "@/components/VoiceRecorder";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-vaya-green">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <VoiceRecorder />
      </div>
    </div>
  );
};

export default Index;