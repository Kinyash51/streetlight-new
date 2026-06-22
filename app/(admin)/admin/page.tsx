import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookOpen, FileText, Users, ShoppingBag, Lock, Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const isAdmin = false;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Lock size={48} className="mx-auto text-streetlight-gray-dark mb-4" />
          <h1 className="text-2xl font-bold text-white">Admin Access Required</h1>
          <p className="mt-2 text-streetlight-gray">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const adminSections = [
    { icon: BookOpen, title: "Stories", desc: "Manage stories and metadata", count: 1 },
    { icon: FileText, title: "Chapters", desc: "Edit chapters and content", count: 3 },
    { icon: FileText, title: "Posts", desc: "Blog posts and updates", count: 0 },
    { icon: Users, title: "Users", desc: "Registered readers", count: 0 },
    { icon: ShoppingBag, title: "Purchases", desc: "Payment and access logs", count: 0 },
    { icon: Settings, title: "Settings", desc: "App configuration", count: null },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Admin Dashboard" subtitle="Manage Streetlight content and readers" />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="p-6 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50 hover:border-streetlight-amber/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-streetlight-amber/10 flex items-center justify-center">
                    <Icon size={20} className="text-streetlight-amber" />
                  </div>
                  {section.count !== null && (
                    <span className="text-2xl font-bold text-white">{section.count}</span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{section.title}</h3>
                <p className="mt-1 text-sm text-streetlight-gray">{section.desc}</p>
                <p className="mt-4 text-xs text-streetlight-gray-dark font-mono">
                  Placeholder &mdash; actions coming soon
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
