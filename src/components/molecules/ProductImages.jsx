const ProductImages = ({ images, selectedImage, onImageSelect }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-black/50 border border-green-400/30 group">
        <img
          src={images[selectedImage]}
          alt="Producto principal"
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="w-full h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 items-center justify-center"
          style={{ display: "none" }}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-green-400/30 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-10 h-10 text-green-400"
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
            <p className="text-white/60 text-sm font-[Roboto]">
              Imagen no disponible
            </p>
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedImage === index
                  ? "border-green-400 shadow-lg shadow-green-400/25"
                  : "border-green-400/30 hover:border-green-400/60"
              }`}
            >
              <img
                src={image}
                alt={`Vista ${index + 1}`}
                className="w-full h-20 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 items-center justify-center"
                style={{ display: "none" }}
              >
                <div className="w-6 h-6 bg-green-400/30 rounded flex items-center justify-center mx-auto">
                  <svg
                    className="w-3 h-3 text-green-400"
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
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
