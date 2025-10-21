import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart, cartItems } = useCart();

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
  // Usar el stock real del producto (que ya se actualiza en Firebase)
  const availableStock = product.stock || 0;

  return (
    <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl shadow-lg shadow-green-400/10 hover:shadow-green-400/20 transition-all duration-300 hover:border-green-400/50 group">
      <div className="relative overflow-hidden rounded-t-xl">
        {!imageError && product.imagen ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
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
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
          {product.nombre}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {product.descripcion || 'Descripción no disponible'}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-bold text-xl">
            {formatPrice(product.precio || 0)}
          </span>
          
          <button 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors duration-200 ${
              availableStock > 0 
                ? 'bg-green-500 hover:bg-green-600 text-black' 
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
            onClick={() => availableStock > 0 && addToCart(product)}
            disabled={availableStock <= 0}
          >
            {availableStock > 0 ? 'Agregar' : 'Sin stock'}
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          {availableStock > 0 ? (
            <span className="text-green-400">
              {availableStock} disponibles
            </span>
          ) : (
            <span className="text-red-400">
              Sin stock disponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
