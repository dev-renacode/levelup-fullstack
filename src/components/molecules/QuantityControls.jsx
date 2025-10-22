import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const QuantityControls = ({ item }) => {
  const { updateCartQuantity, removeFromCart, clearCart, cartItems, isOperationInProgress } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (isOperationInProgress(item.id) || isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      if (newQuantity <= 0) {
        // Si es el último producto, vaciar carrito completamente
        if (cartItems.length === 1 && cartItems[0].id === item.id) {
          await clearCart();
        } else {
          await removeFromCart(item.id);
        }
      } else {
        await updateCartQuantity(item.id, newQuantity);
      }
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrease = () => {
    handleQuantityChange(item.quantity - 1);
  };

  const handleIncrease = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const isDisabled = isOperationInProgress(item.id) || isProcessing;

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDecrease}
        disabled={isDisabled}
        className={`w-10 h-10 sm:w-8 sm:h-8 rounded flex items-center justify-center text-lg sm:text-sm font-bold transition-all duration-200 ${
          isDisabled
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
        }`}
      >
        {isDisabled ? (
          <div className="animate-spin rounded-full h-5 w-5 sm:h-4 sm:w-4 border-b-2 border-gray-400"></div>
        ) : (
          '-'
        )}
      </button>
      
      <span className={`text-xl sm:text-lg w-12 sm:w-8 text-center font-bold transition-colors ${
        isDisabled ? 'text-gray-400' : 'text-white'
      }`}>
        {item.quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={isDisabled}
        className={`w-10 h-10 sm:w-8 sm:h-8 rounded flex items-center justify-center text-lg sm:text-sm font-bold transition-all duration-200 ${
          isDisabled
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
        }`}
      >
        {isDisabled ? (
          <div className="animate-spin rounded-full h-5 w-5 sm:h-4 sm:w-4 border-b-2 border-gray-400"></div>
        ) : (
          '+'
        )}
      </button>
    </div>
  );
};

export default QuantityControls;
