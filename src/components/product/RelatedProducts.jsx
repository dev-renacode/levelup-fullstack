const RelatedProducts = ({ products, onProductClick }) => {
  if (!products || products.length === 0) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-white font-[Orbitron] mb-8 text-center">
        Productos Relacionados
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-2xl shadow-green-400/20 overflow-hidden hover:border-green-400/60 transition-all duration-300 group cursor-pointer"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-48 bg-gradient-to-br from-green-400/20 to-blue-400/20 items-center justify-center"
                style={{ display: "none" }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-white/60 text-xs font-[Roboto]">
                    Sin imagen
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-white font-bold text-lg font-[Orbitron] mb-2 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-bold text-lg font-[Orbitron]">
                  {formatPrice(product.price)}
                </span>
                <span className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs font-bold font-[Roboto]">
                  {product.category}
                </span>
              </div>

              <p className="text-white/70 text-sm font-[Roboto] line-clamp-2">
                {product.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
