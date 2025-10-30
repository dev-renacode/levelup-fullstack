import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../config/firestoreService";
import ProductCard from "../molecules/ProductCard";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        const isOffers = (categoryName || "").toLowerCase() === "ofertas";
        const categoryProducts = isOffers
          ? allProducts.filter(p => typeof p.precio === 'number' && typeof p.precioAnterior === 'number' && p.precio < p.precioAnterior)
          : allProducts.filter(product => product.categoria === categoryName);
        setProducts(categoryProducts);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar los productos. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return product.nombre?.toLowerCase().includes(search) ||
           product.descripcion?.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-green-400 text-lg">Cargando productos...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <GameBackgroundEffects />
      
      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Categoría: <span className="text-green-400">{categoryName}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explora todos los productos de esta categoría
            </p>
          </div>

          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 mb-8">
            <div className="max-w-md mx-auto">
              <label className="block text-green-400 font-bold text-sm mb-2">
                BUSCAR PRODUCTO
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o descripción..."
                  className="w-full bg-black/50 border border-green-400/30 rounded-lg px-4 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:border-green-400 focus:bg-black/70 focus:outline-none transition-all duration-300"
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
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-black/80 backdrop-blur-md border border-red-400/30 rounded-xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
                </svg>
                <h3 className="text-white text-xl font-bold mb-2">Sin resultados</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm 
                    ? `No se encontraron productos que coincidan con "${searchTerm}"` 
                    : `No hay productos disponibles en la categoría "${categoryName}"`
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
