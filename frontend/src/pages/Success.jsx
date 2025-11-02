import { useSearchParams, Link } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const orderId = params.get("order");
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">¡Pago aprobado! 🎉</h1>
        <p className="mb-4">Tu orden <b>{orderId}</b> fue confirmada.</p>
        <Link to="/" className="inline-block bg-black text-white px-4 py-2 rounded-lg">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
