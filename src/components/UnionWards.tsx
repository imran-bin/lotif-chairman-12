'use client';

import React from 'react';
import { MapPin, Users, HeartHandshake, ArrowRight, ShieldCheck, PhoneCall, AlertCircle, Droplet } from 'lucide-react';
import { jugikhaliWards } from '@/data/initialData';
import { useData } from '@/context/DataContext';

export const UnionWards: React.FC = () => {
  const { openGrievanceModal } = useData();
  return (
    <section id="wards" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-200 shadow-2xs">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>১২ নং যুগিখালী ইউনিয়ন পরিষদ • ভৌগোলিক পরিচিতি</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            ইউনিয়নের ৯টি ওয়ার্ড ও আওতাধীন গ্রামসমূহ
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            রাজনগর থেকে হামিদপুর—যুগিখালী ইউনিয়নের প্রতিটি ওয়ার্ডের প্রতিটি পরিবারের দ্বারে দ্বারে ইনসাফ, সততা ও আধুনিক নাগরিক সেবা পৌঁছে দেওয়াই আমাদের মূল লক্ষ্য।
          </p>

          {/* Quick Stats Pill */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>মোট ওয়ার্ড: <strong className="text-emerald-700 font-bold">৯টি</strong></span>
            </span>
            <span className="bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>জনসংখ্যা ও সকল ভোটারের পাশে সার্বক্ষণিক সেবা</span>
            </span>
            <span className="bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>হেল্পলাইন: <strong className="text-slate-900">+880 1735-885527</strong></span>
            </span>
          </div>
        </div>

        {/* 9 Wards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {jugikhaliWards.map((w) => (
            <div
              key={w.number}
              className="group bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-80 group-hover:opacity-100 transition" />

              <div>
                {/* Header: Ward Number & Icon */}
                <div className="flex items-start sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black flex items-center justify-center text-base sm:text-lg shadow-2xs group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
                      ০{w.number}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-emerald-800 transition truncate">
                        {w.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium block">১২ নং যুগিখালী ইউনিয়ন</span>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    {w.villages.length}টি গ্রাম
                  </span>
                </div>

                {/* Villages List */}
                <div className="space-y-2 mt-4">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    আওতাধীন গ্রাম ও এলাকাসমূহ:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {w.villages.map((village, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50/60 transition"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{village}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Links for this Ward */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
                <button
                  onClick={openGrievanceModal}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>সমস্যা জানান (পপআপ)</span>
                </button>

                <a
                  href="#emergency"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-800 text-slate-700 font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Droplet className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>রক্তদাতা খুঁজুন</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-300" />
                <span>সবার জন্য উন্মুক্ত ও সমবণ্টন</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                কোনো ওয়ার্ড উন্নয়ন ও সেবা থেকে পিছিয়ে থাকবে না
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl leading-relaxed">
                ১ নং থেকে ৯ নং—প্রতিটি ওয়ার্ডের রাস্তাঘাট, ড্রেনেজ ব্যবস্থা, সুপেয় পানি, মসজিদ-মাদ্রাসা ও শিক্ষা প্রতিষ্ঠানের সমউন্নয়ন নিশ্চিত করা হবে ইনশাআল্লাহ।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#manifesto"
                className="bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 text-xs sm:text-sm"
              >
                <span>নির্বাচনী ইশতেহার</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#grievance"
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl border border-emerald-600 transition flex items-center justify-center gap-2 active:scale-95 text-xs sm:text-sm"
              >
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>আপনার ওয়ার্ডের সমস্যা লিখুন</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
