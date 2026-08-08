import express, { type Application } from "express";
import mainRouter from "./router/router";
import ErrorHandler from "./middlewares/ErrorHandlingMiddleware";
import path from "path";
import "./config/mongodbConfig";
const app: Application = express();

app.use("/assets", express.static(path.join(process.cwd(), `/public/uploads`)));

app.use(
  express.json({
    limit: "3mb",
  }),
);

app.use(express.urlencoded({ extended: true, limit: "3mb" }));

// routing
app.use(mainRouter);
app.use((req, res, next) => {
  next({ code: 404, message: "Not Found" });
});

app.use(ErrorHandler);
export default app;
