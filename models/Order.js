export class Order {
	constructor(number, startDate, device, problemType, description, client, status = "Не выполнено", endDate = null, master = "Не назначен", comments = []) {
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

	/**
	 * Обновляет статус заявки
	 *
	 * @param {string} newStatus - Новый статус
	 * @returns {string | null} - Сообщение об изменении статуса или null, если статус не изменился
	 */
	updateStatus(newStatus) {
		if (newStatus && newStatus !== this.status) {
			this.status = newStatus;

			return `Статус заявки №${this.number} изменен.\n${newStatus.toLowerCase() === "выполнено" ? `Заявка №${this.number} завершена\n` : ""}`;
		} else return null;
	}

	/**
	 * Добавляет комментарий к заявке
	 *
	 * @param {string} comment - Комментарий который будет добавлен в список комментариев
	 * @returns {string | null} - Возвращает сам комментарий при успешном добавлении или null если возникла ошибка
	 */
	addComment(comment) {
		if (comment) {
			this.comments.push(comment);

			return comment;
		} else return null;
	}

	/**
	 * Обновляет информацию в заявке
	 *
	 * @param {string} [description] - Новое описание заявки
	 * @param {string} [master] - Новый мастер, назначенный на заявку
	 */
	updateDetails(description, master) {
		if (description) this.description = description;
		if (master) this.master = master;
	}
}
