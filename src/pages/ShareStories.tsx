import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import NarraChat from "@/components/NarraChat";
import { useIsMobile } from "@/hooks/use-mobile";

const ShareStories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {isMobile ? (
            <NarraChat />
          ) : (
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 bg-white rounded-lg shadow">
                <NarraChat />
              </div>
              <div className="col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Sugerencias para Compartir</h2>
                  <ul className="space-y-3 text-sm">
                    <li>• Comparte una memoria de tu niñez</li>
                    <li>• Cuenta sobre una tradición familiar</li>
                    <li>• Describe un momento especial con tus abuelos</li>
                    <li>• Narra una historia de tu cultura</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Tus Historias Recientes</h2>
                  <p className="text-gray-600 text-sm">
                    Tus historias aparecerán aquí para fácil acceso
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareStories;