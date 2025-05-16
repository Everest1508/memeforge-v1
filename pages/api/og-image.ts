import type { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage, registerFont } from 'canvas';
import https from 'https';
import http from 'http';

// Optional: register custom font
// registerFont('./public/fonts/YourFont.ttf', { family: 'YourFont' });

const fetchImageBuffer = (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      const chunks: Uint8Array[] = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text = 'Hello World', imageUrl } = req.query;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ error: 'Missing imageUrl parameter' });
    }

    const imageBuffer = await fetchImageBuffer(imageUrl);
    const baseImage = await loadImage(imageBuffer);

    const width = baseImage.width;
    const height = baseImage.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Draw base image
    ctx.drawImage(baseImage, 0, 0, width, height);

    // Draw text
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text.toString(), width / 2, height - 50);

    // Output as image
    res.setHeader('Content-Type', 'image/png');
    const buffer = canvas.toBuffer('image/png');
    res.end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}
