import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboard({ adminCode }) {
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminCode) return;

    const fetchStats = async () => {
      try {
        const [generalRes, chartRes, stockRes, categoryRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/general`, {
            headers: { 'x-admin-code': adminCode }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/sales-chart`, {
            headers: { 'x-admin-code': adminCode }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/low-stock`, {
            headers: { 'x-admin-code': adminCode }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/stats/by-category`, {
            headers: { 'x-admin-code': adminCode }
          })
        ]);

        if (generalRes.ok) setStats(await generalRes.json());
        if (chartRes.ok) setSalesChart(await chartRes.json());
        if (stockRes.ok) setLowStock(await stockRes.json());
        if (categoryRes.ok) setCategoryStats(await categoryRes.json());
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [adminCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
      </div>
    );
  }

  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="space-y-8">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Totales"
          value={`$${stats?.overview.totalRevenue?.toLocaleString('es-CO') || 0}`}
          icon="payments"
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Órdenes Totales"
          value={stats?.overview.totalOrders || 0}
          icon="shopping_cart"
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Ingresos Este Mes"
          value={`$${stats?.overview.monthRevenue?.toLocaleString('es-CO') || 0}`}
          icon="trending_up"
          color="from-purple-500 to-pink-500"
          subtitle={`${stats?.overview.revenueGrowth > 0 ? '+' : ''}${stats?.overview.revenueGrowth}% vs mes anterior`}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por día */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">show_chart</span>
            Ventas Últimos 30 Días
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Ingresos"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Órdenes"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ventas por categoría */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">pie_chart</span>
            Ventas por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry._id || 'Sin categoría'}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top productos y stock bajo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Productos */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">emoji_events</span>
            Top 5 Productos
          </h3>
          <div className="space-y-3">
            {stats?.topProducts?.map((product, idx) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-black">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white">{product.title}</p>
                    <p className="text-sm text-gray-400">
                      {product.totalSold} vendidos
                    </p>
                  </div>
                </div>
                <span className="font-black text-cyan-400">
                  ${product.revenue?.toLocaleString('es-CO')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Productos con stock bajo */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">warning</span>
            Productos con Stock Bajo
          </h3>
          {lowStock.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              ✅ Todos los productos tienen stock suficiente
            </p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-amber-500/30"
                >
                  <div>
                    <p className="font-bold text-white">{product.title}</p>
                    <p className="text-sm text-gray-400">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-amber-400">
                      {product.stock} unidades
                    </span>
                    <span className="text-xs text-gray-400">
                      ${product.price?.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente StatCard
function StatCard({ title, value, icon, color, subtitle, alert }) {
  return (
    <div className={`backdrop-blur-xl bg-white/10 rounded-2xl border ${alert ? 'border-amber-500/50' : 'border-white/20'} p-6 shadow-xl hover:shadow-2xl transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 font-semibold mb-1">{title}</p>
          <p className="text-3xl font-black text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
          )}
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-xl`}>
          <span className="material-symbols-outlined text-2xl text-white">
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}