'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  Sprout,
  HeartHandshake,
  MapPin
} from 'lucide-react';
import { useData } from '@/context/DataContext';

const MarqueeTag = 'marquee' as unknown as React.ElementType;

export const Navbar: React.FC = () => {
  const { candidate, sectionVisibility, openGrievanceModal } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const allNavLinks = [
    { label: sectionVisibility?.memberCandidates ? 'ওয়ার্ড ও মেম্বার প্রার্থী' : '৯টি ওয়ার্ড', href: '#wards', icon: MapPin, show: true },
    { label: 'ইশতেহার', href: '#manifesto', icon: FileText, show: sectionVisibility?.manifesto },
    { label: 'সামাজিক কাজ', href: '#social-activities', icon: HeartHandshake, show: sectionVisibility?.socialActivities },
    { label: 'ইসলামিক বার্তা', href: '#guidance', icon: ShieldCheck, show: sectionVisibility?.islamicGuidance },
    { label: 'প্রমিজ ট্র্যাকার', href: '#tracker', icon: CheckCircle2, show: sectionVisibility?.promiseTracker },
    { 
      label: 'অভিযোগ বক্স', 
      href: '#', 
      icon: AlertCircle, 
      show: true,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openGrievanceModal();
      }
    },
    { label: 'জরুরি সেবা', href: '#emergency', icon: PhoneCall, show: sectionVisibility?.emergencyServices },
    { label: 'বাজেট স্বচ্ছতা', href: '#budget', icon: Coins, show: sectionVisibility?.budgetTransparency },
    { label: 'কৃষি কর্নার', href: '#agriculture', icon: Sprout, show: sectionVisibility?.agricultureCorner },
  ];

  const navLinks = allNavLinks.filter(l => l.show !== false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm py-1 px-4 font-medium flex justify-between items-center border-b border-emerald-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-emerald-700 text-white px-2 py-0.5 rounded text-[11px] font-bold tracking-wide">
              নির্বাচনী অঙ্গীকার
            </span>
            <span>&ldquo;আমার যুগিখালী&rdquo; - ইনসাফ, স্বচ্ছতা ও আধুনিক মডেল ইউনিয়ন গড়ার শপথ</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <a href="tel:+8801735885527" className="hover:text-emerald-300 flex items-center gap-1.5 transition font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              হটলাইন: +880 1735-885527
            </a>
          </div>
        </div>
      </div>

      {/* Quranic Ayat & Translation Marquee Ticker */}
      <div className="bg-emerald-950 text-amber-100 border-b border-emerald-800/80 text-xs py-1.5 px-3 overflow-hidden shadow-inner flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-2 sm:gap-3">
          <div className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold px-2 sm:px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] shadow-xs">
            <span>📖</span>
            <span className="whitespace-nowrap">কুরআনের নির্দেশনা:</span>
          </div>
          
          <div className="flex-1 overflow-hidden min-w-0">
            <MarqueeTag
              behavior="scroll"
              direction="left"
              scrollamount="6"
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as unknown as { stop: () => void }).stop()}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as unknown as { start: () => void }).start()}
              className="text-emerald-100 font-medium cursor-pointer"
            >
              <span className="inline-flex items-center gap-8 text-[12px] sm:text-xs">
                {/* Ayat 1: Surah An-Nisa 4:58 */}
                <span className="inline-flex items-center gap-2">
                  <span className="text-amber-300 font-serif font-semibold text-sm">« إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ »</span>
                  <span className="bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">সূরা আন-নিসা: ৫৮</span>
                  <span className="text-emerald-200">— &ldquo;নিশ্চয়ই আল্লাহ তোমাদের নির্দেশ দিচ্ছেন আমানতসমূহ তার প্রাপকদের কাছে পৌঁছে দিতে এবং যখন মানুষের মধ্যে বিচার-ফায়সালা করবে তখন ন্যায়পরায়ণতার সাথে ফায়সালা করো।&rdquo;</span>
                </span>

                <span className="text-amber-400 font-bold">✦</span>

                {/* Ayat 2: Surah Al-Ma'idah 5:8 */}
                <span className="inline-flex items-center gap-2">
                  <span className="text-amber-300 font-serif font-semibold text-sm">« يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ ۖ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ »</span>
                  <span className="bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">সূরা আল-মায়িদাহ: ৮</span>
                  <span className="text-emerald-200">— &ldquo;হে মুমিনগণ, তোমরা সুবিচারের সাথে সাক্ষ্যদানকারী হিসেবে আল্লাহর বিধানে অবিচল থাকো; কোনো দলের শত্রুতা যেন তোমাদের অবিচার করতে প্ররোচিত না করে। সুবিচার করো, এটিই তাকওয়ার অধিক নিকটবর্তী।&rdquo;</span>
                </span>

                <span className="text-amber-400 font-bold">✦</span>

                {/* Ayat 3: Surah Al-Qasas 28:26 */}
                <span className="inline-flex items-center gap-2">
                  <span className="text-amber-300 font-serif font-semibold text-sm">« إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ »</span>
                  <span className="bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">সূরা আল-কাসাস: ২৬</span>
                  <span className="text-emerald-200">— &ldquo;নিশ্চয়ই আপনার কাজের জন্য উত্তম দায়িত্বশীল সে, যে শক্তিশালী (দক্ষ) ও বিশ্বস্ত (আমানতদার)।&rdquo;</span>
                </span>

                <span className="text-amber-400 font-bold">✦</span>

                {/* Ayat 4: Surah Al-Ma'idah 5:2 */}
                <span className="inline-flex items-center gap-2">
                  <span className="text-amber-300 font-serif font-semibold text-sm">« وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ »</span>
                  <span className="bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded">সূরা আল-মায়িদাহ: ২</span>
                  <span className="text-emerald-200">— &ldquo;সৎকর্ম ও খোদাভীতিতে তোমরা একে অপরকে সহযোগিতা করো, পাপ ও সীমালঙ্ঘনের কাজে সহযোগিতা করো না।&rdquo;</span>
                </span>
              </span>
            </MarqueeTag>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Candidate Identity + Jamaat Official Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            {/* Candidate Photo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-emerald-600 shadow-md ring-2 ring-emerald-100 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src={candidate.photoUrl || "/candidate-latif.jpg"} 
                alt={candidate.name} 
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Official Jamaat-e-Islami Logo */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-emerald-300 shadow-sm bg-white p-0.5 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img 
                src="/jamaat-logo.svg" 
                alt="বাংলাদেশ জামায়াতে ইসলামী লোগো" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-2xl text-slate-900 group-hover:text-emerald-700 transition truncate leading-tight block">
                  {candidate.name}
                </span>
                <span className="hidden md:inline-flex bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  চেয়ারম্যান পদপ্রার্থী
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium truncate">
                {candidate.union} • <span className="text-emerald-700 font-semibold">{candidate.party}</span>
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className="px-3 py-2 rounded-lg hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openGrievanceModal}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all flex items-center gap-2 glow-emerald cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>অভিযোগ জানান</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (item.onClick) item.onClick(e);
                  }}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-bold text-sm transition active:bg-emerald-100 cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openGrievanceModal();
                }}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-sm transition active:scale-98 glow-emerald"
              >
                অভিযোগ ও সমস্যা জানান (পপআপ)
              </button>
              <a
                href="tel:+8801735885527"
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>হটলাইন: +880 1735-885527</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
