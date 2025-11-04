import { Link } from "react-router-dom";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const Nosotros = () => {
  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden" id="nosotros">
      <GameBackgroundEffects />

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold font-[Orbitron] text-white mb-4">
              Somos <span className="text-green-400">Level-UP Gamers</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Tecnología, diseño y pasión gamer para elevar tu experiencia de juego al siguiente nivel.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { k: "+10K", v: "Clientes felices" },
              { k: "+1.2K", v: "Productos premium" },
              { k: "24/7", v: "Soporte" },
              { k: "99%", v: "Satisfacción" },
            ].map((s, i) => (
              <div key={i} className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-green-400 font-[Orbitron]">{s.k}</div>
                <div className="text-white/80 mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-3">Nuestra Misión</h2>
            <p className="text-gray-300 leading-relaxed">
              Entregar hardware y periféricos de alto rendimiento con una experiencia de compra épica, 
              combinando asesoría experta, envíos rápidos y un ecosistema digital potente.
            </p>
          </div>
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white font-[Orbitron] mb-3">Nuestra Visión</h2>
            <p className="text-gray-300 leading-relaxed">
              Ser la comunidad gamer más influyente de LATAM, impulsando el rendimiento y la creatividad de cada jugador.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-2xl font-bold font-[Orbitron] mb-6 text-center">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Rendimiento", d: "Productos probados al límite." },
              { t: "Confianza", d: "Garantías claras y soporte real." },
              { t: "Comunidad", d: "Crecemos junto a nuestros jugadores." },
              { t: "Innovación", d: "Siempre buscando el next level." },
            ].map((v, i) => (
              <div key={i} className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-1">{v.t}</h3>
                <p className="text-gray-400 text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-2xl font-bold font-[Orbitron] mb-6 text-center">Nuestro Camino</h2>
          <div className="relative border-l border-green-400/20 ml-4">
            {[
              { y: "2021", e: "Nacemos como tienda online." },
              { y: "2022", e: "Integramos envíos en 24-48h y soporte 24/7." },
              { y: "2023", e: "Comunidad supera los 8K gamers." },
              { y: "2024", e: "Catálogo +1.2K productos y dashboard admin." },
            ].map((it, i) => (
              <div key={i} className="mb-6 ml-4">
                <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-4">
                  <div className="text-green-400 font-[Orbitron] font-bold">{it.y}</div>
                  <div className="text-white/90">{it.e}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 border border-green-400/30 rounded-2xl p-6 md:p-10 text-center">
            <h3 className="text-white text-2xl md:text-3xl font-[Orbitron] font-bold mb-3">¿Listo para subir de nivel?</h3>
            <p className="text-gray-300 mb-6">Explora nuestras categorías y descubre ofertas exclusivas para la comunidad.</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/productos" className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg transition">
                Ver productos
              </Link>
              <Link to="/categoria/Ofertas" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition">
                Ver ofertas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;


