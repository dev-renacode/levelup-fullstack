import { memo } from "react";

const TopProducts = memo(() => {
  const products = [
    {
      name: "Mouse Gamer RGB Pro",
      sales: 45,
      revenue: "$2,025,000",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trend: "up",
    },
    {
      name: "Teclado Mecánico Gaming",
      sales: 32,
      revenue: "$2,720,000",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trend: "up",
    },
    {
      name: "Monitor Gaming 144Hz",
      sales: 18,
      revenue: "$3,240,000",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trend: "up",
    },
    {
      name: "Auricular Gaming 7.1",
      sales: 28,
      revenue: "$1,820,000",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trend: "down",
    },
    {
      name: "Silla Gaming Ergonómica",
      sales: 15,
      revenue: "$1,800,000",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trend: "up",
    },
  ];

  return (
    <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white font-[Orbitron]">
          Productos Más Vendidos
        </h3>
        <button className="text-green-400 hover:text-green-300 text-sm font-[Roboto] font-medium">
          Ver reporte completo
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-green-400/5 transition-colors duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-green-400/20 to-blue-400/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full items-center justify-center"
                  style={{ display: "none" }}
                >
                  <svg
                    className="w-6 h-6 text-green-400 mx-auto"
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
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-[Roboto] font-medium truncate">
                {product.name}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-white/70 text-sm font-[Roboto]">
                  {product.sales} ventas
                </span>
                <span className="text-green-400 font-[Roboto] font-bold">
                  {product.revenue}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div
                className={`flex items-center space-x-1 ${
                  product.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {product.trend === "up" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17l9.2-9.2M17 17V7H7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 7l-9.2 9.2M7 7v10h10"
                    />
                  )}
                </svg>
                <span className="text-xs font-[Roboto] font-bold">
                  {product.trend === "up" ? "+12%" : "-3%"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TopProducts;
