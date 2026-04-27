import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export const runtime = "nodejs";

/**
 * Stripe Webhook endpoint.
 * Point your Stripe CLI here:
 *   stripe listen --forward-to http://localhost:4321/api/stripe/webhook
 * In production, create a Webhook Endpoint in Stripe dashboard and paste
 * its signing secret into STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: "stripe_not_configured" }, { status: 500 });

  const sig = req.headers.get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const raw = Buffer.from(await req.arrayBuffer());
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err) {
    return NextResponse.json(
      { error: "invalid_signature", detail: (err as Error).message },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe] checkout completed", s.customer_email, s.metadata);
      // TODO: upsert user + subscription in your DB.
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      console.log("[stripe] subscription", sub.id, sub.status);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log("[stripe] subscription canceled", sub.id);
      break;
    }
    case "invoice.payment_failed": {
      const inv = event.data.object as Stripe.Invoice;
      console.log("[stripe] payment failed", inv.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
