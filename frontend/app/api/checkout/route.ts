import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICE_MAP, FALLBACK_PRICES, type PlanId, type Interval } from "@/lib/stripe";

export const runtime = "nodejs";

const PLANS = ["basic", "pro", "premium"] as const;
const INTERVALS = ["month", "year"] as const;

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const { searchParams } = new URL(req.url);

  const plan = (searchParams.get("plan") ?? "pro") as PlanId;
  const interval = (searchParams.get("interval") ?? "month") as Interval;

  // Validate
  if (!PLANS.includes(plan as any) || !INTERVALS.includes(interval as any)) {
    return NextResponse.redirect(`${origin}/#pricing`, 303);
  }

  // Missing Stripe secret → stay on pricing with a friendly notice
  if (!stripe) {
    return NextResponse.redirect(`${origin}/#pricing?no_stripe=1`, 303);
  }

  const successUrl = `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/#pricing?canceled=1`;

  try {
    const priceId = PRICE_MAP[plan]?.[interval];

    const lineItem = priceId
      ? { price: priceId, quantity: 1 }
      : {
          // Inline fallback — lets you test checkout even before creating real Stripe Products.
          price_data: {
            currency: "usd",
            product_data: { name: FALLBACK_PRICES[plan][interval].name },
            unit_amount: FALLBACK_PRICES[plan][interval].amount,
            recurring: { interval }
          },
          quantity: 1
        };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [lineItem as any],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      payment_method_collection: "always",
      subscription_data: {
        trial_period_days: 14,
        trial_settings: {
          end_behavior: { missing_payment_method: "cancel" }
        },
        metadata: { plan, interval }
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { plan, interval }
    });

    if (!session.url) throw new Error("no_session_url");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[checkout]", err);
    const msg = encodeURIComponent((err as Error).message || "unknown");
    return NextResponse.redirect(`${origin}/#pricing?err=${msg}`, 303);
  }
}
