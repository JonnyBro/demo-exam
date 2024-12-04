/**
 * Считает количество выполненных заказов в репозитории
 *
 * @param {Order[]} repo - Репозиторий заказов
 * @returns {number} - Количество завершенных заказов
 */
export function countCompleted(repo) {
	return repo.filter(o => o.status.toLowerCase() === "выполнено").length;
}

/**
 * Возвращает статистику по типам проблем в репозитории
 *
 * @param {Order[]} repo - Репозиторий заказов
 * @returns {{ problemType: number }} - Объект с типами проблем и их количеством
 */
export function getProblemTypeStat(repo) {
	const dict = {};

	for (const o of repo) {
		dict[o.problemType] = (dict[o.problemType] || 0) + 1;
	}

	return dict;
}

/**
 * Возвращает среднее время, затраченное на завершение заказов в репозитори
 *
 * @param {Order[]} repo - Репозиторий заказов
 * @returns {number} - Среднее время (в днях)
 */
export function getAverageTimeToComplete(repo) {
	const times = repo
		.filter(o => o.status.toLowerCase() === "выполнено" && o.endDate)
		.map(o => {
			const endDate = new Date(o.endDate);
			const startDate = new Date(o.startDate);

			return (endDate - startDate) / (1000 * 60 * 60 * 24);
		});

	return times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
}
