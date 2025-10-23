import { scrollToTop } from "../../utils/scrollUtils.js";

const Breadcrumbs = ({ product }) => {
  const navigateTo = (page) => {
    window.location.hash = page;
    // Scroll al tope cuando se navega desde breadcrumbs
    scrollToTop(100);
  };

  return (
    <nav
      className="flex items-center space-x-2 text-sm font-[Roboto] mb-6"
      aria-label="Breadcrumb"
    >
      <button
        onClick={() => navigateTo("home")}
        className="text-white/70 hover:text-green-400 transition-colors duration-300"
      >
        Home
      </button>
      <span className="text-white/50" aria-hidden="true">
        {">"}
      </span>
      <span className="text-white/70">{product?.category || "Categoría"}</span>
      <span className="text-white/50" aria-hidden="true">
        {">"}
      </span>
      <span className="text-green-400 font-medium">
        {product?.name || "Producto"}
      </span>
    </nav>
  );
};

export default Breadcrumbs;
