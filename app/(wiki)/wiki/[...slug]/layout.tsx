import Prose from "@/components/layouts/Prose";
import { getWikiTree } from "@/app/(wiki)/_lib/wiki";
import WikiSidebar from "@/app/(wiki)/_components/WikiSidebar";

export default async function WikiPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = await getWikiTree();

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-52px)] max-w-6xl flex-col gap-12 py-20 lg:flex-row">
      <Prose className="max-w-none min-w-0 flex-1">{children}</Prose>
      <WikiSidebar
        tree={tree}
        className="shrink-0 self-start lg:sticky lg:top-20 lg:order-first lg:max-h-[calc(100dvh-7rem)] lg:w-60 lg:overflow-y-auto"
      />
    </div>
  );
}
