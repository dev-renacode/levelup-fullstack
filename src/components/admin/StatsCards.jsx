import { memo } from "react";

const StatsCards = memo(() => {
  const stats = [
    {
      title: "Ventas Totales",
      value: "$2,450,000",
      change: "+12.5%",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      color: "green",
    },
    {
      title: "Pedidos Hoy",
      value: "47",
      change: "+8.2%",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      color: "blue",
    },
    {
      title: "Productos Activos",
      value: "156",
      change: "+3.1%",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: "purple",
    },
    {
      title: "Clientes Nuevos",
      value: "23",
      change: "+15.3%",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
      orange: "from-orange-400 to-orange-600",
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(
                stat.color
              )} bg-opacity-20`}
            >
              <div className="text-white">{stat.icon}</div>
            </div>
            <span
              className={`text-sm font-bold font-[Roboto] ${
                stat.changeType === "positive"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {stat.change}
            </span>
          </div>

          <div>
            <h3 className="text-white/70 text-sm font-[Roboto] mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-white font-[Orbitron]">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default StatsCards;
