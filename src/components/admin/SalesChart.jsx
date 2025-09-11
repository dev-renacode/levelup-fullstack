import { memo } from "react";

const SalesChart = memo(() => {
  const salesData = [
    { month: "Ene", sales: 1200000 },
    { month: "Feb", sales: 1500000 },
    { month: "Mar", sales: 1800000 },
    { month: "Abr", sales: 1600000 },
    { month: "May", sales: 2200000 },
    { month: "Jun", sales: 2450000 },
    { month: "Jul", sales: 2100000 },
    { month: "Ago", sales: 2300000 },
    { month: "Sep", sales: 2800000 },
    { month: "Oct", sales: 2600000 },
    { month: "Nov", sales: 3000000 },
    { month: "Dic", sales: 2450000 },
  ];

  const maxSales = Math.max(...salesData.map((d) => d.sales));
  const minSales = Math.min(...salesData.map((d) => d.sales));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("CLP", "")
      .trim();
  };

  return (
    <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white font-[Orbitron]">
          Ventas Mensuales
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-white/70 text-sm font-[Roboto]">Ventas</span>
          </div>
          <button className="text-green-400 hover:text-green-300 text-sm font-[Roboto] font-medium">
            Exportar
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end space-x-2">
        {salesData.map((data, index) => {
          const height =
            ((data.sales - minSales) / (maxSales - minSales)) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-green-400/20 to-green-400/40 rounded-t-lg relative group">
                <div
                  className="w-full bg-gradient-to-t from-green-400 to-green-500 rounded-t-lg transition-all duration-500 hover:from-green-500 hover:to-green-400"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[Roboto]">
                    {formatCurrency(data.sales)}
                  </div>
                </div>
              </div>
              <span className="text-white/70 text-xs font-[Roboto] mt-2">
                {data.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-white/70 text-sm font-[Roboto]">
            Promedio Mensual
          </p>
          <p className="text-green-400 font-bold text-lg font-[Orbitron]">
            {formatCurrency(
              salesData.reduce((acc, curr) => acc + curr.sales, 0) /
                salesData.length
            )}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm font-[Roboto]">Mejor Mes</p>
          <p className="text-blue-400 font-bold text-lg font-[Orbitron]">
            {salesData.find((d) => d.sales === maxSales)?.month}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm font-[Roboto]">Crecimiento</p>
          <p className="text-green-400 font-bold text-lg font-[Orbitron]">
            +104.2%
          </p>
        </div>
      </div>
    </div>
  );
});

export default SalesChart;
