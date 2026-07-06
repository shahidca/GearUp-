import express, { type Application, type Request, type Response } from "express";
import cors from "cors";

import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: " GearUp API is running successfully.",
  });
});

// API Routes
app.use("/api", router);

// Not Found
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;