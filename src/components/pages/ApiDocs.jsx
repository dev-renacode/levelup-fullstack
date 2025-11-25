import { useEffect } from "react";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const ApiDocs = () => {
  useEffect(() => {
    // Cargar el contenido del HTML en un iframe o redirigir
    // Por ahora, redirigimos directamente al archivo HTML
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-[Roboto]">
      <GameBackgroundEffects />
      <div className="relative z-10 flex">
        <div className="flex-1 bg-black/80 backdrop-blur-sm p-8 overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-[Orbitron] text-white mb-2">
                Documentación API
              </h1>
              <p className="text-gray-300">
                Documentación interactiva de la API usando Swagger/OpenAPI
              </p>
            </div>
            <div className="bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-xl p-6">
              <iframe
                src="/docs/api-launcher.html"
                className="w-full h-[800px] border-0 rounded-lg"
                title="API Documentation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;

