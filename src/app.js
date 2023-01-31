import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRoutes from "./routes/poll.routes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use([pollRoutes]);
app.listen(process.env.PORT, () => {
  console.log("server online, on port " + process.env.PORT);
});
