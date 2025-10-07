const ProductLoading = () => {
  return (
    <div className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="animate-pulse">
          <div className="h-4 bg-green-400/20 rounded w-48 mb-6"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-96 bg-green-400/20 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-green-400/20 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-8 bg-green-400/20 rounded w-3/4"></div>
                <div className="h-6 bg-green-400/20 rounded w-1/3"></div>
              </div>

              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-green-400/20 rounded w-full"
                  ></div>
                ))}
              </div>

              <div className="h-12 bg-green-400/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
