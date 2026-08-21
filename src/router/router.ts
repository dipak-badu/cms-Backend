import Router from "express";
import authRouter from "./auth.router";
const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.json({
    data: "Welcome to the API",
    message: "success",
    meta: null,
  });
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", authRouter);
export default mainRouter;
