'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  ArrowUp, 
  ExternalLink 
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { jugikhaliWards } from '@/data/initialData';

export const Footer: React.FC = () => {
  const { candidate } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-emerald-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Candidate Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                <img
                  src={candidate.photoUrl || "/candidate-latif.jpg"}
                  alt={candidate.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Jamaat Logo */}
              <div className="w-11 h-11 rounded-full overflow-hidden border border-emerald-400 bg-white p-0.5 shadow-md">
                <img
                  src="/jamaat-logo.svg"
                  alt="বাংলাদেশ জামায়াতে ইসলামী"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {candidate.name}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {candidate.designation} • {candidate.union}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              &ldquo;{candidate.mainPledge}&rdquo;
            </p>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl text-xs text-emerald-300">
              <strong className="block text-white mb-1">প্রচারণায়:</strong>
              {candidate.campaignCell}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              পাবলিক সেবা ও পেজ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#wards" className="text-emerald-400 font-semibold hover:text-emerald-300 transition flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>১২ নং যুগিখালীর ৯টি ওয়ার্ড ও গ্রাম</span>
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-emerald-400 transition">নির্বাচনী মূল ইশতেহার</a>
              </li>
              <li>
                <a href="#tracker" className="hover:text-emerald-400 transition">স্মার্ট প্রমিজ ট্র্যাকার</a>
              </li>
              <li>
                <a href="#grievance" className="hover:text-emerald-400 transition">নাগরিক অভিযোগ ও সমস্যা বক্স</a>
              </li>
              <li>
                <a href="#emergency" className="hover:text-emerald-400 transition">জরুরি অ্যাম্বুলেন্স ও পুলিশ</a>
              </li>
              <li>
                <a href="#emergency" className="hover:text-emerald-400 transition">যুগিখালী যুব ব্লাড ডোনার ব্যাংক</a>
              </li>
              <li>
                <a href="#budget" className="hover:text-emerald-400 transition">বাজেট ও খরচ স্বচ্ছতা</a>
              </li>
              <li>
                <a href="#agriculture" className="hover:text-emerald-400 transition">কৃষি ও কৃষক সহায়তা সেল</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Campaign Office */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              যোগাযোগ ও প্রচার সেল
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>প্রধান নির্বাচনী ক্যাম্প: ১২ নং যুগিখালী ইউনিয়ন পরিষদ এলাকা</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a 
                  href={`tel:${candidate.phone.replace(/[^0-9+]/g, '')}`} 
                  className="hover:text-emerald-400 transition font-medium"
                >
                  হটলাইন: {candidate.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a 
                  href={`mailto:${candidate.email}`} 
                  className="hover:text-emerald-400 transition font-medium"
                >
                  ইমেইল: {candidate.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* 9 Wards Quick Reference Strip in Footer */}
        <div className="py-6 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              ১২ নং যুগিখালী ইউনিয়নের আওতাধীন ৯টি ওয়ার্ড ও গ্রাম তালিকা:
            </span>
            <a href="#wards" className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4">
              বিস্তারিত ওয়ার্ড বিবরণী দেখুন →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
            {jugikhaliWards.map(w => (
              <div key={w.number} className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2.5 hover:border-emerald-500/50 transition">
                <div className="font-bold text-emerald-300 text-[11px] mb-1">
                  {w.name}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  {w.villages.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © ২০২৬ &ldquo;আমার যুগিখালী&rdquo; স্মার্ট ইউনিয়ন পোর্টাল। মাওলানা আব্দুল লতিফ নির্বাচনী প্রচার সেল কর্তৃক সংরক্ষিত।
          </p>

          {/* Developer Credit */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-2xl sm:rounded-full border border-slate-800 shadow-xs text-center">
            <span className="text-slate-400">Developed by <strong className="text-emerald-400 font-semibold">Imran</strong></span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a 
              href="mailto:engg.imran22@gmail.com" 
              className="text-slate-300 hover:text-emerald-300 underline underline-offset-2 transition flex items-center gap-1 font-mono text-[11px]"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              engg.imran22@gmail.com
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition group"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-4 h-4 text-emerald-500 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
