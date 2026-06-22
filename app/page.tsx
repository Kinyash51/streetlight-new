"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookCover } from "@/components/reading/BookCover";
import { mainStory, betaReaderNotes } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-streetlight-black via-streetlight-charcoal to-streetlight-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-streetlight-amber/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-streetlight-cyan/5 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-streetlight-amber/10 border border-streetlight-amber/20 text-streetlight-amber text-sm font-medium mb-8"
            >
              <Sparkles size={14} />
              <span>Urban Noir Fiction Universe</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">
              Streetlight
            </h1>

            {/* Tagline */}
            <p className="mt-6 text-xl md:text-2xl text-streetlight-gray font-light italic max-w-2xl mx-auto leading-relaxed">
              The city never sleeps. It only changes who it watches.
            </p>

            {/* Description */}
            <p className="mt-4 text-streetlight-gray-dark max-w-xl mx-auto leading-relaxed">
              Enter a rain-soaked urban noir universe of forgotten people, hidden
              systems, and stories buried beneath neon light.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/read/the-drowned-streetlamp/chapter-1" variant="primary" size="lg">
                <BookOpen size={18} />
                Start Reading
              </Button>
              <Button href="/signup" variant="outline" size="lg">
                Join the City
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-streetlight-gray-dark/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-streetlight-amber"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Book Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <BookCover
                title="The Drowned Streetlamp"
                subtitle="An urban noir story of survival, secrets, and the city that watches"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-sm font-mono text-streetlight-amber tracking-wider uppercase mb-3">
                Featured Story
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                The Drowned Streetlamp
              </h2>
              <p className="mt-2 text-sm text-streetlight-gray-dark">
                {mainStory.genre} &bull; {mainStory.word_count.toLocaleString()} words
              </p>
              <p className="mt-6 text-streetlight-gray leading-relaxed">
                {mainStory.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/read/the-drowned-streetlamp/chapter-1" variant="primary">
                  <BookOpen size={16} />
                  Read Sample
                </Button>
                <Button href="/book" variant="outline">
                  View Details
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Universe Preview */}
      <section className="py-24 px-4 bg-streetlight-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="The Universe"
            subtitle="A world built from rain, neon, and the spaces between what the city remembers and what it forgets."
            centered
          />

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The City",
                desc: "A rain-soaked metropolis where neon hides hunger, secrets, and forgotten lives.",
              },
              {
                title: "The Forgotten",
                desc: "People who survive in the margins, unseen by the systems built above them.",
              },
              {
                title: "The Ghosts",
                desc: "A whispered presence known for watching, tracking, and appearing where they should not be.",
              },
              {
                title: "The Echo",
                desc: "A mysterious device that becomes the first thread pulling Elias into the city's hidden machinery.",
              },
              {
                title: "The Underground",
                desc: "The hidden world beneath the visible city, where information and survival move quietly.",
              },
              {
                title: "The Story",
                desc: "Elias, a nameless teenager, discovers that being unseen is both a shield and a prison.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-black/50 hover:border-streetlight-amber/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-streetlight-amber transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-streetlight-gray leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/universe" variant="ghost">
              Explore the Universe
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Reader Community Preview */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Reader Community"
            subtitle="Streetlight is still growing. This is the place for early readers, beta readers, supporters, and anyone who wants to follow the universe from the beginning."
            centered
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Early Readers",
                desc: "Join the first wave of readers discovering the universe as it unfolds.",
              },
              {
                icon: Sparkles,
                title: "Beta Feedback",
                desc: "Help shape the story with your thoughts, theories, and reactions.",
              },
              {
                icon: Mail,
                title: "Updates",
                desc: "Get notified when new chapters, lore, and behind-the-scenes content drops.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-8 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30"
                >
                  <div className="w-12 h-12 mx-auto rounded-lg bg-streetlight-amber/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-streetlight-amber" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-streetlight-gray leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button href="/community" variant="secondary">
              Join the Community
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Beta Reader Notes */}
      <section className="py-24 px-4 bg-streetlight-charcoal/30">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="From Beta Readers"
            subtitle="Early impressions from the first readers to enter the city."
            centered
          />

          <div className="mt-12 space-y-6">
            {betaReaderNotes.map((note, i) => (
              <motion.blockquote
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border-l-2 border-streetlight-amber bg-streetlight-black/50"
              >
                <p className="text-streetlight-gray italic leading-relaxed">
                  &ldquo;{note.note}&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-streetlight-amber/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-streetlight-amber">
                      {note.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{note.name}</p>
                    <p className="text-xs text-streetlight-gray-dark">{note.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              The city is waiting.
            </h2>
            <p className="mt-4 text-streetlight-gray max-w-lg mx-auto">
              New chapters, lore expansions, and behind-the-scenes content are on
              the way. Be the first to know when the next part of the story drops.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full sm:flex-1 px-4 py-3 bg-streetlight-surface border border-streetlight-gray-dark/30 rounded-lg text-white placeholder-streetlight-gray-dark focus:outline-none focus:border-streetlight-amber/50 focus:ring-1 focus:ring-streetlight-amber/50 transition-all"
              />
              <Button variant="primary" className="w-full sm:w-auto whitespace-nowrap">
                <Mail size={16} />
                Subscribe
              </Button>
            </div>
            <p className="mt-3 text-xs text-streetlight-gray-dark">
              No spam. Unsubscribe anytime. Newsletter launching soon.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
