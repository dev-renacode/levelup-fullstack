import { useState } from "react";
import logo from "../../assets/img/level_up_logo.png";
import cartIcon from "../../assets/icon/cart.svg";
import menuIcon from "../../assets/icon/menu.svg";
import closeIcon from "../../assets/icon/close.svg";

const Navbar = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = (/* page */) => {
    // Mantener por compatibilidad si se requiere en el futuro
    closeMenu();
  };

  return (
    <header className="bg-black/95 backdrop-blur-md border-b border-green-400/30 fixed w-full z-50 shadow-2xl shadow-green-400/10">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={navigateTo}
              className="group"
              aria-label="Level-UP Gamers - Ir al inicio"
            >
              <img
                className="h-14 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                src={logo}
                alt="Level-UP Gamers Logo"
              />
            </a>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <a
              href="#home"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                currentPage === "home"
                  ? "text-green-400 bg-green-400/10"
                  : "text-white/90 hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Inicio
            </a>
            <a
              href="#home"
              onClick={navigateTo}
              className="text-white/90 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-400/10 hover:scale-105 font-[Roboto]"
            >
              Productos
            </a>
            <a
              href="#home"
              onClick={navigateTo}
              className="text-white/90 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:scale-105 font-[Roboto]"
            >
              Nosotros
            </a>
            <a
              href="#blog"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                currentPage === "blog"
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-white/90 hover:text-blue-400 hover:bg-blue-400/10"
              }`}
            >
              Blog
            </a>
            <a
              href="#contacto"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                currentPage === "contacto"
                  ? "text-green-400 bg-green-400/10"
                  : "text-white/90 hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Contacto
            </a>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            <div className="flex items-center space-x-2">
              <a
                href="#login"
                onClick={navigateTo}
                className="text-white/80 hover:text-green-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-green-400/10 rounded-lg font-[Roboto]"
                aria-label="Iniciar sesión en tu cuenta"
              >
                Iniciar Sesión
              </a>
              <a
                href="#register"
                onClick={navigateTo}
                className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 hover:from-green-500 hover:to-blue-500 hover:scale-105 shadow-lg shadow-green-400/25 font-[Roboto]"
                aria-label="Crear una nueva cuenta"
              >
                Registrarse
              </a>
            </div>

            <a
              href="#carrito"
              className="relative group p-2 rounded-lg hover:bg-green-400/10 transition-all duration-300"
              aria-label="Ver carrito de compras"
            >
              <img
                className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                src={cartIcon}
                alt="Icono del carrito de compras"
              />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">0</span>
              </div>
            </a>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="#carrito"
              className="relative p-2 rounded-lg hover:bg-green-400/10 transition-all duration-300"
              aria-label="Ver carrito de compras"
            >
              <img
                className="h-6 w-6 transition-all duration-300"
                src={cartIcon}
                alt="Icono del carrito de compras"
              />
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">0</span>
              </div>
            </a>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-green-400 hover:bg-green-400/10 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="sr-only">Abrir menú principal</span>
              <img
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                src={menuIcon}
                alt="Abrir menú"
                aria-hidden="true"
              />
              <img
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                src={closeIcon}
                alt="Cerrar menú"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-sm border-t border-green-400/30">
            <a
              href="#home"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                currentPage === "home"
                  ? "text-green-400 bg-green-400/10"
                  : "text-white hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Inicio
            </a>
            <a
              href="#home"
              onClick={navigateTo}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 font-[Roboto]"
            >
              Productos
            </a>
            <a
              href="#home"
              onClick={navigateTo}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 font-[Roboto]"
            >
              Nosotros
            </a>
            <a
              href="#blog"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                currentPage === "blog"
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-white hover:text-blue-400 hover:bg-blue-400/10"
              }`}
            >
              Blog
            </a>
            <a
              href="#contacto"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                currentPage === "contacto"
                  ? "text-green-400 bg-green-400/10"
                  : "text-white hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Contacto
            </a>

            <div className="pt-4 pb-3 border-t border-green-400/30">
              <div className="flex flex-col space-y-3 px-3">
                <a
                  href="#login"
                  onClick={navigateTo}
                  className="w-full px-4 py-3 text-center text-white hover:text-green-400 hover:bg-green-400/10 rounded-lg border border-green-400/30 hover:border-green-400/60 transition-all duration-300 font-[Roboto] font-medium"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="#register"
                  onClick={navigateTo}
                  className="w-full px-4 py-3 text-center bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-green-400/25 font-[Roboto]"
                >
                  Registrarse
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
