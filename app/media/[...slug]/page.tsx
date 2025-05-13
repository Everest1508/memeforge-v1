import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string[] };
}

async function getMedia(slug: string[]) {
  const joinedSlug = slug.join('/');
  const res = await fetch(`${process.env.BACKEND_URL}/media/${joinedSlug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

// DYNAMIC METADATA (This runs on the server!)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const media = await getMedia(params.slug);

  if (!media) {
    return {
      title: 'Not Found',
      description: 'This media does not exist.',
    };
  }

  // Assuming your domain for media pages
  const url = `https://wwww.memeforge.lol/media/${params.slug.join('/')}`;

  // Return dynamic metadata for Open Graph and Twitter Card
  return {
    title: 'Tabi Pay Card',
    description: 'Check out this media on MemeForge.',
    openGraph: {
      title: '',
      description: media.description || '',
      images: [
        {
          url: media.imageUrl,  // Ensure media.imageUrl is a fully qualified URL to the image
          width: 1200,
          height: 630,
          alt: media.title,
        },
      ],
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: media.title,
      description: media.description || '',
      images: [media.imageUrl], // This must be a fully-qualified URL (e.g., https://yourdomain.com/images/... )
    },
  };
}

const MediaDetailPage = async ({ params }: Props) => {
  const media = await getMedia(params.slug);

  if (!media) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{media.title}</h1>
      <img
        src={media.imageUrl}  // The media image URL should be publicly accessible
        alt={media.title}
        className="max-w-full max-h-[80vh] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default MediaDetailPage;
