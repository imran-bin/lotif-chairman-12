'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  ArrowRight, 
  FileCheck2, 
  AlertCircle, 
  Users, 
  Sparkles,
  PhoneCall,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '@/context/DataContext';

export const Hero: React.FC = () => {
  const { candidate, pledgeSupport } = useData();
  const [hasPledged, setHasPledged] = useState(false);

  const handlePledge = () => {
    if (!hasPledged) {
      pledgeSupport();
      setHasPledged(true);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#f59e0b', '#34d399', '#ffffff']
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Grid and Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Pitch */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Nomination Tag with Official Jamaat Logo */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-800/90 border border-emerald-500/60 text-emerald-100 text-xs sm:text-sm font-bold self-center lg:self-start shadow-lg">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white p-0.5 border border-emerald-300 shrink-0">
                <img src="/jamaat-logo.svg" alt="বাংলাদেশ জামায়াতে ইসলামী" className="w-full h-full object-contain" />
              </div>
              <span>{candidate.party}</span>
            </div>

            {/* Candidate Title & Slogan */}
            <div className="space-y-3">
              <p className="text-amber-400 font-bold text-base sm:text-lg tracking-wider uppercase">
                {candidate.union} • {candidate.designation}
              </p>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
                {candidate.name}
              </h1>
              <p className="text-xl sm:text-2xl text-emerald-100 font-medium pt-1">
                &ldquo;{candidate.slogan}&rdquo;
              </p>
            </div>

            {/* Candidate Salam / Speech Quote Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 text-emerald-50 shadow-xl relative overflow-hidden text-left">
              <div className="absolute -right-6 -bottom-6 text-white/5 text-8xl font-serif select-none pointer-events-none">
                “
              </div>
              <p className="text-sm sm:text-base leading-relaxed italic text-emerald-100/90">
                {candidate.salam}
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-amber-300 font-medium">
                  {candidate.mainPledge}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#manifesto"
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 group"
              >
                <FileCheck2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>নির্বাচনী ইশতেহার পড়ুন</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#tracker"
                className="bg-white/15 hover:bg-white/25 active:scale-95 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <span>স্মার্ট প্রমিজ ট্র্যাকার</span>
              </a>

              <a
                href="#grievance"
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold px-5 py-3.5 rounded-xl border border-amber-500/40 transition-all flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>অভিযোগ দিন</span>
              </a>
            </div>

            {/* Pledge Support & Live Counter Box */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handlePledge}
                disabled={hasPledged}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all shadow-md ${
                  hasPledged 
                    ? 'bg-emerald-800 text-emerald-200 cursor-default border border-emerald-600'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 active:scale-95 hover:shadow-amber-500/30'
                }`}
              >
                {hasPledged ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>সমর্থন জানানোর জন্য ধন্যবাদ!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-current text-red-600 animate-bounce" />
                    <span>আমি সমর্থন জানাচ্ছি</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-sm text-emerald-200 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>
                  <strong className="text-white font-bold text-base">{candidate.totalSupporters.toLocaleString('bn-BD')}</strong> জন ভোটার সমর্থন জানিয়েছেন
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Candidate Portrait Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-emerald-600 opacity-70 blur-lg transition duration-1000 group-hover:opacity-100" />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-emerald-500/40 shadow-2xl">
                
                {/* Candidate High-Res Photo */}
                <div className="aspect-[4/4.8] w-full overflow-hidden relative bg-slate-800">
                  <img
                    src={candidate.photoUrl || "/candidate-latif.jpg"}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 bg-emerald-900/90 border border-emerald-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>মডেল ইউনিয়ন ভিশন</span>
                  </div>

                  {/* Floating Bottom Card Over Photo */}
                  <div className="absolute bottom-4 inset-x-4 bg-slate-950/85 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-amber-400 font-semibold mt-0.5">
                          চেয়ারম্যান পদপ্রার্থী
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                          ১২ নং যুগিখালী
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 border-t border-white/10 pt-2">
                      {candidate.appeal}
                    </p>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="bg-emerald-950/90 px-4 py-3 border-t border-emerald-800 flex items-center justify-between text-xs text-emerald-200">
                  <a 
                    href={`tel:${candidate.phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex items-center gap-1.5 font-medium hover:text-emerald-300 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    হেল্পলাইন: {candidate.phone}
                  </a>
                  <a
                    href="#manifesto"
                    className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1"
                  >
                    বিস্তারিত ইশতেহার →
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
