// app/featured/tabi-pay/[uuid]/page.tsx
import { Download, Loader2, Share2 } from 'lucide-react';
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
      url: `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}.png`,
      images: [
        {
          url: `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}.png`, // e.g., full URL to the image
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
      images: [`https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}.png`],
    },
  };
}

export default function TabiPayCardPage({ params }: Props) {
    const cardUrl = `https://memeforge.mooo.com/api/tabipay-cards/${params.uuid}.png`;
    const loading = !cardUrl;
    const previewUrl = `https://www.memeforge.lol/featured/tabi-pay/${params.uuid}`

    const handleDownload = async () => {
      if (!cardUrl) return;
      const response = await fetch(cardUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tabi-pay-card.png';
      a.click();
      URL.revokeObjectURL(url);
    };
  
    const handleShare = () => {
      const tweetText = encodeURIComponent(
        `Check out my new Tabi Pay card! 💳🚀\nJoin me at https://memeforge.lol`
      );
      const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(previewUrl)}`;
      window.open(tweetUrl, '_blank');
    };
  
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

        <div className="max-w-xl mx-auto text-black space-y-6 bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-red-700">Your Tabi Pay Card</h2>

            {loading ? (
                <div className="animate-pulse bg-black/10 h-48 rounded-lg flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-black/50" />
                </div>
            ) : (
                <img
                src={cardUrl!}
                alt="Your Tabi Pay Card"
                className="w-full rounded-lg border border-black/10 shadow-md"
                />
            )}

            <div className="flex gap-4 justify-center">
                <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-[#C92D2E] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
                disabled={loading}
                >
                <Share2 className="w-4 h-4" />
                Share on Twitter
                </button>
                <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-gray-800 transition"
                disabled={loading}
                >
                <Download className="w-4 h-4" />
                Download Card
                </button>
            </div>
    </div>
        </div>
    );
}
