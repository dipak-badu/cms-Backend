import express, { type Application } from "express";
import mainRouter from "./router/router";
const app: Application = express();

// routing
app.use(mainRouter);

export default app;
