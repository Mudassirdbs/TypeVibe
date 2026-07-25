import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";

const url = env.UPSTASH_REDIS_REST_URL;
const token = env.UPSTASH_REDIS_REST_TOKEN;

export const redis =
  url && token
    ? new Redis({
        url,
        token,
      })
    : null;

