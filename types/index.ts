export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  role?: 'user' | 'admin';
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_url: string | null;
  status: 'draft' | 'beta' | 'published' | 'completed';
  word_count: number;
  genre: string;
  created_at: string;
}

export interface Chapter {
  id: string;
  story_id: string;
  title: string;
  slug: string;
  content: string;
  chapter_number: number;
  is_premium: boolean;
  word_count: number;
  created_at: string;
}

export interface ReadingProgress {
  id: string;
  user_id: string;
  story_id: string;
  chapter_id: string;
  progress_percent: number;
  last_read_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  chapter_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_premium: boolean;
  post_type: 'note' | 'cover_reveal' | 'behind_scenes' | 'early_draft' | 'update';
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  item_type: 'chapter' | 'post' | 'book';
  item_id: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_provider: string;
  payment_reference: string | null;
  amount: number;
  currency: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'supporter' | 'forgotten' | 'watcher';
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  billing_period: 'monthly' | 'yearly';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_provider: string;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface UniverseLore {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
}

export type ContentLockStatus = 'free' | 'locked' | 'premium' | 'coming_soon';
