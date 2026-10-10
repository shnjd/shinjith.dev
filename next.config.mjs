import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Only needed for `next dev`; in build it would open a remote proxy session
// (the KV binding is remote) and require Cloudflare credentials.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/assets/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

/** @type {import('rehype-pretty-code').Options} */
const rehypeOptions = {
  theme: {
    dark: "catppuccin-mocha",
    light: "catppuccin-latte",
  },
  keepBackground: false,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
    rehypePlugins: [["rehype-pretty-code", rehypeOptions]],
  },
});

export default withMDX(nextConfig);
