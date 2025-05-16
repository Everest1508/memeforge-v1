// app/og/page.tsx or page.js

import { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: { title?: string } }): Promise<Metadata> {
  const title = searchParams.title || 'My OG Page';

  return {
    title,
    openGraph: {
      images: [`/api/og-image?imageUrl=${encodeURIComponent(title)}`],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og-image?imageUrl=${encodeURIComponent(title)}`],
    },
  };
}

export default function Page({ searchParams }: { searchParams: { title?: string } }) {
  return <div>OG Page Preview for {searchParams.title || 'My OG Page'}</div>;
}
