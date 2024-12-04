import { Order } from "../models/Order.js";

export const orders = [
	new Order(1, "10.10.2024", "Ноутбук", "Не заряжается", "Заказан новый аккумулятор", "Сергеев А.В.", "Ждём запчасти"),
	new Order(2, "01.12.2024", "ПК", "Не включается", null, "Ермолаев А.И.", "Ждём когда клиент принесёт устрой"),
	new Order(3, "20.10.2024", "КПК", "Нет изо", "Заменён дисплей", "Иванов И.И.", "Выполнен"),
];

export const getOrders = (req, res) => {
	res.render("orders", { orders: orders });
};

export const createOrder = (req, res) => {
	const { device, client, description, status, problemType } = req.body;
	const newOrder = new Order(orders.length + 1, new Date().toLocaleDateString("ru-RU"), device, problemType, description, client, status);
	orders.push(newOrder);

	res.redirect("/orders");
};

export const updateOrder = (req, res) => {
	const order = orders.find(o => o.id === parseInt(req.params.id));
	if (!order) return res.status(404).send("Заказ не найден");

	const { description, status } = req.body;
	order.description = description || order.description;
	order.status = status || order.status;

	res.redirect("/orders");
};

export const deleteOrder = (req, res) => {
	const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
	if (orderIndex === -1) return res.status(404).send("Заказ не найден");
	if (req.session.user.role !== "admin") return res.status(403).send("Нет прав");

	orders.splice(orderIndex, 1);
	res.redirect("/orders");
};

export const assingMaster = (req, res) => {
	const id = parseInt(req.params.id);
	const order = orders.find(order => order.number === id);
	const { master } = req.body;

	console.log(id, master)

	if (!order) return res.json({ success: false, message: "Заказ не найден" });

	order.master = master;

	return res.json({ success: true, message: "Мастер назначен" });
};
