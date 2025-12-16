import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function POST(_req: NextRequest, ctx: any) {
  const { slug } = await ctx.params;

  const CONTENT_VIEWS = getCloudflareContext().env.CONTENT_VIEWS;
  console.log(slug, CONTENT_VIEWS);

  const currentViews = (await CONTENT_VIEWS.get(slug)) || "0";
  const newViews = parseInt(currentViews) + 1;

  await CONTENT_VIEWS.put(slug, newViews.toString());

  return Response.json(
    { views: newViews },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    },
  );
}

export async function GET(_req: NextRequest, ctx: any) {
  const { slug } = await ctx.params;
  const CONTENT_VIEWS = getCloudflareContext().env.CONTENT_VIEWS;
  console.log(slug, CONTENT_VIEWS);

  const views = (await CONTENT_VIEWS.get(slug)) || "0";
  return Response.json({ views: parseInt(views) });
}
