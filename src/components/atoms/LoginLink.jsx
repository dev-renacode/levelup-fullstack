const LoginLink = () => {
  return (
    <div className="text-center pt-2">
      <p className="text-white/70 text-sm font-[Roboto]">
        ¿Ya tienes cuenta?{" "}
        <a
          href="#login"
          className="text-green-400 hover:text-green-300 transition-colors duration-300 font-medium"
        >
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
};

export default LoginLink;
