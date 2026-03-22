import { formatDateToDisplay } from '@/utils/date';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ViewCount from './_components/ViewCount';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await import(`@/notes/${slug}.mdx`);

    return {
      title: frontmatter?.title,
      description: frontmatter?.description,
      keywords: [
        ...frontmatter.tags,
        'shinjith',
        'shinjith-dev',
        'shnjd',
        "shinjith's blogs",
      ],
      openGraph: {
        url: 'https://shnjd.com',
        type: 'article',
        title: frontmatter?.title,
        description: frontmatter?.description,
        images: [
          {
            url: frontmatter.cover || `https://shnjd.com/api/og/note/${slug}`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter?.title,
        description: frontmatter?.description,
        creator: '@shnjd_',
        images: [
          {
            url: frontmatter.cover || `https://shnjd.com/api/og/note/${slug}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { default: Blog, frontmatter } = await import(`@/notes/${slug}.mdx`);

    const blogLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',

      headline: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.tags,
      image: frontmatter.cover || `https://shnjd.com/api/og/note/${slug}`,

      url: `https://shnjd.com/on/${slug}`,

      datePublished: frontmatter.date,
      dateModified: frontmatter.updatedAt || frontmatter.date,

      author: {
        '@type': 'Person',
        name: 'Shinjith P R',
        url: 'https://shnjd.com',
      },

      publisher: {
        '@type': 'Organization',
        name: 'shnjd.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://shnjd.com/assets/favicons/apple-touch-icon.png',
        },
      },

      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://shnjd.com/on/${slug}`,
      },
    };

    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
        />
        <h1 className="mt-7 mb-0">{frontmatter.title}</h1>
        <div className="text-subtle! mb-4 flex items-center gap-2 text-sm">
          <p>Added on {formatDateToDisplay(new Date(frontmatter.date))}</p>
          <span>·</span>
          <ViewCount slug={slug} />
        </div>
        <hr className="my-7 border-t" />
        <Blog />
      </article>
    );
  } catch {
    notFound();
  }
}
