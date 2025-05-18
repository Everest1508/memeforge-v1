import { Metadata } from 'next';
import CardViewer from './CardView';

type Props = {
  params: { uuid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imageUrl = `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}.png`;

  return {
    title: `TabiPay Card`,
    description: `Check out personalized TabiPay card!`,
    openGraph: {
      title: `TabiPay Card`,
      description: `Check out personalized TabiPay card!`,
      url: imageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Tabipay Card`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `TabiPay Card`,
      description: `Check out personalized TabiPay card!`,
      images: [imageUrl],
    },
  };
}

export default function TabiPayCardPage({ params }: Props) {
  return (
    <div
      className="min-h-screen w-full px-6 py-28 flex items-center justify-center text-black"
      style={{
        backgroundColor: '#C92D2E',
        backgroundImage: 'url("/images/1.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <CardViewer uuid={params.uuid} />
    </div>
  );
}
