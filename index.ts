import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import mainV1Routes from "./routes/index.route";
import cors from "cors";

dotenv.config();

database.connect();

const app: Express = express();
const port: Number | String = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
