'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5 shadow-2xl">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">কিছু একটা সমস্যা হয়েছে!</h2>
          <p className="text-xs text-slate-400 mt-1">
            দয়া করে পেজটি রিলোড দিন অথবা পুনরায় চেষ্টা করুন।
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>পুনরায় চেষ্টা</span>
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition border border-slate-700"
          >
            <Home className="w-4 h-4" />
            <span>হোমপেজ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
