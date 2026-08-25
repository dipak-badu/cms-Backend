import express, { type Application } from "express";
import mainRouter from "./router/router";
import ErrorHandler from "./middlewares/ErrorHandlingMiddleware";
import path from "path";
import "./config/mongodbConfig";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "./config/event-congig";
import "./config/sqlConfig";
const app: Application = express();

// CORS configuration
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  }),
);

// XSS protection
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
  }),
);

// throtaling
const rateLimiter = rateLimit({
  limit: 15,
  windowMs: 60 * 1000, // 1 minute
  message: "Too many requests from this IP, please try again after a minute",
});
app.use(rateLimiter);

app.use("/assets", express.static(path.join(process.cwd(), `/public/uploads`)));

app.use(
  express.json({
    limit: "3mb",
  }),
);

app.use(express.urlencoded({ extended: true, limit: "3mb" }));

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
// routing
app.use(mainRouter);
app.use((req, res, next) => {
  next({ code: 404, message: "Not Found" });
});

app.use(ErrorHandler);
export default app;
