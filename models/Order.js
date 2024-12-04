export class Order {
	constructor(number, startDate, device, problemType, description, client, status = "Ожидание", endDate = null, master = "Не назначен", comments = []) {
		this.number = number;
		this.startDate = startDate;
		this.device = device;
		this.problemType = problemType;
		this.description = description;
		this.client = client;
		this.status = status;
		this.endDate = endDate;
		this.master = master;
		this.comments = comments;
	}

	updateStatus(newStatus) {
		if (newStatus && newStatus !== this.status) {
			this.status = newStatus;

			return `Статус заявки №${this.number} изменен.\n${newStatus.toLowerCase() === "завершён" ? `Заявка №${this.number} завершена\n` : ""}`;
		} else return null;
	}

	addComment(comment) {
		if (comment) {
			this.comments.push(comment);

			return comment;
		} else return null;
	}

	updateDetails(description, master) {
		if (description) this.description = description;
		if (master) this.master = master;
	}
}
