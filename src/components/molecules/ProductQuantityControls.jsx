import { useState } from 'react';

const ProductQuantityControls = ({ quantity, onQuantityChange, maxQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className={`w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-all duration-200 ${
          quantity <= 1
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
        }`}
      >
        -
      </button>
      
      <span className="text-xl w-12 text-center font-bold text-white">
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className={`w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-all duration-200 ${
          quantity >= maxQuantity
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
        }`}
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantityControls;
