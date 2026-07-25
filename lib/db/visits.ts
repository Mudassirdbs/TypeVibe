"use server";

import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { redis } from "@/lib/db";

const KEY = "total_visits";
const COOKIE_NAME = "typevibe-visit";
const THROTTLE_SECONDS = 120;

// Cached read — revalidates every 300s
export const getVisitCount = unstable_cache(
  async () => {
    if (!redis) return 0;
    try {
      const count = await redis.get<number>(KEY);
      return count ?? 0;
    } catch {
      return 0;
    }
  },
  ["visit-count"],
  { revalidate: 300 }
);

// Server Action — called from client on mount
export async function recordVisit() {
  if (!redis) return;

  try {
    const cookieStore = await cookies();
    const visited = cookieStore.get(COOKIE_NAME);

    if (visited) {
      return;
    }

    cookieStore.set(COOKIE_NAME, "1", {
      maxAge: THROTTLE_SECONDS,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    await redis.incr(KEY);
  } catch {
    /* ignore connection errors when redis is not configured */
  }
}

