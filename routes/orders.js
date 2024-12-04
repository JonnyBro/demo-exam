import express from "express";
import { Order } from "../models/Order.js";

const router = express.Router();
export const repo = [
	new Order(1, "2024-10-10", "Ноутбук", "Не заряжается", "", "Сергеев С.С.", "В ожидании"),
	new Order(2, "2024-12-01", "ПК", "Не включается", "", "Рожков А.И.", "В ожидании"),
	new Order(3, "2024-10-20", "КПК", "Умер", "", "Иванов И.И.", "В ожидании"),
];

let message = "";

router.get("/", (req, res) => {
	const param = req.query.param;
	const buffer = message;
	message = "";

	if (param) {
		const filteredOrders = repo.filter(o => o.number === parseInt(param));

		return res.json({ repo: filteredOrders, message: buffer });
	}

	return res.json({ repo, message: buffer });
});

router.post("/", (req, res) => {
	const { startDate, device, problemType, description, client, status } = req.body;
	const newOrder = new Order(repo.length + 1, startDate, device, problemType, description, client, status);

	repo.push(newOrder);
	res.json(newOrder);
});

router.post("/update", (req, res) => {
	const { number, status, description, master, comment } = req.body;

	for (const o of repo) {
		if (o.number === parseInt(number)) {
			let statusMessage = o.updateStatus(status);
			o.updateDetails(description, master);
			o.addComment(comment);
			message += statusMessage;
			return res.json(o);
		}
	}

	return res.json({ code: 404, res: "Заказ не найден!" });
});

export default router;
