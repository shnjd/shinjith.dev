import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(_req: NextRequest, ctx: any) {
  const { slug } = await ctx.params;

  try {
    const { frontmatter } = await import(`@/notes/${slug}.mdx`);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundImage: "linear-gradient(to right, #000000, #2D3436)",
          }}
        >
          <h1
            style={{
              padding: 120,
              fontSize: 60,
              fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {frontmatter.title}
          </h1>
          <p
            style={{
              position: "absolute",
              top: 8,
              right: 20,
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            https://shinjith.dev
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Outfit",
            data: await loadGoogleFont("Outfit", frontmatter.title),
            style: "normal",
          },
          {
            name: "Outfit",
            data: await loadGoogleFont("Outfit", "https://shinjith.dev"),
            style: "normal",
          },
        ],
      },
    );
  } catch {
    notFound();
  }
}
