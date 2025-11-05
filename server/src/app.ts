import express from "express";
import cors from "cors";
import morgan from "morgan";
import { userRoutes } from "./modules/user/user.routes.js";
import { shopRoutes } from "./modules/shop/shop.routes.js";

const app: express.Application = express();

// ── Middlewares ──
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// ── Routes ──
app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);

export default app;
