CREATE TABLE IF NOT EXISTS device_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT UNIQUE NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_id TEXT NULL,
  ua TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS notification_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  study_id TEXT,
  segment JSONB,
  throttle_per_minute INTEGER DEFAULT 60,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  url TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL,
  subscription_id UUID,
  status TEXT NOT NULL,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
