const AdminHeader = () => {
  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-green-400/30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[Orbitron]">
            ¡HOLA Administrador!
          </h1>
          <p className="text-white/70 text-sm font-[Roboto] mt-1">
            Bienvenido al panel de control de Level-UP Gamers
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-white/70 hover:text-green-400 transition-colors duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L16 7m-5 5v5l-5-5h5z"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
