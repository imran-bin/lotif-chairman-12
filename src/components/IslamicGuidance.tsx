'use client';

import React from 'react';
import { BookOpen, Scale, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const IslamicGuidance: React.FC = () => {
  const { activeTemplate } = useData();
  const isSmart = activeTemplate === 'smart-digital';
  const isRally = activeTemplate === 'rally-energy';

  const verses = [
    {
      title: "আমানত ও ন্যায়পরায়ণতার ঐশী নির্দেশ",
      arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ",
      bangla: "“নিশ্চয়ই আল্লাহ তোমাদেরকে আদেশ দিচ্ছেন—আমানত তার যোগ্য প্রাপকদের কাছে ফিরিয়ে দিতে এবং যখন মানুষের মাঝে বিচার-ফয়সালা বা শাসন পরিচালনা করবে, তখন ইনসাফ ও ন্যায়ের সাথে করবে।”",
      reference: "— পবিত্র কুরআন, সূরা আন-নিসা: ৫৮",
      icon: Scale,
      tag: "কুরআনের নির্দেশ"
    },
    {
      title: "ইনসাফ ও ন্যায়বিচারই তাকওয়ার ভিত্তি",
      arabic: "اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ ۖ وَاتَّقُوا اللَّهَ",
      bangla: "“তোমরা সুবিচার করো; ইনসাফ ও ন্যায়পরায়ণতাই তাকওয়ার (আল্লাহভীতির) সবচেয়ে নিকটবর্তী। আর আল্লাহকে ভয় করো।”",
      reference: "— পবিত্র কুরআন, সূরা আল-মায়িদাহ: ৮",
      icon: BookOpen,
      tag: "কুরআনের নির্দেশ"
    },
    {
      title: "আল্লাহর আরশের ছায়াপ্রাপ্ত ন্যায়পরায়ণ শাসক",
      arabic: "سَبْعَةٌ يُظِلُّهُمُ اللَّهُ فِي ظِلِّهِ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّهُ: الإِمَامُ الْعَادِلُ",
      bangla: "“কিয়ামতের কঠিন দিনে যেদিন আল্লাহর আরশের ছায়া ছাড়া আর কোনো ছায়া থাকবে না, সেদিন আল্লাহ তা'আলা সাত শ্রেণীর মানুষকে তাঁর বিশেষ ছায়াতলে আশ্রয় দেবেন। তাদের প্রথম ব্যক্তি হলেন: ‘ন্যায়পরায়ণ শাসক’ (ইমামুল আদিল)।”",
      reference: "— সহীহ বুখারী: ৬৬০, সহীহ মুসলিম: ১০৩১",
      icon: Award,
      tag: "সহীহ হাদিস"
    },
    {
      title: "জনগণের দায়িত্বে খেয়ানতের কঠোর সতর্কবার্তা",
      arabic: "مَا مِنْ عَبْدٍ يَسْتَرْعِيهِ اللَّهُ رَعِيَّةً، يَمُوتُ يَوْمَ يَمُوتُ وَهُوَ غَاشٌّ لِرَعِيَّتِهِ، إِلاَّ حَرَّمَ اللَّهُ عَلَيْهِ الْجَنَّةَ",
      bangla: "“আল্লাহ তা'আলা তাঁর কোনো বান্দাকে যদি জনগণের অভিভাবক বা নেতা বানান, অতঃপর সে যদি তাদের সাথে খেয়ানত বা প্রতারণা করে মৃত্যুবরণ করে—তবে আল্লাহ তার জন্য জান্নাত চিরতরে হারাম করে দেন।”",
      reference: "— সহীহ মুসলিম: ১৪২, সহীহ বুখারী: ৭১৫১",
      icon: ShieldAlert,
      tag: "সহীহ হাদিস"
    }
  ];

  return (
    <section className={`py-20 ${
      isSmart 
        ? 'bg-gradient-to-b from-[#071926] via-slate-950 to-[#071926]' 
        : isRally 
        ? 'bg-gradient-to-b from-[#260814] via-slate-950 to-[#260814]' 
        : 'bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950'
    } text-white relative overflow-hidden transition-colors`}>
      {/* Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(${isSmart ? '#06b6d4' : isRally ? '#f43f5e' : '#10b981'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 ${
        isSmart ? 'bg-cyan-600/10' : isRally ? 'bg-rose-600/10' : 'bg-emerald-600/10'
      } rounded-full blur-3xl pointer-events-none`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ইনসাফ ও আমানতদারিতার নীতিমালা</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ন্যায়পরায়ণ শাসকের প্রতি পবিত্র কুরআন ও হাদিসের নির্দেশ
          </h2>

          <p className="text-emerald-200 text-sm sm:text-base leading-relaxed">
            জনপ্রতিনিধিত্ব কোনো ভোগের পদ নয়, এটি মহান আল্লাহর দরবারে এক মহা আমানত। ইনসাফভিত্তিক সমাজ বিনির্মাণে প্রতিটি সিদ্ধান্ত কুরআন ও সুন্নাহর আলোকে পরিচালনা করাই আমাদের আজীবন ব্রত।
          </p>
        </div>

        {/* 4 Islamic Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verses.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-500/25 shadow-xl hover:border-amber-400/50 hover:shadow-emerald-900/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                      {v.tag}
                    </span>
                    <div className="p-2.5 rounded-xl bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">
                    {v.title}
                  </h3>

                  {/* Arabic Text in Calligraphy / Naskh Style */}
                  <div className="bg-emerald-950/70 border border-emerald-800/60 p-4 sm:p-5 rounded-2xl mb-4 text-right">
                    <p 
                      className="text-lg sm:text-xl text-amber-200 font-serif leading-loose tracking-wide"
                      dir="rtl"
                      style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Traditional Arabic', serif" }}
                    >
                      {v.arabic}
                    </p>
                  </div>

                  {/* Bengali Translation */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-3">
                    {v.bangla}
                  </p>
                </div>

                {/* Reference */}
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <span className="text-xs font-semibold text-emerald-400">
                    {v.reference}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Dua Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 text-center space-y-2 shadow-2xl">
          <p 
            className="text-base sm:text-lg text-amber-300 font-serif"
            dir="rtl"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
          >
            اللَّهُمَّ اجْعَلْنَا مِنَ الأَئِمَّةِ الْعَادِلِينَ وَلَا تَجْعَلْنَا مِنَ الظَّالِمِينَ
          </p>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium">
            &ldquo;হে আল্লাহ! আমাদেরকে ন্যায়পরায়ণ ও জনকল্যাণকামী নেতৃত্বের কাতারে কবুল করুন এবং যেকোনো ধরণের জুলুম ও অবিচার থেকে রক্ষা করুন—আমীন।&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
};
