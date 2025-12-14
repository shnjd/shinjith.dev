export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose mx-auto min-h-[calc(100dvh-52px)] max-w-4xl py-20 prose-headings:font-sans prose-headings:text-fg prose-h1:text-3xl prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-semibold prose-p:text-subtle prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-blockquote:border-overlay prose-blockquote:bg-surface/10 prose-blockquote:not-italic prose-blockquote:text-subtle prose-strong:text-fg prose-code:font-mono prose-code:text-fg prose-code:before:hidden prose-code:after:hidden prose-pre:bg-surface/70 prose-pre:text-fg prose-hr:border-border prose-lead:text-fg dark:prose-blockquote:bg-surface/70">
      {children}
    </div>
  );
}
