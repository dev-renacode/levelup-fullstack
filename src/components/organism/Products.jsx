import { useState, useMemo, useEffect } from "react";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import ProductCard from "../molecules/ProductCard";
import { useProducts } from "../../utils/hooks/useProducts";

const Products = () => {
  const { products, loading, error, refreshProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [categories, setCategories] = useState([]);

  // Extraer categorías únicas de los productos
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.categoria).filter(Boolean))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory === "Ofertas") {
      filtered = filtered.filter(product => 
        typeof product.precio === 'number' && 
        typeof product.precioAnterior === 'number' && 
        product.precio < product.precioAnterior
      );
    } else if (selectedCategory !== "Todas") {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre?.toLowerCase().includes(search) ||
        product.descripcion?.toLowerCase().includes(search) ||
        product.categoria?.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section
      className="w-full min-h-screen bg-black relative overflow-hidden py-20"
      id="productos"
    >
      <GameBackgroundEffects />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-white font-bold text-4xl mb-4 font-[Orbitron]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-400 from-blue-400">
              Nuestros Productos
            </span>
          </h2>
          <p className="text-white/80 text-lg font-[Roboto] mb-8">
            Descubre la mejor tecnología gaming del mercado
          </p>
          
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full px-4 py-3 pl-12 pr-12 bg-black/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:bg-black/70 transition-all duration-300 font-[Roboto]"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {searchTerm && (
              <div className="mt-4 text-center">
                <p className="text-white/70 font-[Roboto]">
                  {filteredProducts.length === 0 
                    ? "No se encontraron productos" 
                    : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Tarjetas de categorías */}
          {!loading && products.length > 0 && (
            <div className="mt-10 mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {/* Categoría "Todas" */}
                <button
                  onClick={() => handleCategoryClick("Todas")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-[Roboto] ${
                    selectedCategory === "Todas"
                      ? "bg-gradient-to-r from-green-400 to-blue-400 text-black shadow-lg shadow-green-400/50 scale-105"
                      : "bg-black/50 border border-green-400/30 text-white hover:border-green-400 hover:bg-green-400/10 hover:scale-105"
                  }`}
                >
                  📦 Todas
                </button>

                {/* Categoría "Ofertas" */}
                <button
                  onClick={() => handleCategoryClick("Ofertas")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-[Roboto] ${
                    selectedCategory === "Ofertas"
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50 scale-105"
                      : "bg-black/50 border border-red-400/30 text-white hover:border-red-400 hover:bg-red-400/10 hover:scale-105"
                  }`}
                >
                  🔥 Ofertas
                </button>

                {/* Resto de categorías */}
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 font-[Roboto] ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg shadow-blue-400/50 scale-105"
                        : "bg-black/50 border border-blue-400/30 text-white hover:border-blue-400 hover:bg-blue-400/10 hover:scale-105"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-3 text-white">Cargando productos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={refreshProducts} 
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            {searchTerm ? (
              <div className="bg-black/80 backdrop-blur-md border border-red-400/30 rounded-xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
                </svg>
                <h3 className="text-white text-xl font-bold mb-2">Sin resultados</h3>
                <p className="text-gray-400 mb-4">
                  No se encontraron productos que coincidan con "{searchTerm}"
                </p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              <div>
                <p className="text-white/70 text-lg">No hay productos disponibles.</p>
                <button 
                  onClick={refreshProducts}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Actualizar
                </button>
              </div>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductCard 
                  product={product}
                />
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
};

export default Products;
