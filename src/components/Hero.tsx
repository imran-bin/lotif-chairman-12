'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ArrowRight, 
  FileCheck2, 
  AlertCircle, 
  Users, 
  Sparkles,
  PhoneCall,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Droplet,
  Flame,
  Award,
  Send,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '@/context/DataContext';

export const Hero: React.FC = () => {
  const { candidate, pledgeSupport, openGrievanceModal } = useData();
  const [hasPledged, setHasPledged] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = 3;

  // Auto carousel timer (6 seconds per slide)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePledge = () => {
    if (!hasPledged) {
      pledgeSupport();
      setHasPledged(true);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#f59e0b', '#34d399', '#ffffff']
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:26px_26px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Glow Announcement Bar */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-slate-900/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/60 backdrop-blur-md glow-emerald transition-all hover:scale-102">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="bg-emerald-800 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
              ১২ নং যুগিখালী
            </span>
            <span className="truncate max-w-[220px] sm:max-w-none text-emerald-100">
              ইনসাফ, আমানত ও আধুনিক মডেল ইউনিয়ন গড়ার গণআহ্বান
            </span>
            <span className="text-amber-400 text-xs font-bold hidden sm:inline">✦ ২০২৬</span>
          </div>
        </div>

        {/* ===================== CAROUSEL SLIDES CONTAINER ===================== */}
        <div className="relative min-h-[580px] sm:min-h-[530px] lg:min-h-[500px] flex items-center">
          
          {/* SLIDE 1: প্রার্থীর মূল নেতৃত্ব ও গণসংযোগ */}
          {currentSlide === 0 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center animate-in fade-in zoom-in-95 duration-500">
              
              {/* Left Column: Text & Pitch */}
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-center lg:text-left">
                
                {/* Nomination Badge with Official Jamaat Logo */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/90 border border-emerald-400/60 text-emerald-100 text-xs sm:text-sm font-bold self-center lg:self-start shadow-xl glow-emerald">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-white keep-white p-0.5 border border-emerald-300 shrink-0">
                    <img src="/jamaat-logo.svg" alt="বাংলাদেশ জামায়াতে ইসলামী" className="w-full h-full object-contain" />
                  </div>
                  <span>{candidate.party} মনোনীত প্রার্থী</span>
                </div>

                {/* Candidate Title & Slogan with CSS Glow */}
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-amber-400 font-bold text-xs sm:text-base tracking-widest uppercase glow-text-amber">
                    {candidate.union} • {candidate.designation}
                  </p>
                  <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                    {candidate.name}
                  </h1>
                  <p className="text-lg sm:text-2xl text-emerald-200 font-semibold pt-1 glow-text-emerald">
                    &ldquo;{candidate.slogan}&rdquo;
                  </p>
                </div>

                {/* Speech Quote Box */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 text-emerald-50 shadow-2xl relative overflow-hidden text-left border-l-4 border-l-amber-400">
                  <p className="text-xs sm:text-base leading-relaxed italic text-emerald-100/95">
                    {candidate.salam}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs text-amber-300 font-bold">
                      {candidate.mainPledge}
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Including Popup Trigger) */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 w-full">
                  <a
                    href="#manifesto"
                    className="w-full sm:w-auto justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-95 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 group glow-emerald"
                  >
                    <FileCheck2 className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0 text-slate-950" />
                    <span>নির্বাচনী ইশতেহার পড়ুন</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>

                  {/* Grievance Modal Trigger Button */}
                  <button
                    onClick={openGrievanceModal}
                    className="w-full sm:w-auto justify-center bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-5 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 group glow-amber"
                  >
                    <AlertCircle className="w-5 h-5 text-slate-950 shrink-0 group-hover:rotate-12 transition-transform" />
                    <span>অভিযোগ ও সমস্যা জানান</span>
                    <span className="bg-slate-950/20 text-[10px] px-1.5 py-0.5 rounded font-black">পপআপ</span>
                  </button>

                  <a
                    href="#wards"
                    className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>৯টি ওয়ার্ড দেখুন</span>
                  </a>
                </div>

                {/* Support Pledge Counter */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full">
                  <button
                    onClick={handlePledge}
                    disabled={hasPledged}
                    className={`w-full sm:w-auto justify-center flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all shadow-md ${
                      hasPledged 
                        ? 'bg-emerald-800 text-emerald-200 cursor-default border border-emerald-600'
                        : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 text-slate-950 active:scale-95 hover:shadow-amber-500/30 glow-amber'
                    }`}
                  >
                    {hasPledged ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>সমর্থন জানানোর জন্য ধন্যবাদ!</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-current text-rose-600 animate-bounce shrink-0" />
                        <span>আমি মাওলানা লতিফকে সমর্থন জানাচ্ছি</span>
                      </>
                    )}
                  </button>

                  <div className="w-full sm:w-auto justify-center flex items-center gap-2 text-xs sm:text-sm text-emerald-200 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 text-center">
                    <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong className="text-white font-bold text-sm sm:text-base">{candidate.totalSupporters.toLocaleString('bn-BD')}</strong> জন ভোটার সমর্থন জানিয়েছেন
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Column: Candidate Portrait Photo Card with CSS Glow Halo */}
              <div className="lg:col-span-5 flex justify-center w-full px-2 sm:px-0">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  
                  {/* Outer Pulsing Glow Ring */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-500 opacity-70 blur-xl animate-pulse-glow" />

                  {/* Main Card Frame */}
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-2 border-emerald-400/50 shadow-2xl glow-emerald-lg">
                    
                    <div className="aspect-[4/4.8] w-full overflow-hidden relative bg-slate-800">
                      <img
                        src={candidate.photoUrl || "/candidate-latif.jpg"}
                        alt={candidate.name}
                        className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Floating Top Badge */}
                      <div className="absolute top-4 left-4 bg-emerald-900/90 border border-emerald-400/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-1.5 shadow-lg glow-emerald">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>মডেল ইউনিয়ন ভিশন</span>
                      </div>

                      {/* Floating Bottom Card */}
                      <div className="absolute bottom-4 inset-x-4 bg-slate-950/90 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {candidate.name}
                            </h3>
                            <p className="text-xs text-amber-400 font-semibold mt-0.5">
                              চেয়ারম্যান পদপ্রার্থী
                            </p>
                          </div>
                          <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                            ১২ নং যুগিখালী
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 border-t border-white/10 pt-2">
                          {candidate.appeal}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Helpline */}
                    <div className="bg-emerald-950 px-4 py-3 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200">
                      <a 
                        href={`tel:${candidate.phone.replace(/[^0-9+]/g, '')}`} 
                        className="flex items-center gap-1.5 font-medium hover:text-emerald-300 transition"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        হটলাইন: {candidate.phone}
                      </a>
                      <button
                        onClick={openGrievanceModal}
                        className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 flex items-center gap-1"
                      >
                        সমস্যা জানান →
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SLIDE 2: ৯টি ওয়ার্ডের সুষম উন্নয়ন ও নাগরিক সেবা */}
          {currentSlide === 1 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center animate-in fade-in zoom-in-95 duration-500">
              
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs sm:text-sm font-bold self-center lg:self-start shadow-xl glow-amber">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>রাজনগর থেকে হামিদপুর • ৯টি ওয়ার্ডের সুষম উন্নয়ন</span>
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                    প্রতিটি গ্রামের প্রতিটি পরিবারের অধিকার নিশ্চিত হবে
                  </h2>
                  <p className="text-base sm:text-xl text-emerald-200 font-medium leading-relaxed">
                    রাস্তাঘাট সংস্কার, জলাবদ্ধতামুক্ত আধুনিক ড্রেনেজ, সুপেয় মিষ্টি পানি এবং কৃষকদের ন্যায্যমূল্যে সার-বীজ প্রাপ্তিই আমাদের প্রধান অঙ্গীকার।
                  </p>
                </div>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="bg-slate-900/90 border border-emerald-500/30 p-3.5 rounded-2xl glow-emerald">
                    <span className="text-lg">🛣️</span>
                    <h4 className="font-bold text-white text-sm mt-1">টেকসই রাস্তা ও কালভার্ট</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">ভাঙা রাস্তা ও ড্রেনের দ্রুত সমাধান</p>
                  </div>
                  <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-2xl glow-amber">
                    <span className="text-lg">🌾</span>
                    <h4 className="font-bold text-white text-sm mt-1">কৃষকের ন্যায্য সার-বীজ</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">ডিলারদের সিন্ডিকেটমুক্ত মনিটরিং</p>
                  </div>
                  <div className="bg-slate-900/90 border border-teal-500/30 p-3.5 rounded-2xl">
                    <span className="text-lg">💡</span>
                    <h4 className="font-bold text-white text-sm mt-1">সোলার ও সুপেয় পানি</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">অন্ধকার গলিপথে স্ট্রিট লাইট</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href="#wards"
                    className="w-full sm:w-auto justify-center bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2 glow-emerald"
                  >
                    <MapPin className="w-4 h-4 text-slate-950" />
                    <span>১২ নং যুগিখালীর ৯টি ওয়ার্ড দেখুন</span>
                  </a>

                  <button
                    onClick={openGrievanceModal}
                    className="w-full sm:w-auto justify-center bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold px-5 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2 glow-amber"
                  >
                    <AlertCircle className="w-4 h-4 text-slate-950" />
                    <span>আপনার এলাকার সমস্যা জানান (পপআপ)</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Visual Emblem for 9 Wards */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden glow-emerald-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
                  
                  <div className="text-center space-y-3 mb-6">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-extrabold block">
                      ১২ নং যুগিখালী ভৌগোলিক মানচিত্র
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      ৯টি ওয়ার্ডের সুষম অধিকার
                    </h3>
                    <p className="text-xs text-slate-300">
                      কোনো ওয়ার্ড অবহেলিত থাকবে না—বরাদ্দ হবে শতভাগ স্বচ্ছ ও ইনসাফভিত্তিক
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                    {[
                      { num: '০১', name: 'রাজনগর' },
                      { num: '০২', name: 'যুগিখালী' },
                      { num: '০৩', name: 'পাইকপাড়া' },
                      { num: '০৪', name: 'কামারালি' },
                      { num: '০৫', name: 'তরুলিয়া' },
                      { num: '০৬', name: 'বামনালী' },
                      { num: '০৭', name: 'ওফাপুর পূর্ব' },
                      { num: '০৮', name: 'ওফাপুর পশ্চিম' },
                      { num: '০৯', name: 'পাঁচনল' }
                    ].map(w => (
                      <div key={w.num} className="bg-white/10 hover:bg-emerald-600/30 border border-white/15 p-2.5 rounded-xl transition cursor-default">
                        <span className="text-amber-400 font-mono font-bold block text-sm">{w.num}</span>
                        <span className="text-white font-medium text-[11px] truncate block">{w.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                    <span>✓ জিরো টলারেন্স দুর্নীতি</span>
                    <span>✓ সরাসরি জবাবদিহিতা</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SLIDE 3: মানবিক সেবা ও রক্তদান নেটওয়ার্ক */}
          {currentSlide === 2 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center animate-in fade-in zoom-in-95 duration-500">
              
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/60 text-rose-300 text-xs sm:text-sm font-bold self-center lg:self-start shadow-xl">
                  <Droplet className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>মানবিক যুগিখালী • রক্তদান ও ফ্রি স্বাস্থ্য সেল</span>
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                    বিপদ-আপদে ও অসুস্থতায় সবার আগে আপনার পাশে
                  </h2>
                  <p className="text-base sm:text-xl text-emerald-200 font-medium leading-relaxed">
                    মুহূর্তের প্রয়োজনে রক্তের ব্যবস্থা, জরুরি অ্যাম্বুলেন্স সাপোর্ট, রোগী দর্শন এবং অসহায় শীতার্ত মানুষের সেবায় সবসময় প্রস্তুত।
                  </p>
                </div>

                {/* Blood Network Pill */}
                <div className="bg-slate-900/90 border border-rose-500/30 p-4 rounded-2xl text-left flex items-center gap-4 glow-amber">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 font-black text-xl shrink-0">
                    🩸
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base">যুগিখালী যুব ব্লাড ডোনার ব্যাংক</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      ইউনিয়নের ৯টি ওয়ার্ডের নিবন্ধিত রক্তদাতাদের ফোন দিয়ে তাৎক্ষণিক রক্ত সংগ্রহ করুন।
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href="#emergency"
                    className="w-full sm:w-auto justify-center bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    <Droplet className="w-4 h-4" />
                    <span>রক্তদাতা তালিকা দেখুন</span>
                  </a>

                  <a
                    href="tel:+8801735885527"
                    className="w-full sm:w-auto justify-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold px-5 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2 glow-emerald"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>জরুরি হটলাইন: +880 1735-885527</span>
                  </a>

                  <button
                    onClick={openGrievanceModal}
                    className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>জরুরি সমস্যা জানান (পপআপ)</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Emergency Badge Showcase */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-slate-900 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-center space-y-4">
                  <div className="w-16 h-16 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-2xl flex items-center justify-center mx-auto text-2xl glow-amber">
                    <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
                  </div>

                  <h3 className="text-2xl font-black text-white">২৪ ঘণ্টা হেল্পডেস্ক</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    অ্যাম্বুলেন্স, ফায়ার সার্ভিস কিংবা যেকোনো জরুরি সেবা প্রয়োজনে আমাদের ডিজিটাল প্রচার সেল সর্বদা জাগ্রত।
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(grp => (
                      <span key={grp} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-rose-300 font-bold text-xs">
                        {grp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <a
                      href="tel:+8801735885527"
                      className="block w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-md transition"
                    >
                      📞 সার্বক্ষণিক কল সেন্টার
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ===================== CAROUSEL NAVIGATION CONTROLS ===================== */}
        <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/10">
          
          {/* Slide Indicator Dots / Pills with Glow */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === idx
                    ? 'w-8 sm:w-10 h-2.5 bg-gradient-to-r from-emerald-400 to-amber-400 glow-amber'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-slate-400 font-mono font-bold ml-2">
              ০{currentSlide + 1} / ০{totalSlides}
            </span>
          </div>

          {/* Quick Caption of Slide */}
          <span className="hidden md:inline text-xs text-emerald-300/80 font-medium">
            {currentSlide === 0 && 'স্বচ্ছ ও দুর্নীতিমুক্ত নেতৃত্বের অঙ্গীকার'}
            {currentSlide === 1 && '৯টি ওয়ার্ডের সুষম উন্নয়ন রূপরেখা'}
            {currentSlide === 2 && '২৪/৭ ব্লাড ব্যাংক ও জরুরি মানবিক সহায়তা'}
          </span>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition border border-white/15 backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition border border-white/15 backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
