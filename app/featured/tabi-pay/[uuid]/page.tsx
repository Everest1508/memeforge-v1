// app/featured/tabi-pay/[uuid]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { uuid: string };
};



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `TabiPay Card`,
    description: `Check out personalized TabiPay card!`,
    openGraph: {
      title: `TabiPay Card`,
      description: `Check out personalized TabiPay card!`,
      url: `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}/`,
      images: [
        {
          url: `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}/`, // e.g., full URL to the image
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
      images: [`https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}/`],
    },
  };
}

export default function TabiPayCardPage({ params }: Props) {
  return (
    <div className="min-h-screen text-white flex justify-center items-center p-10">
      <p>Loading TabiPay card for ID: {params.uuid}</p>
      https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}/
    </div>
  );
}
