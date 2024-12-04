import { Router } from "express";
import { getOrders, createOrder, updateOrder, deleteOrder, assingMaster } from "../controllers/orders.js";

const router = Router();

router.use((req, res, next) => {
	if (!req.session.user) return res.redirect("/auth");

	next();
});

router.get("/", getOrders);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

router.post("/assign-master/:id", assingMaster);

export default router;
