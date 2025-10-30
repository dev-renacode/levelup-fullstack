import { Link } from "react-router-dom";

const Breadcrumbs = ({ product }) => {
  return (
    <nav
      className="flex items-center space-x-2 text-sm font-[Roboto] mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="text-white/70 hover:text-green-400 transition-colors duration-300"
      >
        Home
      </Link>
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
