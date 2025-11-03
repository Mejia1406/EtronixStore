import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Link to="/" className="text-sm text-indigo-600 hover:underline">
            ← Volver a la tienda
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Pedidos Recientes</h2>
          <p className="text-gray-600 text-sm">
            Total de pedidos: {orders.length}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No hay pedidos aún</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
              >
                {/* Encabezado del pedido */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">ID: {order._id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString("es-CO")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status === "pending" && "Pendiente"}
                    {order.status === "paid" && "Pagado"}
                    {order.status === "failed" && "Fallido"}
                  </span>
                </div>

                {/* Información del cliente */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Cliente:
                  </p>
                  <p className="text-sm">
                    {order.buyer?.name || "Sin nombre"} -{" "}
                    {order.buyer?.email || "Sin email"}
                  </p>
                </div>

                {/* Productos */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Productos:
                  </p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                      >
                        <span>
                          {item.title} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          $
                          {(item.unit_price * item.quantity).toLocaleString(
                            "es-CO"
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total y pago */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-lg font-bold">
                    Total: ${order.total.toLocaleString("es-CO")}
                  </span>
                  {order.mp_payment_id && (
                    <p className="text-xs text-gray-500">
                      Pago MP: {order.mp_payment_id}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
