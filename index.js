import express, { urlencoded, json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import ordersRouter from "./routes/orders.js";
import statsRouter from "./routes/stats.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/orders", ordersRouter);
app.use("/statistics", statsRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
