import { BookCover } from "@/components/reading/BookCover";
import { ChapterList } from "@/components/reading/ChapterList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mainStory, sampleChapters } from "@/lib/data";

export default function StoryPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex justify-center">
            <BookCover title={mainStory.title} subtitle={mainStory.genre} />
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-mono text-streetlight-amber tracking-wider uppercase mb-2">
              {mainStory.status === "beta" ? "Beta Revision" : mainStory.status}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
              {mainStory.title}
            </h1>
            <p className="mt-1 text-sm text-streetlight-gray-dark">
              {mainStory.genre} &bull; {mainStory.word_count.toLocaleString()} words
            </p>
            <p className="mt-4 text-streetlight-gray leading-relaxed">
              {mainStory.description}
            </p>
          </div>
        </div>

        <SectionHeading title="Chapters" />
        <div className="mt-6">
          <ChapterList chapters={sampleChapters} storySlug={mainStory.slug} />
        </div>
      </div>
    </div>
  );
}
