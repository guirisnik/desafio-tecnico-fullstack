import { config } from "dotenv";
import * as express from "express";
import * as cors from "cors";
import AuthController from "./auth/auth.controller";
import { authorizationMiddleware } from "./auth/auth.middleware";
import CardsController from "./cards/cards.controller";
import { Card } from "./cards/cards.dto";
import { sequelize } from "./infrastructure/database";

config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(AuthController);
app.use(authorizationMiddleware);
app.use(CardsController);

app.listen(process.env.PORT || 5000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
    await Card.sync();
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});
