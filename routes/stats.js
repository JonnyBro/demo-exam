import express from "express";
import { countCompleted, getProblemTypeStat, getAverageTimeToComplete } from "../utils/helpers.js";
import { repo } from "./orders.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		complete_count: countCompleted(repo),
		problem_type_stat: getProblemTypeStat(repo),
		average_time_to_complete: getAverageTimeToComplete(repo),
	});
});

export default router;
