import { Link } from "react-router-dom";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const Footer = () => {
  return (
    <footer
      className="w-full bg-black relative overflow-hidden py-16"
      id="contacto"
    >
      <GameBackgroundEffects />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-2xl mb-4 font-[Orbitron]">
              {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-400 from-blue-400">
                Level-UP Gamers
              </span>
            </h3>
            <p className="text-white/80 text-sm mb-6 font-[Roboto] leading-relaxed">
              Tu tienda de confianza para productos gaming de alta calidad.
              Ofrecemos la mejor tecnología gaming del mercado con envíos
              rápidos y garantía extendida en todos nuestros productos.
            </p>
            <nav className="flex space-x-4" aria-label="Redes sociales">
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                aria-label="Síguenos en Facebook"
              >
                <span className="text-black font-bold" aria-hidden="true">
                  f
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                aria-label="Síguenos en Twitter"
              >
                <span className="text-black font-bold" aria-hidden="true">
                  t
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                aria-label="Síguenos en Instagram"
              >
                <span className="text-black font-bold" aria-hidden="true">
                  i
                </span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                aria-label="Síguenos en YouTube"
              >
                <span className="text-black font-bold" aria-hidden="true">
                  y
                </span>
              </a>
            </nav>
          </div>

          <nav>
            <h4 className="text-white font-bold text-lg mb-4 font-[Orbitron]">
              Enlaces Rápidos
            </h4>
            <ul
              className="space-y-3"
              role="list"
              aria-label="Navegación rápida"
            >
              {[
                { name: "Inicio", to: "/" },
                { name: "Productos", to: "/productos" },
                { name: "Nosotros", to: "/nosotros" },
                { name: "Blog", to: "/blog" },
                { name: "Contacto", to: "/contacto" },
              ].map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-green-400 transition-all duration-300 text-sm font-[Roboto] hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h4 className="text-white font-bold text-lg mb-4 font-[Orbitron]">
              Categorías
            </h4>
            <ul
              className="space-y-3"
              role="list"
              aria-label="Categorías de productos"
            >
              {[
                "Periféricos",
                "Hardware",
                "Monitores",
                "Audio",
                "Muebles",
                "Accesorios",
              ].map((category) => (
                <li key={category} role="listitem">
                  <Link
                    to={`/categoria/${encodeURIComponent(category)}`}
                    className="text-white/70 hover:text-blue-400 transition-all duration-300 text-sm font-[Roboto] hover:translate-x-1 transform"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-green-400/30 mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <address>
            <h5 className="text-white font-semibold mb-3 font-[Orbitron]">
              Contacto
            </h5>
            <div className="space-y-2 text-sm font-[Roboto] not-italic">
              <p className="text-white/70">
                <a
                  href="mailto:info@levelupgamers.cl"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  📧 info@levelupgamers.cl
                </a>
              </p>
              <p className="text-white/70">
                <a
                  href="tel:+56912345678"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  📞 +56 9 1234 5678
                </a>
              </p>
              <p className="text-white/70">📍 Santiago, Chile</p>
            </div>
          </address>

          <div>
            <h5 className="text-white font-semibold mb-3 font-[Orbitron]">
              Horarios
            </h5>
            <dl className="space-y-2 text-sm font-[Roboto]">
              <div>
                <dt className="sr-only">Días laborales</dt>
                <dd className="text-white/70">Lun - Vie: 9:00 - 18:00</dd>
              </div>
              <div>
                <dt className="sr-only">Sábados</dt>
                <dd className="text-white/70">Sáb: 10:00 - 16:00</dd>
              </div>
              <div>
                <dt className="sr-only">Domingos</dt>
                <dd className="text-white/70">Dom: Cerrado</dd>
              </div>
            </dl>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3 font-[Orbitron]">
              Newsletter
            </h5>
            <form className="flex" aria-label="Suscribirse al newsletter">
              <label htmlFor="newsletter-email" className="sr-only">
                Dirección de correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Tu email"
                className="flex-1 px-3 py-2 bg-black/50 border border-green-400/30 rounded-l-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-green-400 font-[Roboto]"
                required
                aria-describedby="newsletter-description"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-4 py-2 rounded-r-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 text-sm font-[Roboto]"
                aria-label="Suscribirse al newsletter"
              >
                Suscribirse
              </button>
            </form>
            <p id="newsletter-description" className="sr-only">
              Recibe las últimas ofertas y novedades de productos gaming
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-green-400/20">
          <p className="text-white/60 text-sm font-[Roboto] mb-4 md:mb-0">
            © 2025 Level-UP Gamers. Todos los derechos reservados.
          </p>
          <nav className="flex space-x-6" aria-label="Enlaces legales">
            <a
              href="#privacidad"
              className="text-white/60 hover:text-green-400 transition-colors duration-300 text-sm font-[Roboto]"
            >
              Política de Privacidad
            </a>
            <a
              href="#terminos"
              className="text-white/60 hover:text-blue-400 transition-colors duration-300 text-sm font-[Roboto]"
            >
              Términos y Condiciones
            </a>
            <a
              href="#envios"
              className="text-white/60 hover:text-green-400 transition-colors duration-300 text-sm font-[Roboto]"
            >
              Envíos y Devoluciones
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
