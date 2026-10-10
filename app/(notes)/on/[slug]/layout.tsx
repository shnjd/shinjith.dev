import Prose from "@/components/layouts/Prose";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Prose className="mx-auto min-h-[calc(100dvh-52px)] max-w-5xl py-20">
      {children}
    </Prose>
  );
}
