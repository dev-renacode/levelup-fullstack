import { memo } from "react";

const RecentOrders = memo(() => {
  const orders = [
    {
      id: "#ORD-001",
      customer: "Juan Pérez",
      product: "Mouse Gamer RGB Pro",
      amount: "$45.000",
      status: "Completado",
      date: "2024-12-15",
    },
    {
      id: "#ORD-002",
      customer: "María González",
      product: "Teclado Mecánico Gaming",
      amount: "$85.000",
      status: "En Proceso",
      date: "2024-12-15",
    },
    {
      id: "#ORD-003",
      customer: "Carlos Silva",
      product: "Monitor Gaming 144Hz",
      amount: "$180.000",
      status: "Pendiente",
      date: "2024-12-14",
    },
    {
      id: "#ORD-004",
      customer: "Ana Rodríguez",
      product: "Auricular Gaming 7.1",
      amount: "$65.000",
      status: "Completado",
      date: "2024-12-14",
    },
    {
      id: "#ORD-005",
      customer: "Luis Martínez",
      product: "Silla Gaming Ergonómica",
      amount: "$120.000",
      status: "Enviado",
      date: "2024-12-13",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completado: "bg-green-400/20 text-green-400",
      "En Proceso": "bg-blue-400/20 text-blue-400",
      Pendiente: "bg-yellow-400/20 text-yellow-400",
      Enviado: "bg-purple-400/20 text-purple-400",
    };
    return colors[status] || colors["Pendiente"];
  };

  return (
    <div className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white font-[Orbitron]">
          Pedidos Recientes
        </h3>
        <button className="text-green-400 hover:text-green-300 text-sm font-[Roboto] font-medium">
          Ver todos
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-green-400/20">
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                ID
              </th>
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                Cliente
              </th>
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                Producto
              </th>
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                Monto
              </th>
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                Estado
              </th>
              <th className="text-left text-white/70 text-sm font-[Roboto] py-3">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-green-400/10 hover:bg-green-400/5 transition-colors duration-300"
              >
                <td className="py-4 text-white font-[Roboto] font-medium">
                  {order.id}
                </td>
                <td className="py-4 text-white/80 font-[Roboto]">
                  {order.customer}
                </td>
                <td className="py-4 text-white/80 font-[Roboto]">
                  {order.product}
                </td>
                <td className="py-4 text-green-400 font-[Roboto] font-bold">
                  {order.amount}
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold font-[Roboto] ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-white/60 font-[Roboto] text-sm">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default RecentOrders;
