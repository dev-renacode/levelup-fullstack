import GameBackgroundEffects from "../visualeffects/GameBackgroundEffects";

const Products = () => {
  const handleProductClick = (productId) => {
    window.location.hash = `#product/${productId}`;
  };

  // Datos de productos con imágenes reales
  const products = [
    {
      id: 1,
      name: "Mouse Gamer RGB Pro",
      price: "$45.000",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Periféricos",
      features: ["RGB", "16000 DPI", "6 Botones"],
    },
    {
      id: 2,
      name: "Teclado Mecánico Gaming",
      price: "$85.000",
      image:
        "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Periféricos",
      features: ["Switches Mecánicos", "RGB", "Anti-ghosting"],
    },
    {
      id: 3,
      name: "Monitor Gaming 144Hz",
      price: "$180.000",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Monitores",
      features: ["144Hz", "1ms", "FreeSync"],
    },
    {
      id: 4,
      name: "Auricular Gaming 7.1",
      price: "$65.000",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Audio",
      features: ["7.1 Surround", "50mm Drivers", "Noise Cancelling"],
    },
    {
      id: 5,
      name: "Silla Gaming Ergonómica",
      price: "$120.000",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Mobiliario",
      features: ["Ergonómica", "Reposabrazos 4D", "Ajustable"],
    },
    {
      id: 6,
      name: "Placa Base Gaming",
      price: "$299.99",
      image: "https://i.blogs.es/663216/placabaseeleccion/450_1000.jpg",
      category: "Hardware",
      features: ["RGB", "WiFi 6", "PCIe 4.0"],
    },
    {
      id: 7,
      name: "GPU RTX 4080",
      price: "$1299.99",
      image:
        "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4080/geforce-rtx-4080-super-og-1200x630.jpg",
      category: "Hardware",
      features: ["RTX 4080", "16GB VRAM", "Ray Tracing"],
    },
    {
      id: 8,
      name: "Mousepad RGB",
      price: "$49.99",
      image:
        "https://www.tiendacopec.cl/cdn/shop/files/FD-MP062_3.jpg?v=1727523959&width=1200",
      category: "Accesorios",
      features: ["RGB", "XL Size", "Anti-slip"],
    },
  ];

  return (
    <section
      className="w-full min-h-screen bg-black relative overflow-hidden py-20"
      id="productos"
    >
      <GameBackgroundEffects />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-white font-bold text-4xl mb-4 font-[Orbitron]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-400 from-blue-400">
              Nuestros Productos
            </span>
          </h2>
          <p className="text-white/80 text-lg font-[Roboto]">
            Descubre la mejor tecnología gaming del mercado
          </p>
        </header>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          aria-label="Lista de productos gaming"
        >
          {products.map((product) => (
            <li key={product.id}>
              <article
                className="bg-black/80 border-2 border-green-400/30 rounded-xl p-4 sm:p-6 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 hover:scale-105 group backdrop-blur-sm cursor-pointer"
                itemScope
                itemType="https://schema.org/Product"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="text-center mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:from-green-400/20 group-hover:to-blue-400/20 transition-all duration-300 overflow-hidden">
                    <img
                      src={product.image}
                      alt={`Imagen del producto ${product.name}`}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      itemProp="image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-lg items-center justify-center text-6xl hidden"
                      aria-hidden="true"
                    >
                      🎮
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3
                    className="text-white font-bold text-lg group-hover:text-green-400 transition-colors duration-300 font-[Orbitron]"
                    itemProp="name"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-blue-400 text-sm font-semibold bg-blue-400/10 px-2 py-1 rounded-full font-[Roboto]"
                      itemProp="category"
                    >
                      {product.category}
                    </span>
                    <span
                      className="text-green-400 font-bold text-xl font-[Roboto]"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <span itemProp="price">{product.price}</span>
                    </span>
                  </div>

                  <ul
                    className="space-y-1"
                    itemProp="description"
                    aria-label="Características del producto"
                  >
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-white/70 text-sm flex items-center font-[Roboto]"
                      >
                        <div
                          className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"
                          aria-hidden="true"
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 font-[Roboto]"
                    aria-label={`Agregar ${product.name} al carrito`}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <footer className="text-center mt-16">
          <button
            className="bg-gradient-to-r from-blue-400 to-green-400 text-black font-bold px-8 py-3 rounded-full hover:from-blue-500 hover:to-green-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-400/25 font-[Roboto]"
            aria-label="Ver todos los productos disponibles en el catálogo"
          >
            Ver Todos los Productos
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Products;
