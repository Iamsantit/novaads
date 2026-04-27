import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AuthedRequest = Request & { user?: { email: string; plan?: string } };

const SECRET = process.env.JWT_SECRET ?? "dev-only-change-me";

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "missing_token" });
  }
  try {
    const decoded = jwt.verify(header.slice(7), SECRET) as { email: string; plan?: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}

/**
 * Gate features behind trial/active subscription status.
 * Looks up the user's Stripe subscription status in your DB.
 */
export function requireSubscription(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  // TODO: query DB for user subscription status.
  // Accept: "trialing", "active". Reject: "past_due", "canceled", "unpaid", missing.
  const allowed = ["trialing", "active"];
  const status = (req as any).subscriptionStatus ?? "trialing";
  if (!allowed.includes(status)) {
    return res.status(402).json({
      error: "subscription_required",
      message: "Tu prueba o suscripción no está activa."
    });
  }
  next();
}
