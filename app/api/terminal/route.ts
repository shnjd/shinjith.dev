import { getNoteSlugs } from "@/app/(notes)/_lib/notes";
import { getWikiFiles } from "@/app/(wiki)/_lib/wiki";

// Content listing for the terminal's filesystem, built once at build time
// (the content is read from disk, which Workers can't do per request).
export const dynamic = "force-static";

export type TerminalManifest = {
  notes: string[];
  wiki: string[];
};

export function GET() {
  const manifest: TerminalManifest = {
    notes: getNoteSlugs(),
    wiki: getWikiFiles(),
  };
  return Response.json(manifest);
}
