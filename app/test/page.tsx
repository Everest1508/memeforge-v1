// app/page.tsx or any client/server component
'use client';

import { useEffect, useState } from 'react';
import { encryptData } from '@/utils/encrypt';

export default function Home() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchDecryptedData = async () => {
      const dataToSend = { text: 'Hello from Next.js', user_id: 123 };
      const token = encryptData(dataToSend);

      const response = await fetch(
        `http://127.0.0.1:8000/api/decode-message/?token=${token}`
      );

      const json = await response.json();
      setResult(json);
    };

    fetchDecryptedData();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Encrypted Message Example</h1>
      <pre className="bg-gray-100 p-2 rounded">
        {result ? JSON.stringify(result, null, 2) : 'Loading...'}
      </pre>
    </main>
  );
}
