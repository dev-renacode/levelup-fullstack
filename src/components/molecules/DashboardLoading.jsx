const DashboardLoading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70 font-[Roboto]">Cargando dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
