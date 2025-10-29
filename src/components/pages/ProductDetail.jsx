import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../utils/hooks/useProducts";
import GameBackgroundEffects from "../molecules/GameBackgroundEffects";
import ProductQuantityControls from "../molecules/ProductQuantityControls";
import Breadcrumbs from "../molecules/Breadcrumbs";

const ProductDetail = ({ productId }) => {
  const { products, loading, error } = useProducts();
  const { addToCart, cartItems, getUpdatedStock } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (product) {
      setImageError(false);
    }
  }, [product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      window.location.hash = "login";
      return;
    }

    if (!product || isAdding) return;

    setIsAdding(true);
    try {
      // Agregar múltiples unidades al carrito
      for (let i = 0; i < quantity; i++) {
        await addToCart(product);
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-white">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-white text-xl font-bold mb-2">Producto no encontrado</h2>
            <p className="text-gray-400 mb-4">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <button 
              onClick={() => window.location.hash = "productos"}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const availableStock = getUpdatedStock(product.id, product.stock || 0);
  const isOutOfStock = availableStock <= 0;
  const isInCart = cartItems.some(item => item.id === product.id);
  const cartItem = cartItems.find(item => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isOffer = typeof product?.precio === 'number' && typeof product?.precioAnterior === 'number' && product.precio < product.precioAnterior;

  // Simular múltiples imágenes (en un caso real vendrían del backend)
  const productImages = [
    product.imagen,
    product.imagen, // Duplicamos para simular galería
    product.imagen
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <GameBackgroundEffects />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Inicio', href: '#home' },
            { label: 'Productos', href: '#productos' },
            { label: product.categoria || 'Gaming', href: `#categoria/${encodeURIComponent(product.categoria || 'Gaming')}` },
            { label: product.nombre, href: '#' }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl overflow-hidden">
              {!imageError && productImages[selectedImage] ? (
                <img
                  src={productImages[selectedImage]}
                  alt={product.nombre}
                  className="w-full h-96 lg:h-[500px] object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-96 lg:h-[500px] bg-gray-800 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Badge de categoría */}
              <div className="absolute top-4 left-4 bg-green-500/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                {product.categoria || 'Gaming'}
              </div>
              {isOffer && (
                <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
                  Oferta
                </div>
              )}
              
              {/* Indicador de stock */}
              {isOutOfStock && (
                <div className="absolute bottom-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Sin Stock
                </div>
              )}
            </div>

            {/* Miniaturas */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-green-400' 
                      : 'border-gray-600 hover:border-green-400/50'
                  }`}
                >
                  {!imageError && image ? (
                    <img
                      src={image}
                      alt={`${product.nombre} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Título y precio */}
            <div>
              <h1 className="text-white text-3xl lg:text-4xl font-bold mb-4 font-[Orbitron]">
                {product.nombre}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-green-400 text-3xl font-bold">
                  {formatPrice(product.precio || 0)}
                </span>
                {isOffer && (
                  <span className="text-gray-500 line-through text-xl">
                    {formatPrice(product.precioAnterior)}
                  </span>
                )}
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">(4.8)</span>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-white text-xl font-bold mb-3">Descripción</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.descripcion || 'Descripción detallada no disponible. Este producto de gaming está diseñado para ofrecer la mejor experiencia a los jugadores más exigentes.'}
              </p>
            </div>

            {/* Características */}
            <div>
              <h3 className="text-white text-xl font-bold mb-3">Características principales</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tecnología gaming de última generación
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Diseño ergonómico y resistente
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compatible con múltiples plataformas
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Garantía de 1 año
                </li>
              </ul>
            </div>

            {/* Stock y cantidad */}
            <div className="bg-black/50 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold">Stock disponible:</span>
                <span className={`font-bold ${availableStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {availableStock > 0 ? `${availableStock} unidades` : 'Sin stock'}
                </span>
              </div>

              {availableStock > 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-white font-bold mb-2 block">Cantidad:</label>
                    <ProductQuantityControls
                      quantity={quantity}
                      onQuantityChange={setQuantity}
                      maxQuantity={availableStock}
                    />
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding || isOutOfStock}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                      isAdding || isOutOfStock
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-black hover:scale-105'
                    }`}
                  >
                    {isAdding ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Agregando al carrito...
                      </span>
                    ) : (
                      `Agregar al carrito - ${formatPrice(product.precio * quantity)}`
                    )}
                  </button>

                  {isInCart && (
                    <div className="text-center">
                      <span className="text-blue-400 font-bold">
                        🛒 {cartQuantity} unidades en tu carrito
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Envío gratis en compras sobre $50.000
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Garantía de 1 año
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Devolución en 30 días
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Entrega en 24-48 horas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
