import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/poll.routes.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import choiceRoutes from "./routes/choice.routes.js";

const app = express();

//
// dayjs.extend(utc);

// const hj = dayjs.utc().local().format("YYYY-MM-DD HH:mm");
// const dataValida = dayjs(hj).isBefore(
//   dayjs(2023 - 12 - 31, "month").format("YYYY-MM-DD HH:mm")
// );

// console.log(dataValida, `hoje: ${hj}`);

//
app.use(express.json());
app.use(cors());
app.use([pollRoutes, choiceRoutes]);

app.listen(process.env.PORT, () => {
  console.log("server online, on port " + process.env.PORT);
});
