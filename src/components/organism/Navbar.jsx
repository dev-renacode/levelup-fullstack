import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { getAllProducts } from "../../config/firestoreService";
import logo from "../../assets/img/level_up_logo.png";
import cartIcon from "../../assets/icon/cart.svg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userData, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { getUnreadCount, notifications } = useNotifications();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Recalcular el contador cuando cambien las notificaciones
  const unreadCount = isAuthenticated ? getUnreadCount() : 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateTo = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Función para verificar si una ruta está activa
  const isActive = (path) => location.pathname === path;

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await getAllProducts();
        const uniqueCategories = [...new Set(products.map(product => product.categoria).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const closeCategories = () => {
    setIsCategoriesOpen(false);
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
            <Link
              to="/"
              onClick={navigateTo}
              className="group"
              aria-label="Level-UP Gamers - Ir al inicio"
            >
              <img
                className="h-14 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                src={logo}
                alt="Level-UP Gamers Logo"
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              to="/"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                isActive("/")
                  ? "text-green-400 bg-green-400/10"
                  : "text-white/90 hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Inicio
            </Link>
            <div className="relative">
              <button
                onClick={toggleCategories}
                className="text-white/90 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-400/10 hover:scale-105 font-[Roboto] flex items-center space-x-1"
              >
                <span>Categorías</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-black/95 backdrop-blur-md border border-blue-400/30 rounded-lg shadow-lg shadow-blue-400/10 z-50">
                  <div className="py-2">
                    {/* Opción "Todas las categorías" */}
                    <Link
                      to="/productos"
                      onClick={() => { closeCategories(); navigateTo(); }}
                      className="block px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-all duration-300 font-[Roboto] font-semibold border-b border-blue-400/20 mb-1"
                    >
                      📦 Todas las categorías
                    </Link>
                    
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <Link
                          key={index}
                          to={`/categoria/${encodeURIComponent(category)}`}
                          onClick={() => { closeCategories(); navigateTo(); }}
                          className="block px-4 py-2 text-sm text-white hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 font-[Roboto]"
                        >
                          {category}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400 font-[Roboto]">
                        Cargando categorías...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/categoria/Ofertas"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                isActive("/categoria/Ofertas")
                  ? "text-red-400 bg-red-400/10"
                  : "text-white/90 hover:text-red-400 hover:bg-red-400/10"
              }`}
            >
              🔥 Ofertas
            </Link>
            <Link
              to="/nosotros"
              onClick={navigateTo}
              className="text-white/90 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:scale-105 font-[Roboto]"
            >
              Nosotros
            </Link>
            <Link
              to="/blog"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                isActive("/blog")
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-white/90 hover:text-blue-400 hover:bg-blue-400/10"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contacto"
              onClick={navigateTo}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 font-[Roboto] ${
                isActive("/contacto")
                  ? "text-green-400 bg-green-400/10"
                  : "text-white/90 hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Contacto
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/perfil"
                  onClick={navigateTo}
                  className="flex items-center space-x-2 hover:bg-green-400/10 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer group"
                  aria-label="Ver mi perfil"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-black font-bold text-sm">
                      {userData?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-[Roboto] group-hover:text-green-400 transition-colors duration-300">
                      ¡Hola, <span className="text-green-400 font-semibold group-hover:text-green-300">{userData?.fullName?.split(" ")[0] || "Usuario"}</span>!
                    </p>
                  </div>
                </Link>
                {userData?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={navigateTo}
                    className="text-white/80 hover:text-purple-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-purple-400/10 rounded-lg font-[Roboto] border border-purple-400/30 hover:border-purple-400/60"
                    aria-label="Acceder al dashboard de administrador"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-white/80 hover:text-red-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-red-400/10 rounded-lg font-[Roboto] border border-red-400/30 hover:border-red-400/60"
                  aria-label="Cerrar sesión"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  onClick={navigateTo}
                  className="text-white/80 hover:text-green-400 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-green-400/10 rounded-lg font-[Roboto]"
                  aria-label="Iniciar sesión en tu cuenta"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={navigateTo}
                  className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 hover:from-green-500 hover:to-blue-500 hover:scale-105 shadow-lg shadow-green-400/25 font-[Roboto]"
                  aria-label="Crear una nueva cuenta"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <Link
                to="/notificaciones"
                onClick={navigateTo}
                className="relative group p-2 rounded-lg hover:bg-blue-400/10 transition-all duration-300"
                aria-label="Ver notificaciones"
              >
                <svg
                  className="h-6 w-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  </div>
                )}
              </Link>
            )}
            <Link
              to="/carrito"
              onClick={navigateTo}
              className="relative group p-2 rounded-lg hover:bg-green-400/10 transition-all duration-300"
              aria-label="Ver carrito de compras"
            >
              <img
                className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                src={cartIcon}
                alt="Icono del carrito de compras"
              />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">{getTotalItems()}</span>
                </div>
              )}
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <Link
                to="/notificaciones"
                onClick={navigateTo}
                className="relative p-2 rounded-lg hover:bg-blue-400/10 transition-all duration-300"
                aria-label="Ver notificaciones"
              >
                <svg
                  className="h-6 w-6 text-white transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  </div>
                )}
              </Link>
            )}
            <Link
              to="/carrito"
              onClick={navigateTo}
              className="relative p-2 rounded-lg hover:bg-green-400/10 transition-all duration-300"
              aria-label="Ver carrito de compras"
            >
              <img
                className="h-6 w-6 transition-all duration-300"
                src={cartIcon}
                alt="Icono del carrito de compras"
              />
              {getTotalItems() > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">{getTotalItems()}</span>
                </div>
              )}
            </Link>

            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-green-400 hover:bg-green-400/10 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-y-auto`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-black/95 backdrop-blur-sm border-t border-green-400/30">
            <Link
              to="/"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                isActive("/")
                  ? "text-green-400 bg-green-400/10"
                  : "text-white hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Inicio
            </Link>
            <Link
              to="/categoria/Ofertas"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                isActive("/categoria/Ofertas")
                  ? "text-red-400 bg-red-400/10"
                  : "text-white hover:text-red-400 hover:bg-red-400/10"
              }`}
            >
              🔥 Ofertas
            </Link>
            <div className="px-3 py-2">
              <div className="text-white text-base font-medium font-[Roboto] mb-2">Categorías</div>
              <div className="space-y-1">
                {/* Opción "Todas las categorías" para móvil */}
                <Link
                  to="/productos"
                  onClick={navigateTo}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-all duration-300 font-[Roboto] font-semibold border border-blue-400/30 mb-2"
                >
                  📦 Todas las categorías
                </Link>
                
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/categoria/${encodeURIComponent(category)}`}
                      onClick={navigateTo}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm text-white hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-300 font-[Roboto]"
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-400 font-[Roboto]">
                    Cargando categorías...
                  </div>
                )}
              </div>
            </div>
            <Link
              to="/nosotros"
              onClick={navigateTo}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 font-[Roboto]"
            >
              Nosotros
            </Link>
            <Link
              to="/blog"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                isActive("/blog")
                  ? "text-blue-400 bg-blue-400/10"
                  : "text-white hover:text-blue-400 hover:bg-blue-400/10"
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contacto"
              onClick={navigateTo}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 font-[Roboto] ${
                isActive("/contacto")
                  ? "text-green-400 bg-green-400/10"
                  : "text-white hover:text-green-400 hover:bg-green-400/10"
              }`}
            >
              Contacto
            </Link>

            <div className="pt-4 pb-3 border-t border-green-400/30">
              {isAuthenticated ? (
                <div className="px-3 space-y-3">
                  <Link
                    to="/perfil"
                    onClick={navigateTo}
                    className="flex items-center space-x-3 p-3 bg-green-400/10 rounded-lg border border-green-400/30 hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-black font-bold text-sm">
                        {userData?.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-[Roboto] group-hover:text-green-400 transition-colors duration-300">
                        ¡Hola, <span className="text-green-400 font-semibold group-hover:text-green-300">{userData?.fullName?.split(" ")[0] || "Usuario"}</span>!
                      </p>
                      <p className="text-white/60 text-xs font-[Roboto] group-hover:text-white/80 transition-colors duration-300">
                        {userData?.email}
                      </p>
                    </div>
                  </Link>
                  {userData?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={navigateTo}
                      className="block w-full px-4 py-3 text-center text-white hover:text-purple-400 hover:bg-purple-400/10 rounded-lg border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 font-[Roboto] font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 text-center text-white hover:text-red-400 hover:bg-red-400/10 rounded-lg border border-red-400/30 hover:border-red-400/60 transition-all duration-300 font-[Roboto] font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 px-3">
                  <Link
                    to="/login"
                    onClick={navigateTo}
                    className="w-full px-4 py-3 text-center text-white hover:text-green-400 hover:bg-green-400/10 rounded-lg border border-green-400/30 hover:border-green-400/60 transition-all duration-300 font-[Roboto] font-medium"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    onClick={navigateTo}
                    className="w-full px-4 py-3 text-center bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-green-400/25 font-[Roboto]"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
