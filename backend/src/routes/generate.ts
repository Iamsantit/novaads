import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireSubscription, type AuthedRequest } from "../middleware/auth";
import { orchestrate, MODULES } from "../services/orchestrator";

const router = Router();

const Body = z.object({
  prompt: z.string().min(8).max(2000),
  modules: z.array(z.enum(MODULES)).optional(),
  locale: z.string().optional() // e.g. "es-MX"
});

/**
 * POST /api/generate
 * Runs the full multi-agent pipeline from a single prompt.
 * Streams results with Server-Sent Events so the UI can update per-module.
 */
router.post("/", requireAuth, requireSubscription, async (req: AuthedRequest, res) => {
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_payload" });

  const { prompt, modules, locale } = parsed.data;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const send = (event: string, data: unknown) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    await orchestrate({
      prompt,
      modules: modules ?? [...MODULES],
      locale: locale ?? "es-ES",
      user: req.user,
      onModuleStart: (m) => send("module_start", { module: m }),
      onModuleDone: (m, payload, provider) =>
        send("module_done", { module: m, payload, provider }),
      onError: (m, err) => send("module_error", { module: m, error: err })
    });
    send("complete", { ok: true });
    res.end();
  } catch (err) {
    send("fatal", { error: (err as Error).message });
    res.end();
  }
});

export default router;
