import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const ProductCard = ({ product, onStockUpdate }) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, cartItems, getUpdatedStock } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  const isInCart = cartItems.some(item => item.id === product.id);
  const cartItem = cartItems.find(item => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  
  // Usar el stock actualizado del contexto (que se actualiza en tiempo real)
  const availableStock = getUpdatedStock(product.id, product.stock || 0);
  const isOutOfStock = availableStock <= 0;

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Evitar que se ejecute el click del producto

    if (isOutOfStock || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(product);
      // El stock se actualiza automáticamente en el contexto
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleProductClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const isOffer = typeof product.precioAnterior === 'number' && typeof product.precio === 'number' && product.precio < product.precioAnterior;

  return (
    <article 
      className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300 hover:border-green-400/50 group cursor-pointer"
      itemScope
      itemType="https://schema.org/Product"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        {!imageError && product.imagen ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            itemProp="image"
          />
        ) : (
          <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-green-500/90 text-black px-2 py-1 rounded-full text-xs font-bold">
          {product.categoria || 'Gaming'}
        </div>
        {isOffer && (
          <div className="absolute top-2 left-2 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
            Oferta
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Sin Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 
          className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-400 transition-colors"
          itemProp="name"
        >
          {product.nombre}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2" itemProp="description">
          {product.descripcion || 'Descripción no disponible'}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-green-400 font-bold text-xl"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <span itemProp="price">{formatPrice(product.precio || 0)}</span>
            {isOffer && (
              <span className="ml-2 text-gray-400 line-through text-base align-middle">
                {formatPrice(product.precioAnterior)}
              </span>
            )}
          </span>
          
          <button 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
              isOutOfStock || isAdding
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-black hover:scale-105'
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            aria-label={isOutOfStock ? 'Sin stock disponible' : `Agregar ${product.nombre} al carrito`}
          >
            {isAdding ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                Agregando...
              </span>
            ) : isOutOfStock ? (
              'Sin stock'
            ) : (
              'Agregar'
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className={`${availableStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {availableStock > 0 ? (
              <span>📦 {availableStock} disponibles</span>
            ) : (
              <span>❌ Sin stock disponible</span>
            )}
          </span>
          {isInCart && (
            <span className="text-blue-400">
              🛒 {cartQuantity} en carrito
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
