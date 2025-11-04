import { Link } from "react-router-dom";

const LoginLink = () => {
  return (
    <div className="text-center pt-2">
      <p className="text-white/70 text-sm font-[Roboto]">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default LoginLink;
