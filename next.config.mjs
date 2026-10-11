import createMDX from "@next/mdx";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Only needed for `next dev`; in build it would open a remote proxy session
// (the KV binding is remote) and require Cloudflare credentials.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

// Mirrored in public/_headers, which covers files served as static assets.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Not fingerprinted, so a replaced image must not stay cached for a year.
        source: "/assets/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
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
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      "remark-mdx-frontmatter",
    ],
    rehypePlugins: [["rehype-pretty-code", rehypeOptions]],
  },
});

export default withMDX(nextConfig);
