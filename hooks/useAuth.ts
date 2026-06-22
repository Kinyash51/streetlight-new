"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Profile } from "@/types";
import type { User } from "@supabase/supabase-js";

function profileFromAuthUser(authUser: User, profile?: Profile | null): Profile {
  return {
    id: authUser.id,
    email: profile?.email ?? authUser.email ?? "",
    display_name:
      profile?.display_name ??
      (typeof authUser.user_metadata?.display_name === "string"
        ? authUser.user_metadata.display_name
        : null),
    avatar_url:
      profile?.avatar_url ??
      (typeof authUser.user_metadata?.avatar_url === "string"
        ? authUser.user_metadata.avatar_url
        : null),
    created_at: profile?.created_at ?? authUser.created_at,
    role: profile?.role,
  };
}

export function useAuth() {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadProfile = async (authUser: User) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();

      setUser(profileFromAuthUser(authUser, profile));
    };

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(profileFromAuthUser(session.user));
        setLoading(false);
        loadProfile(session.user).catch(() => {
          setUser(profileFromAuthUser(session.user));
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(profileFromAuthUser(session.user));
          setLoading(false);
          loadProfile(session.user).catch(() => {
            setUser(profileFromAuthUser(session.user));
          });
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, signOut };
}
