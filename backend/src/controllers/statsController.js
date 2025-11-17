import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// KPIs generales
export const getGeneralStats = async (req, res) => {
  try {
    // Ingresos totales
    const totalRevenueAgg = await Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Órdenes totales
    const totalOrders = await Order.countDocuments();


    // Ingresos este mes
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0,0,0,0);
    const monthRevenueAgg = await Order.aggregate([
      { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const monthRevenue = monthRevenueAgg[0]?.total || 0;

    // Crecimiento vs mes anterior
    const prevMonth = new Date(startOfMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const prevMonthRevenueAgg = await Order.aggregate([
      { $match: { status: "paid", createdAt: { $gte: prevMonth, $lt: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const prevMonthRevenue = prevMonthRevenueAgg[0]?.total || 0;
    const revenueGrowth = prevMonthRevenue ? Math.round(((monthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100) : 0;

    res.json({
      overview: {
        totalRevenue,
        totalOrders,
        monthRevenue,
        revenueGrowth
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo estadísticas generales" });
  }
};

// Ventas por día (últimos 30 días)
export const getSalesChart = async (req, res) => {
  try {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 29);
    startDate.setHours(0,0,0,0);

    const dailyStats = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $in: ["paid", "pending"] } } },
      { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: { $cond: [ { $eq: ["$status", "paid"] }, "$total", 0 ] } },
        orders: { $sum: 1 }
      } },
      { $sort: { _id: 1 } }
    ]);

    // Rellenar días faltantes
    const result = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0,10);
      const stat = dailyStats.find(s => s._id === key);
      result.push({
        date: key,
        revenue: stat?.revenue || 0,
        orders: stat?.orders || 0
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo ventas por día" });
  }
};

// Ventas por categoría
export const getStatsByCategory = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $match: { status: "paid" } },
      { $unwind: "$items" },
      { $group: {
        _id: "$items.category",
        revenue: { $sum: "$items.price" },
        orders: { $sum: 1 }
      } },
      { $sort: { revenue: -1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo ventas por categoría" });
  }
};

// Productos con stock bajo
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lte: 5 } }).select("title category stock price");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo productos con stock bajo" });
  }
};

// Top productos vendidos
export const getTopProducts = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $match: { status: "paid" } },
      { $unwind: "$items" },
      { $group: {
        _id: "$items.productId",
        title: { $first: "$items.title" },
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.price" }
      } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo top productos" });
  }
};
