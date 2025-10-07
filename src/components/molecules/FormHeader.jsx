const FormHeader = ({ title, subtitle }) => {
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-400 font-[Orbitron] mb-2">
        {title}
      </h1>
      <p className="text-white/80 text-base font-[Roboto]">{subtitle}</p>
    </header>
  );
};

export default FormHeader;
