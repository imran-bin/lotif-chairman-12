'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Award, 
  GraduationCap, 
  PhoneCall, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  Droplet, 
  Scale, 
  Compass, 
  Share2, 
  X, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '@/context/DataContext';
import { jugikhaliWards, MemberCandidate } from '@/data/initialData';

export const MemberCandidateBanner: React.FC = () => {
  const { memberCandidates, sectionVisibility, pledgeSupport } = useData();
  const [selectedWardNumber, setSelectedWardNumber] = useState<number>(3);
  const [showEducationModal, setShowEducationModal] = useState<boolean>(false);
  const [hasSupported, setHasSupported] = useState<boolean>(false);

  // If section is turned off in superadmin, hide it
  if (sectionVisibility?.memberCandidates === false) {
    return null;
  }

  const activeCandidates = (memberCandidates || []).filter(c => c.isActive);
  
  // Find candidate for selected ward, or fallback to first available active candidate
  const currentCandidate = activeCandidates.find(c => c.wardNumber === selectedWardNumber) || activeCandidates[0];

  const handleSupportCandidate = () => {
    if (!hasSupported) {
      setHasSupported(true);
      pledgeSupport();
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#f59e0b', '#34d399', '#ffffff']
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Helper icons for manifesto points
  const getManifestoIcon = (idx: number, iconName?: string) => {
    if (iconName === 'droplet' || idx === 1) return <Droplet className="w-5 h-5 text-teal-400" />;
    if (iconName === 'shield' || idx === 2) return <ShieldCheck className="w-5 h-5 text-amber-400" />;
    if (iconName === 'graduation' || idx === 3) return <GraduationCap className="w-5 h-5 text-emerald-400" />;
    if (iconName === 'scale' || idx === 4) return <Scale className="w-5 h-5 text-blue-400" />;
    return <Compass className="w-5 h-5 text-emerald-300" />;
  };

  return (
    <section 
      id="member-manifesto"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white py-14 sm:py-20 border-b border-emerald-900/60"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge & Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/80 backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>১২ নং যুগিখালী ইউনিয়ন পরিষদ • ওয়ার্ড মেম্বার পদপ্রার্থী ও বিশেষ নির্বাচনী ইশতেহার</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            ওয়ার্ডের তৃণমূল উন্নয়ন ও <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">ইনসাফভিত্তিক ইশতেহার</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            চেয়ারম্যান পদপ্রার্থী <strong className="text-emerald-300">মাওলানা আব্দুল লতিফ</strong>-এর দুর্নীতিমুক্ত ইউনিয়ন পরিষদকে বিজয়ী ও শক্তিশালী করতে প্রতিটি ওয়ার্ডে উচ্চশিক্ষিত, সৎ ও যোগ্য নেতৃত্বের সুস্পষ্ট ৫ দফা অঙ্গীকার:
          </p>

          {/* Ward Switcher Bar */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-2">
            {jugikhaliWards.map((w) => {
              const hasCandidate = activeCandidates.some(c => c.wardNumber === w.number);
              const isSelected = selectedWardNumber === w.number;

              return (
                <button
                  key={w.number}
                  onClick={() => setSelectedWardNumber(w.number)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105 border border-emerald-300'
                      : hasCandidate
                      ? 'bg-slate-900/80 text-emerald-300 border border-emerald-600/50 hover:bg-slate-800'
                      : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{w.name}</span>
                  {hasCandidate && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-600 text-white'
                    }`}>
                      প্রার্থী ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================== GRAND BILLBOARD BANNER ===================== */}
        {currentCandidate ? (
          <div className="bg-gradient-to-br from-slate-900/95 via-emerald-950/90 to-slate-900/95 rounded-3xl p-6 sm:p-9 lg:p-11 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/80 backdrop-blur-md relative overflow-hidden">
            
            {/* Top decorative glow bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-teal-400" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* LEFT COLUMN: CANDIDATE PROFILE HERO (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-950/70 p-6 sm:p-7 rounded-2xl border border-emerald-800/60 shadow-xl">
                
                {/* Profile Card Header */}
                <div className="space-y-4">
                  
                  {/* Photo & Party Badges */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={currentCandidate.photoUrl || '/member-afsar.png'}
                        alt={currentCandidate.name}
                        className="w-32 h-40 sm:w-36 sm:h-44 object-cover rounded-2xl border-4 border-emerald-500 shadow-2xl shadow-emerald-950 bg-slate-800"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black border-2 border-slate-950 flex items-center gap-1 shadow-md">
                        <UserCheck className="w-3 h-3" />
                        <span>প্রার্থী</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left min-w-0">
                      <div className="inline-block px-3 py-1 rounded-full bg-emerald-900/90 border border-emerald-400/50 text-emerald-200 text-xs font-black tracking-wide">
                        {currentCandidate.party}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        {currentCandidate.name}
                      </h3>

                      <p className="text-xs sm:text-sm font-bold text-emerald-400">
                        {currentCandidate.designation}
                      </p>

                      <div className="text-xs text-slate-300 font-medium space-y-0.5">
                        <p>📍 {currentCandidate.wardName || `${currentCandidate.wardNumber} নং ওয়ার্ড`} ({currentCandidate.village})</p>
                        {(currentCandidate.fatherName || currentCandidate.motherName) && (
                          <p className="text-slate-400 text-[11px] pt-1">
                            {currentCandidate.fatherName && <span><strong>পিতা:</strong> {currentCandidate.fatherName}</span>}
                            {currentCandidate.motherName && <span className="ml-2"><strong>মাতা:</strong> {currentCandidate.motherName}</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* High Qualifications Badge */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>শিক্ষাগত যোগ্যতা সারসংক্ষেপ:</span>
                    </div>
                    <p className="text-sm sm:text-base font-extrabold text-white">
                      {currentCandidate.shortQualifications}
                    </p>
                    <p className="text-[11px] text-emerald-300">
                      দাখিল, আলিম, ফাজিল (বিএ), কামিল (এমএ), বিএ অনার্স, এমএ, এলএলবি ও বিএমএড সহ মোট ৮টি ডিগ্রি সম্পন্ন।
                    </p>
                  </div>

                  {/* View Full 8 Degrees Button */}
                  <button
                    onClick={() => setShowEducationModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 hover:text-white border border-emerald-700/60 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>সম্পূর্ণ ৮টি সনদের বিস্তারিত খতিয়ান দেখুন ➔</span>
                  </button>
                </div>

                {/* Candidate Bio & Call to Action */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  {currentCandidate.bio && (
                    <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                      &ldquo;{currentCandidate.bio}&rdquo;
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    {currentCandidate.phone && (
                      <a
                        href={`tel:${currentCandidate.phone}`}
                        className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>সরাসরি কল দিন</span>
                      </a>
                    )}

                    <button
                      onClick={handleSupportCandidate}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95 ${
                        hasSupported
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white hover:bg-emerald-50 text-emerald-950 font-black'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasSupported ? 'fill-slate-950 text-slate-950' : 'text-rose-600 fill-rose-600'}`} />
                      <span>{hasSupported ? 'দোয়া ও সমর্থন গৃহীত ✓' : 'দোয়া ও সমর্থন জানান'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: DETAILED MANIFESTO & 5 PLEDGES (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* Manifesto Banner Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentCandidate.wardName || `${currentCandidate.wardNumber} নং ওয়ার্ড`}-এর বিশেষ নির্বাচনী ইশতেহার</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {currentCandidate.village}-কে ইনসাফ, সততা ও আধুনিক সেবার <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">মডেল ওয়ার্ড গড়ার ৫ দফা কর্মসূচি</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    গ্রামের কৃষক, দিনমজুর, ছাত্র, যুবক ও সাধারণ মা-বোনদের নাগরিক অধিকার রক্ষায় আমাদের সুনির্দিষ্ট ৫টি উন্নয়ন অগ্রাধিকার:
                  </p>
                </div>

                {/* 5 High-Impact Manifesto Points */}
                <div className="grid grid-cols-1 gap-3.5">
                  {(currentCandidate.manifestoPoints && currentCandidate.manifestoPoints.length > 0 ? currentCandidate.manifestoPoints : [
                    {
                      title: "রাস্তাঘাট ও টেকসই ড্রেনেজ সংস্কার",
                      description: "পাইকপাড়া গ্রামের সকল অভ্যন্তরীণ কাঁচা ও আধা-পাকা রাস্তা পাকাকরণ, ব্রিজ-কালভার্ট মেরামত এবং বর্ষাকালে জলাবদ্ধতামুক্ত টেকসই যোগাযোগ নিশ্চিত করা।"
                    },
                    {
                      title: "সুপেয় সুমিষ্টি পানি ও স্বাস্থ্য সুরক্ষা",
                      description: "৩ নং ওয়ার্ডের প্রতিটি পাড়ায় গভীর নলকূপ স্থাপন, আর্সেনিকমুক্ত নিরাপদ মিষ্টি পানির নিশ্চয়তা এবং মা ও শিশুদের জন্য বিনামূল্যে স্বাস্থ্যসেবা ক্যাম্পেইন।"
                    },
                    {
                      title: "মাদক, জুয়া ও অপরাধমুক্ত নিরাপদ সমাজ",
                      description: "তরুণ প্রজন্মকে মাদকের করাল গ্রাস থেকে বাঁচাতে ওয়ার্ডভিত্তিক সামাজিক প্রতিরোধ কমিটি গঠন, অপরাধ ও বিশৃঙ্খলামুক্ত শান্তির পরিবেশ প্রতিষ্ঠা।"
                    },
                    {
                      title: "মেধাভিত্তিক যুব কর্মসংস্থান ও আইটি প্রশিক্ষণ",
                      description: "পাইকপাড়ার শিক্ষিত বেকার যুবকদের আইটি ও ফ্রিল্যান্সিং প্রশিক্ষণ, কারিগরি দক্ষতা উন্নয়ন এবং অসচ্ছল মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তি ও বই প্রদান।"
                    },
                    {
                      title: "জবাবদিহিমূলক নাগরিক সেবা ও শতভাগ স্বচ্ছতা",
                      description: "নাগরিক সনদ, জন্মনিবন্ধন ও সরকারি বয়স্ক/বিধবা ভাতা বরাদ্দে কোনো ঘুষ বা স্বজনপ্রীতি বরদাশত করা হবে না—সব সেবা সরাসরি জনগণের দ্বারে।"
                    }
                  ]).map((point, idx) => (
                    <div 
                      key={idx}
                      className="group/point bg-slate-950/60 hover:bg-slate-900/80 p-4 rounded-2xl border border-emerald-900/60 hover:border-emerald-500/60 transition-all duration-300 shadow-sm flex items-start gap-3.5"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-900/70 border border-emerald-700/60 flex items-center justify-center shrink-0 shadow-2xs group-hover/point:scale-105 transition">
                        {getManifestoIcon(idx, point.iconName)}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-black text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-700/40">
                            ০{idx + 1}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-white group-hover/point:text-emerald-300 transition">
                            {point.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Candidate Commitment Bottom Quote */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[11px] font-extrabold text-amber-300 flex items-center justify-center sm:justify-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>চেয়ারম্যান পদপ্রার্থী মাওলানা আব্দুল লতিফের ইনসাফের পরিষদে</span>
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {currentCandidate.name}-কে মূল্যবান ভোট ও দোয়া দিয়ে নির্বাচিত করার আকুল আবেদন
                    </p>
                  </div>

                  <a
                    href={sectionVisibility?.unionWards ? "#wards" : "#manifesto"}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md active:scale-95 shrink-0"
                  >
                    <span>{sectionVisibility?.unionWards ? "সকল ৯টি ওয়ার্ডের বিবরণী" : "চেয়ারম্যানের মূল ইশতেহার"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        ) : (
          <div className="bg-slate-900/80 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <MapPin className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {selectedWardNumber} নং ওয়ার্ডের প্রার্থী তালিকা শীঘ্রই আসছে
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              সুপার অ্যাডমিন ড্যাশবোর্ড থেকে খুব শীঘ্রই এই ওয়ার্ডের ইউপি সদস্য পদপ্রার্থীর পরিচিতি ও ইশতেহার সংযোজন করা হবে।
            </p>
            <button
              onClick={() => setSelectedWardNumber(3)}
              className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              ৩ নং ওয়ার্ডের মো: আফছার আলীর ইশতেহার দেখুন
            </button>
          </div>
        )}

      </div>

      {/* FULL ACADEMIC CERTIFICATES TIMELINE MODAL */}
      {showEducationModal && currentCandidate && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in"
          onClick={() => setShowEducationModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative animate-in zoom-in-95 max-h-[92vh] overflow-y-auto border border-emerald-300 space-y-6 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setShowEducationModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-10"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
              <img
                src={currentCandidate.photoUrl || '/member-afsar.png'}
                alt={currentCandidate.name}
                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-2xl border-2 border-emerald-600 shadow-md bg-slate-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/candidate-latif.jpg';
                }}
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                  {currentCandidate.party}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentCandidate.name}
                </h3>
                <p className="text-xs font-bold text-emerald-800">
                  {currentCandidate.designation} • {currentCandidate.wardName} ({currentCandidate.village})
                </p>
                <p className="text-xs text-slate-500">
                  পিতা: {currentCandidate.fatherName} • মাতা: {currentCandidate.motherName}
                </p>
              </div>
            </div>

            {/* Degrees Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>সম্পূর্ণ ৮টি শিক্ষাগত সনদ ও ফলাফলের অনুমোদিত খতিয়ান</span>
                </h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  উচ্চশিক্ষিত নেতৃত্ব
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-emerald-900 text-white font-bold">
                    <tr>
                      <th className="py-3 px-3.5 text-center">ক্রম</th>
                      <th className="py-3 px-3.5">ডিগ্রি / পরীক্ষার নাম</th>
                      <th className="py-3 px-3.5">পাসের সন</th>
                      <th className="py-3 px-3.5">শিক্ষা প্রতিষ্ঠান / বিশ্ববিদ্যালয়</th>
                      <th className="py-3 px-3.5 text-right">ফলাফল / বিভাগ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {currentCandidate.education.map((edu, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-3.5 font-mono font-bold text-slate-400 text-center">০{idx + 1}</td>
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">{edu.degree}</td>
                        <td className="py-2.5 px-3.5 font-semibold text-emerald-800">{edu.year || '—'}</td>
                        <td className="py-2.5 px-3.5 text-slate-600 font-medium">{edu.institution || '—'}</td>
                        <td className="py-2.5 px-3.5 text-right">
                          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200">
                            {edu.result || 'উত্তীর্ণ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                ১২ নং যুগিখালী ইউনিয়ন পরিষদ নির্বাচনী প্রচারণা সেল
              </span>
              <button
                onClick={() => setShowEducationModal(false)}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
