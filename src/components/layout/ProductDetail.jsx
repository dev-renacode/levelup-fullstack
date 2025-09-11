import GameBackgroundEffects from "../visualeffects/GameBackgroundEffects";
import { useProductDetail } from "../../hooks/useProductDetail";
import Breadcrumbs from "../product/Breadcrumbs";
import ProductImages from "../product/ProductImages";
import ProductInfo from "../product/ProductInfo";
import ProductFeatures from "../product/ProductFeatures";
import RelatedProducts from "../product/RelatedProducts";
import ProductLoading from "../product/ProductLoading";

const ProductDetail = () => {
  // Obtener ID del producto desde la URL hash
  const getProductIdFromHash = () => {
    const hash = window.location.hash;
    const match = hash.match(/#product\/(\d+)/);
    return match ? match[1] : null;
  };

  const productId = getProductIdFromHash();
  const {
    product,
    selectedImage,
    quantity,
    isLoading,
    relatedProducts,
    handleImageSelect,
    handleQuantityChange,
    handleAddToCart,
  } = useProductDetail(productId);

  if (isLoading) {
    return <ProductLoading />;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black font-[Roboto] relative overflow-hidden">
        <GameBackgroundEffects />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white font-[Orbitron] mb-4">
              Producto no encontrado
            </h1>
            <p className="text-white/70 text-lg font-[Roboto] mb-8">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <button
              onClick={() => (window.location.hash = "home")}
              className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-8 py-3 rounded-full hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 font-[Roboto]"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleRelatedProductClick = (relatedProductId) => {
    window.location.hash = `#product/${relatedProductId}`;
  };

  return (
    <main
      className="min-h-screen bg-black font-[Roboto] relative overflow-hidden"
      id="producto"
    >
      <GameBackgroundEffects />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-20">
        <Breadcrumbs product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImages
            images={product.images}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
          />

          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        </div>

        <ProductFeatures
          features={product.features}
          specifications={product.specifications}
        />

        <RelatedProducts
          products={relatedProducts}
          onProductClick={handleRelatedProductClick}
        />
      </div>
    </main>
  );
};

export default ProductDetail;
