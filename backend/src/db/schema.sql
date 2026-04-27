-- NovaAds — PostgreSQL schema
-- Run once: psql $DATABASE_URL -f src/db/schema.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  full_name      TEXT,
  country        TEXT,
  locale         TEXT DEFAULT 'es-ES',
  stripe_customer_id  TEXT UNIQUE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_sub_id      TEXT UNIQUE NOT NULL,
  plan               TEXT NOT NULL CHECK (plan IN ('basic', 'pro', 'premium')),
  interval           TEXT NOT NULL CHECK (interval IN ('month', 'year')),
  status             TEXT NOT NULL, -- trialing | active | past_due | canceled | unpaid
  trial_end          TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sub_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_sub_status ON subscriptions(status);

CREATE TABLE IF NOT EXISTS generations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt      TEXT NOT NULL,
  brief       JSONB,
  modules     TEXT[] NOT NULL,
  outputs     JSONB NOT NULL DEFAULT '{}'::jsonb,
  tokens_used INTEGER DEFAULT 0,
  cost_usd    NUMERIC(10, 4) DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gen_user_created ON generations(user_id, created_at DESC);

-- Monthly usage counter for rate/quota enforcement
CREATE TABLE IF NOT EXISTS usage_monthly (
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  year_month   TEXT NOT NULL, -- '2026-04'
  generations  INTEGER DEFAULT 0,
  images       INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, year_month)
);
