'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  HeartPulse, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const Manifesto: React.FC = () => {
  const { manifesto } = useData();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-emerald-600" />;
      case 'Users':
        return <Users className="w-8 h-8 text-blue-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-8 h-8 text-rose-600" />;
      default:
        return <Award className="w-8 h-8 text-amber-600" />;
    }
  };

  const getPillarColorBadge = (id: number) => {
    switch (id) {
      case 1:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 2:
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 3:
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <section id="manifesto" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>নির্বাচনী মূল অঙ্গীকারনামা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            যুগিখালী ইউনিয়নের ৪টি প্রধান রূপরেখা
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            একটি আধুনিক, দুর্নীতিমুক্ত ও স্বাবলম্বী মডেল ইউনিয়ন গড়ে তুলতে মাওলানা আব্দুল লতিফের সুনির্দিষ্ট কর্মপরিকল্পনা
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {manifesto.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getPillarColorBadge(pillar.id)}`}>
                    স্তম্ভ ০{pillar.id}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  {pillar.subtitle}
                </p>

                {/* Points List */}
                <div className="space-y-4">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-0.5">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {pt.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>বাস্তবায়নের সুনির্দিষ্ট ট্র্যাকিং থাকবে</span>
                <a href="#tracker" className="flex items-center gap-1 hover:text-emerald-900 transition">
                  <span>অগ্রগতি দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner Commitment Quote */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                &ldquo;জনগণের প্রতিটি টাকা ও অধিকার রক্ষায় আমরা বদ্ধপরিকর&rdquo;
              </h4>
              <p className="text-sm text-emerald-200">
                কাজ না করে বাজেট পাশ করার সুযোগ থাকবে না; প্রতিটি উন্নয়ন কাজের মূল্যায়ন করবেন ১২ নং যুগিখালী ইউনিয়নবাসী।
              </p>
            </div>
            <a
              href="#grievance"
              className="shrink-0 bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 py-3.5 rounded-xl shadow-md transition"
            >
              আপনার সমস্যা জানান
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
