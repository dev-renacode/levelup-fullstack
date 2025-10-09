import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import WelcomeMessage from "../molecules/WelcomeMessage";

const Hero = () => {
  return (
    <main
      className="w-screen h-screen bg-black font-[Orbitron] relative overflow-hidden"
      id="inicio"
    >
      <WelcomeMessage />
      <GameBackgroundEffects />

      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-blue-400/10 to-green-400/10 rounded-full blur-2xl animate-bounce delay-1000"
        aria-hidden="true"
      ></div>

      <div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping delay-500"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1500"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping delay-2000"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center h-full px-4">
        <aside
          className="mb-8 animate-bounce"
          role="complementary"
          aria-label="Oferta especial"
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-2 rounded-full text-sm font-[Roboto] shadow-lg shadow-green-400/25">
            🎮 ¡OFERTA ESPECIAL! -20% EN TU PRIMERA COMPRA
          </div>
        </aside>

        <header className="text-center mb-6">
          <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-400 animate-pulse">
              ¡Bienvenido a
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 animate-pulse delay-500">
              Level-UP Gamers!
            </span>
          </h1>
        </header>

        <p className="text-white/90 text-lg md:text-xl font-semibold pt-1.5 text-center max-w-3xl mb-4 font-[Roboto] leading-relaxed">
          Descubre la{" "}
          <strong className="text-green-400">mejor tecnología gaming</strong>{" "}
          del mercado
          <br />
          <strong className="text-blue-400">Envíos gratis</strong> •{" "}
          <strong className="text-green-400">Garantía extendida</strong> •{" "}
          <strong className="text-blue-400">Soporte 24/7</strong>
        </p>

        <section
          className="flex flex-wrap justify-center gap-8 mb-10 text-center"
          aria-label="Estadísticas de la empresa"
        >
          <article className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-lg px-6 py-4 hover:border-green-400/60 transition-all duration-300">
            <div
              className="text-2xl font-bold text-green-400 font-[Orbitron]"
              aria-label="Más de 10,000 productos"
            >
              10K+
            </div>
            <div className="text-white/70 text-sm font-[Roboto]">Productos</div>
          </article>
          <article className="bg-black/50 backdrop-blur-sm border border-blue-400/30 rounded-lg px-6 py-4 hover:border-blue-400/60 transition-all duration-300">
            <div
              className="text-2xl font-bold text-blue-400 font-[Orbitron]"
              aria-label="Más de 50,000 clientes"
            >
              50K+
            </div>
            <div className="text-white/70 text-sm font-[Roboto]">Clientes</div>
          </article>
          <article className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-lg px-6 py-4 hover:border-green-400/60 transition-all duration-300">
            <div
              className="text-2xl font-bold text-green-400 font-[Orbitron]"
              aria-label="99% de satisfacción"
            >
              99%
            </div>
            <div className="text-white/70 text-sm font-[Roboto]">
              Satisfacción
            </div>
          </article>
        </section>

        <div className="flex justify-center">
          <a
            href="#productos"
            className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-8 py-4 rounded-full hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 text-lg font-[Roboto] group inline-block"
            aria-label="Ver todos los productos disponibles"
          >
            <span className="flex items-center gap-2">
              🛒 Ver Productos
              <span
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </a>
        </div>

        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Desplazarse hacia abajo"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div
              className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
