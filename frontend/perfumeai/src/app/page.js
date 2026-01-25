'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the personality page (first step)
    router.push('/create/personality');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-white">Loading...</h1>
      </main>
    </div>
  );
}
