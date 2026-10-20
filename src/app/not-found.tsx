'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-5 shadow-2xl">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
          ৪০৪
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">পেজটি পাওয়া যায়নি</h1>
          <p className="text-xs text-slate-400 mt-1">
            আপনি যে ঠিকানাটি লিখেছেন তা সঠিক নয় বা পেজটি সরানো হয়েছে।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
          >
            <Home className="w-4 h-4" />
            <span>মূল ওয়েবসাইটে যান</span>
          </Link>

          <Link
            href="/superadmin"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-5 py-2.5 rounded-xl text-xs transition border border-slate-700"
          >
            <span>সুপার অ্যাডমিন ড্যাশবোর্ড</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
