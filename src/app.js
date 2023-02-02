import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/poll.routes.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import choiceRoutes from "./routes/choice.routes.js";
// const data = new Date();
// const dataAtual = new Date(data.setHours(data.getHours() - 3));

// const trintadias = new Date(dataAtual.setDate(dataAtual.getDate() + 30));

// console.log(trintadias);
const app = express();

app.use(express.json());
app.use(cors());
app.use([pollRoutes, choiceRoutes]);

app.listen(process.env.PORT, () => {
  console.log("server online, on port " + process.env.PORT);
});
