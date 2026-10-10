import Prose from "@/components/layouts/Prose";
import { getWikiTree } from "@/app/(wiki)/_lib/wiki";
import WikiSidebar from "@/app/(wiki)/_components/WikiSidebar";
import WikiToc from "@/app/(wiki)/_components/WikiToc";

const CONTENT_ID = "wiki-content";
const aside =
  "sticky top-20 max-h-[calc(100dvh-6rem)] w-56 shrink-0 self-start overflow-y-auto";

export default async function WikiPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = await getWikiTree();

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-52px)] w-full max-w-7xl gap-6 py-20">
      <WikiSidebar tree={tree} className={`${aside} hidden lg:block`} />
      <div className="flex min-w-0 flex-1 justify-center">
        <div className="w-full max-w-3xl min-w-0">
          <details className="border-border mb-6 rounded-md border text-sm lg:hidden">
            <summary className="text-fg cursor-pointer px-3 py-2 font-medium">
              Wiki menu
            </summary>
            <WikiSidebar tree={tree} className="px-2 pb-3" />
          </details>
          <Prose id={CONTENT_ID} className="max-w-none">
            {children}
          </Prose>
        </div>
      </div>
      {/* Always reserve the TOC column so the content stays centered. */}
      <div className={`${aside} hidden xl:block`}>
        <WikiToc contentId={CONTENT_ID} />
      </div>
    </div>
  );
}
