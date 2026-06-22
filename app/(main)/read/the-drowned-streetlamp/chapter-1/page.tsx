import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { hasPurchased } from "@/lib/purchases";
import { ChapterReader } from "@/components/reading/ChapterReader";
import { Paywall } from "@/components/reading/Paywall";
import { sampleChapters } from "@/lib/data";

export const revalidate = 300;

export default async function ChapterPage() {
  const storySlug = "the-drowned-streetlamp";
  const chapterSlug = "chapter-1";

  const chapter = sampleChapters.find((item) => item.slug === chapterSlug);
  if (!chapter) notFound();

  const chapters = sampleChapters;
  const currentIndex = chapters.findIndex((c) => c.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : undefined;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : undefined;

  // Check if user has access to premium content
  let hasAccess = !chapter.is_premium;

  if (chapter.is_premium) {
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      hasAccess = await hasPurchased(session.user.id, "chapter", chapter.id);
    }
  }

  // If no access, show paywall instead of content
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
      totalChapters={chapters.length}
    />
  );
}
