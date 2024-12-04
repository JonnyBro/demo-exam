const baseUrl = `http://localhost:3000`;

async function fetchOrders() {
	const ordersList = document.getElementById("orders");

	ordersList.innerHTML = "Ожидаем ответ от сервера...";

	const response = await fetch(`${baseUrl}/orders`);
	const data = await response.json();

	ordersList.innerHTML = "";

	data.repo.forEach(order => {
		const listItem = document.createElement("li");

		listItem.innerHTML = `
		<strong>Заявка #${order.number}</strong><br>
		Устройство: ${order.device}<br>
		Статус: ${order.status}<br>
		Описание: ${order.description.replace(/\n/g, "<br>")}<br>
		Дата приёма заказа: ${order.startDate}<br>
		Клиент: ${order.client}<br>`;

		ordersList.appendChild(listItem);
	});
}

async function addOrder(event) {
	event.preventDefault();

	const order = {
		startDate: document.getElementById("startDate").value,
		device: document.getElementById("device").value,
		problemType: document.getElementById("problemType").value,
		description: document.getElementById("description").value,
		client: document.getElementById("client").value,
		status: document.getElementById("status").value,
	};

	await fetch(`${baseUrl}/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(order),
	});

	document.getElementById("add-order-form").reset();
	fetchOrders();
}

document.getElementById("toggle-api-description").addEventListener("click", () => {
	const apiDetails = document.getElementById("api-details");
	const isHidden = apiDetails.style.display === "none";
	const text = this.textContent;

	if (isHidden) {
		apiDetails.style.display = "block";
		document.getElementById("toggle-api-description").textContent = "Скрыть";
	} else {
		apiDetails.style.display = "none";
		document.getElementById("toggle-api-description").textContent = "Показать";
	}
});


document.getElementById("add-order-form").addEventListener("submit", addOrder);

fetchOrders();
