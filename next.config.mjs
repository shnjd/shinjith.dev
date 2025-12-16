import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

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
    dark:"catppuccin-mocha",
    light:"catppuccin-latte"
  },
  keepBackground: false,
    filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
};

const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],rehypePlugins:[["rehype-pretty-code",rehypeOptions]] },
});

export default withMDX(nextConfig);

