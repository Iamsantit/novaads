import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import stripeRouter, { webhookHandler } from "./routes/stripe";
import generateRouter from "./routes/generate";
import authRouter from "./routes/auth";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

// Stripe webhooks need the raw body BEFORE json middleware.
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.use(
  rateLimit({
    windowMs: 60_000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/health", (_req, res) => res.json({ ok: true, service: "novaads-api" }));

app.use("/api/auth", authRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/generate", generateRouter);

// Global error handler.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[error]", err);
  const message = err instanceof Error ? err.message : "internal error";
  res.status(500).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`🚀 NovaAds API listening on :${PORT}`);
});
