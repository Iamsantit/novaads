import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const router = Router();
const SECRET = process.env.JWT_SECRET ?? "dev-only-change-me";

const Body = z.object({ email: z.string().email(), password: z.string().min(6) });

/**
 * Simple demo auth. In production, plug in Auth.js / Clerk / Supabase Auth,
 * store hashed passwords (argon2), and issue refresh tokens.
 */
router.post("/login", (req, res) => {
  const p = Body.safeParse(req.body);
  if (!p.success) return res.status(400).json({ error: "invalid" });

  const token = jwt.sign({ email: p.data.email }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

router.post("/signup", (req, res) => {
  const p = Body.safeParse(req.body);
  if (!p.success) return res.status(400).json({ error: "invalid" });
  // TODO: persist user, then issue token.
  const token = jwt.sign({ email: p.data.email }, SECRET, { expiresIn: "7d" });
  res.json({ token });
});

export default router;
