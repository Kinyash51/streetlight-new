import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Chapter, Story } from "@/types";

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Story;
}

export async function getChaptersByStorySlug(storySlug: string): Promise<Chapter[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("chapters")
    .select("*, stories!inner(slug)")
    .eq("stories.slug", storySlug)
    .order("chapter_number", { ascending: true });

  if (error || !data) return [];
  return data as Chapter[];
}

export async function getChapterBySlug(storySlug: string, chapterSlug: string): Promise<Chapter | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("chapters")
    .select("*, stories!inner(slug)")
    .eq("stories.slug", storySlug)
    .eq("slug", chapterSlug)
    .single();

  if (error || !data) return null;
  return data as Chapter;
}

export async function getAllStories(): Promise<Story[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Story[];
}
