import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ReadingProgressCard } from "@/components/dashboard/ReadingProgressCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookOpen, Bookmark, Clock, Crown } from "lucide-react";
import { sampleChapters } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  // Placeholder stats — will be dynamic once reading progress is tracked
  const stats = [
    { title: "Chapters Read", value: 2, icon: BookOpen, color: "amber" as const },
    { title: "Bookmarks", value: 0, icon: Bookmark, color: "cyan" as const },
    { title: "Reading Time", value: "12 min", icon: Clock, color: "gray" as const },
    { title: "Premium", value: "0", icon: Crown, color: "amber" as const },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm font-mono text-streetlight-amber tracking-wider uppercase mb-2">
            Reader Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Welcome back, {profile?.display_name || "Reader"}
          </h1>
          <p className="mt-2 text-streetlight-gray">
            The city remembers those who walk through its stories.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} {...stat} index={i} />
          ))}
        </div>

        {/* Continue Reading */}
        <div className="mb-10">
          <SectionHeading title="Continue Reading" />
          <div className="mt-6 max-w-xl">
            <ReadingProgressCard
              storyTitle="The Drowned Streetlamp"
              chapterTitle="The Echo"
              progress={65}
              storySlug="the-drowned-streetlamp"
              chapterSlug="chapter-2"
              lastRead="2 days ago"
            />
          </div>
        </div>

        {/* Saved Stories */}
        <div className="mb-10">
          <SectionHeading title="Saved Stories" />
          <div className="mt-6 p-8 rounded-xl border border-dashed border-streetlight-gray-dark/30 text-center">
            <BookOpen size={32} className="mx-auto text-streetlight-gray-dark mb-3" />
            <p className="text-streetlight-gray">
              No saved stories yet. Start reading to build your library.
            </p>
            <Link
              href="/read"
              className="inline-block mt-4 text-sm text-streetlight-amber hover:text-amber-400 transition-colors"
            >
              Browse Stories &rarr;
            </Link>
          </div>
        </div>

        {/* Latest Updates */}
        <div className="mb-10">
          <SectionHeading title="Latest Updates" />
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-streetlight-amber" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Chapter 2: The Echo — Now Available
                  </p>
                  <p className="text-xs text-streetlight-gray-dark mt-1">
                    Elias discovers the device and the woman in the gray coat.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-streetlight-cyan" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Universe Page Launched
                  </p>
                  <p className="text-xs text-streetlight-gray-dark mt-1">
                    Explore the lore of The City, The Forgotten, The Ghosts, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Content Placeholder */}
        <div>
          <SectionHeading title="Premium Content" />
          <div className="mt-6 p-8 rounded-xl border border-streetlight-amber/20 bg-streetlight-amber/5 text-center">
            <Crown size={32} className="mx-auto text-streetlight-amber mb-3" />
            <p className="text-streetlight-gray">
              Premium chapters and exclusive content coming soon.
            </p>
            <p className="mt-2 text-xs text-streetlight-gray-dark">
              Support the story and unlock behind-the-scenes content, early drafts, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
