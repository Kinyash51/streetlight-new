import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { hasContentAccess, getUserTier, type UserTier } from "@/lib/purchases";
import { ChapterReader } from "@/components/reading/ChapterReader";
import { Paywall } from "@/components/reading/Paywall";
import { sampleChapters } from "@/lib/data";

export const dynamic = "force-dynamic";

const CONTENT_REQUIREMENTS: Record<string, { tier: UserTier; message: string }> = {
  "chapter-3": {
    tier: "supporter",
    message: "This chapter is available to Supporters and above.",
  },
};

export default async function ChapterPage() {
  const storySlug = "the-drowned-streetlamp";
  const chapterSlug = "chapter-3";

  const chapter = sampleChapters.find((item) => item.slug === chapterSlug);
  if (!chapter) notFound();

  const currentIndex = sampleChapters.findIndex((item) => item.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? sampleChapters[currentIndex - 1] : undefined;
  const nextChapter =
    currentIndex < sampleChapters.length - 1 ? sampleChapters[currentIndex + 1] : undefined;

  const requirement = CONTENT_REQUIREMENTS[chapterSlug];
  const requiredTier = requirement?.tier ?? "supporter";
  const upgradeMessage = requirement?.message ?? "This chapter is available to subscribers.";

  let hasAccess = !chapter.is_premium;
  let userTier: UserTier = "free";

  if (chapter.is_premium) {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      userTier = await getUserTier(session.user.id);
      hasAccess = await hasContentAccess(
        session.user.id,
        "chapter",
        chapter.id,
        requiredTier
      );
    }
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen pt-20 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <p className="text-sm font-mono text-streetlight-amber mb-2 tracking-wider uppercase">
              Chapter {chapter.chapter_number}
            </p>
            <h1 className="text-3xl font-serif font-bold text-white">{chapter.title}</h1>
          </header>
          <Paywall
            itemType="chapter"
            itemId={chapter.id}
            itemName={chapter.title}
            storySlug={storySlug}
            userTier={userTier}
            requiredTier={requiredTier}
            upgradeMessage={upgradeMessage}
          />
        </div>
      </div>
    );
  }

  return (
    <ChapterReader
      chapter={chapter}
      prevChapter={prevChapter ? { slug: prevChapter.slug, title: prevChapter.title } : undefined}
      nextChapter={nextChapter ? { slug: nextChapter.slug, title: nextChapter.title } : undefined}
      storySlug={storySlug}
      totalChapters={sampleChapters.length}
    />
  );
}
