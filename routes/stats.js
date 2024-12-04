import express from "express";
import { countCompleted, getProblemTypeStat, getAverageTimeToComplete } from "../utils/helpers.js";
import { orders } from "../controllers/orders.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		complete_count: countCompleted(orders),
		problem_type_stat: getProblemTypeStat(orders),
		average_time_to_complete: getAverageTimeToComplete(orders),
	});
});

export default router;
