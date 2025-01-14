// // Querying with "sanityFetch" will keep content automatically updated
// // Before using it, import and render "<SanityLive />" in your layout, see
import "server-only";

import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client"

export const { sanityFetch, SanityLive } = defineLive({ client })