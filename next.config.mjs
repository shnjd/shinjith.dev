import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images:{
      remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
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

const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter","remark-code-title"] },
});

export default withMDX(nextConfig);
