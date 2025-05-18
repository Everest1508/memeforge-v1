import type { Metadata } from 'next';

export function generateMetadata({ searchParams }: { searchParams: { url?: string } }): Metadata {
  const title = 'Meme Creator';
  const imageUrl = searchParams.url || 'https://memeforge.lol/images/1.svg';

  return {
    title,
    openGraph: {
      title,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      images: [imageUrl],
    },
  };
}
