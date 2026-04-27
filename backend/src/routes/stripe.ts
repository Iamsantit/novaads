import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2024-06-20"
});

const router = Router();

const PRICE_MAP: Record<string, { month?: string; year?: string }> = {
  basic: {
    month: process.env.STRIPE_PRICE_BASIC_MONTH,
    year: process.env.STRIPE_PRICE_BASIC_YEAR
  },
  pro: {
    month: process.env.STRIPE_PRICE_PRO_MONTH,
    year: process.env.STRIPE_PRICE_PRO_YEAR
  },
  premium: {
    month: process.env.STRIPE_PRICE_PREMIUM_MONTH,
    year: process.env.STRIPE_PRICE_PREMIUM_YEAR
  }
};

const CheckoutSchema = z.object({
  plan: z.enum(["basic", "pro", "premium"]),
  interval: z.enum(["month", "year"]),
  email: z.string().email().optional()
});

/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout session with 14-day trial.
 * Card is required so silent conversion works after trial ends.
 */
router.post("/checkout", async (req: Request, res: Response) => {
  const parsed = CheckoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_payload", detail: parsed.error.flatten() });
  }

  const { plan, interval, email } = parsed.data;
  const priceId = PRICE_MAP[plan]?.[interval];

  if (!priceId) {
    return res.status(400).json({ error: "price_not_configured", plan, interval });
  }

  const successUrl = `${process.env.FRONTEND_URL}/dashboard?welcome=1&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.FRONTEND_URL}/#pricing`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: {
        trial_period_days: 14,
        trial_settings: {
          end_behavior: { missing_payment_method: "cancel" }
        }
      },
      payment_method_collection: "always",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { plan, interval }
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("[stripe:checkout]", err);
    res.status(500).json({ error: "stripe_error" });
  }
});

/**
 * POST /api/stripe/portal
 * Opens customer billing portal for cancellations, card updates, etc.
 */
router.post("/portal", async (req: Request, res: Response) => {
  const { customerId } = req.body as { customerId?: string };
  if (!customerId) return res.status(400).json({ error: "missing_customer" });

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard`
    });
    res.json({ url: portal.url });
  } catch (err) {
    res.status(500).json({ error: "portal_error" });
  }
});

/**
 * Raw-body webhook handler (mounted in index.ts before express.json).
 */
export async function webhookHandler(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) return res.status(400).send("missing signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error("[stripe:webhook] signature error", err);
    return res.status(400).send(`webhook error: ${(err as Error).message}`);
  }

  // Handle the events that matter for gating access.
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: upsert user, set status = "trialing", store customerId.
      console.log("[stripe] checkout completed for", session.customer_email);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      // TODO: persist sub.status ("trialing" | "active" | "past_due" | ...)
      console.log("[stripe] subscription", sub.id, sub.status);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // TODO: revoke access.
      console.log("[stripe] subscription canceled", sub.id);
      break;
    }
    case "invoice.payment_failed": {
      const inv = event.data.object as Stripe.Invoice;
      // TODO: email user, flag account.
      console.log("[stripe] payment failed", inv.id);
      break;
    }
    default:
      // ignore unrelated events
      break;
  }

  res.json({ received: true });
}

export default router;
