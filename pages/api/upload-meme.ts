// pages/api/upload-meme.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // allow large meme files
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { imageData } = req.body;

  if (!imageData) {
    return res.status(400).json({ message: 'Missing imageData' });
  }

  try {
    // Generate unique filename
    const fileName = `${uuidv4()}.png`;

    // Remove base64 prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Vercel Blob
    const blob = await put(fileName, buffer, {
      access: 'public', // make it publicly accessible
    });

    return res.status(200).json({ message: 'Upload successful', url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Upload failed' });
  }
}
