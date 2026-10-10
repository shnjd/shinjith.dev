// Client-safe (no fs): loads a wiki content file's compiled MDX module,
// by its path under _content without the extension, e.g. "web/index".
export const loadWikiFile = (file: string) => import(`../_content/${file}.mdx`);
