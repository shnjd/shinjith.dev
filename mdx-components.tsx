import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: (props) => <h1 {...props} className="mb-3 mt-7" />,
  h2: (props) => <h2 {...props} className="mb-3 mt-7" />,
  h3: (props) => <h3 {...props} className="mb-1 mt-7" />,
  h4: (props) => <h4 {...props} className="mb-1 mt-7" />,
  p: (props) => <p {...props} className="my-3" />,
  strong: (props) => <strong {...props} className="my-3" />,
  a: (props) => (
    <a {...props} className="border-b border-current no-underline" />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-l-3 my-5 border-border bg-surface px-4 py-0.5"
    />
  ),
  code: (props) => (
    <code {...props} className="rounded bg-surface px-1 py-0.5" />
  ),
  pre: ({ children, ...props }) => (
    <pre {...props} className="my-6 overflow-x-auto rounded px-4 py-3">
      {typeof children === "object" && "props" in (children as any) ? (
        <code {...(children as any).props} className="bg-transparent p-0" />
      ) : (
        children
      )}
    </pre>
  ),
  ul: (props) => <ul {...props} className="my-3 list-disc pl-5" />,
  ol: (props) => <ol {...props} className="my-3 list-decimal pl-5" />,
  li: (props) => <li {...props} className="my-1" />,
  table: (props) => (
    <table {...props} className="my-5 w-full border-collapse" />
  ),
  th: (props) => (
    <th {...props} className="border border-border px-3 py-2 text-left" />
  ),
  td: (props) => (
    <td {...props} className="border border-border px-3 py-2 text-left" />
  ),
  img: ({ src = "", alt = "", ...props }) => (
    <span className="relative block h-[400px] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="rounded object-cover object-center"
        {...props}
      />
    </span>
  ),
  video: (props) => <video {...props} className="my-5 max-w-full rounded" />,
  hr: (props) => <hr {...props} className="my-7 border-t" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
