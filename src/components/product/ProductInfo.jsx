const ProductInfo = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  isLoading,
}) => {
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white font-[Orbitron] mb-2">
          {product.name}
        </h1>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-[Orbitron]">
            {formatPrice(product.price)}
          </span>
          <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold font-[Roboto]">
            {product.category}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-white/80 text-base leading-relaxed font-[Roboto]">
          {product.description}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="text-white font-bold text-sm font-[Roboto]">
            Cantidad:
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 bg-green-400/20 text-green-400 rounded-lg flex items-center justify-center hover:bg-green-400/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="w-12 text-center text-white font-bold font-[Roboto]">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
              className="w-8 h-8 bg-green-400/20 text-green-400 rounded-lg flex items-center justify-center hover:bg-green-400/30 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-8 py-4 rounded-full hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 text-lg font-[Roboto] group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Agregando...
              </>
            ) : (
              <>
                AÑADIR AL CARRITO
                <span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                >
                  →
                </span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
