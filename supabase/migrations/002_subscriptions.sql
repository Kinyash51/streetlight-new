-- Subscriptions table for recurring payments
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('supporter', 'forgotten', 'watcher')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'past_due')),
  billing_period text NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  payment_provider text DEFAULT 'intasend',
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tier)
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON public.subscriptions(current_period_end);

CREATE OR REPLACE FUNCTION public.tier_level(tier text)
RETURNS int AS $$
BEGIN
  RETURN CASE tier
    WHEN 'supporter' THEN 1
    WHEN 'forgotten' THEN 2
    WHEN 'watcher' THEN 3
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION public.has_active_subscription(
  p_user_id uuid,
  min_tier text
)
RETURNS boolean AS $$
DECLARE
  user_max_level int;
BEGIN
  SELECT MAX(public.tier_level(tier)) INTO user_max_level
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active'
    AND current_period_end > now();

  RETURN COALESCE(user_max_level, 0) >= public.tier_level(min_tier);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_tier(p_user_id uuid)
RETURNS text AS $$
DECLARE
  user_tier text;
BEGIN
  SELECT tier INTO user_tier
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active'
    AND current_period_end > now()
  ORDER BY public.tier_level(tier) DESC
  LIMIT 1;

  RETURN COALESCE(user_tier, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
