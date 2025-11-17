import express from "express";
import { getGeneralStats, getSalesChart, getStatsByCategory, getLowStockProducts, getTopProducts } from "../controllers/statsController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren admin
router.get("/general", requireAdmin, getGeneralStats);
router.get("/sales-chart", requireAdmin, getSalesChart);
router.get("/by-category", requireAdmin, getStatsByCategory);
router.get("/low-stock", requireAdmin, getLowStockProducts);
router.get("/top-products", requireAdmin, getTopProducts);

export default router;
