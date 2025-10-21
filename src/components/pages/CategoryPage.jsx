import { useState, useEffect } from "react";
import { getAllProducts } from "../../config/firestoreService";
import ProductCard from "../molecules/ProductCard";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";

const CategoryPage = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        // Filtrar productos por categoría
        const categoryProducts = allProducts.filter(product => 
          product.categoria === categoryName
        );
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

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Categoría: <span className="text-green-400">{categoryName}</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explora todos los productos de esta categoría
            </p>
          </div>

          {/* Búsqueda */}
          <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 mb-8">
            <div className="max-w-md mx-auto">
              <label className="block text-green-400 font-bold text-sm mb-2">
                BUSCAR PRODUCTO
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o descripción..."
                className="w-full bg-black/50 border border-green-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Productos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-white text-xl font-bold mb-2">No se encontraron productos</h3>
                <p className="text-gray-400">
                  {searchTerm 
                    ? "No hay productos que coincidan con tu búsqueda" 
                    : `No hay productos disponibles en la categoría "${categoryName}"`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Contador de resultados */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-400">
                Mostrando {filteredProducts.length} de {products.length} productos en {categoryName}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
