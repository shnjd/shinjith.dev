// Client-safe (no fs): loads a note's compiled MDX module.
export const loadNote = (slug: string) => import(`../_content/${slug}.mdx`);
