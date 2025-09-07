import "@/styles/markdown.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="markdown mx-auto max-w-4xl py-12">{children}</div>;
}
