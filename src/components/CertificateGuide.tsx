'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Users2, 
  HelpCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const CertificateGuide: React.FC = () => {
  const [activeService, setActiveService] = useState<'birth' | 'warishan' | 'allowance'>('birth');

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>দালালমুক্ত ডিজিটাল নাগরিক সেবা • Citizen Service Automation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ঘুষ ও হয়রানিমুক্ত জন্মনিবন্ধন ও নাগরিক সনদ প্রাপ্তি
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            ইউনিয়ন পরিষদের যেকোনো সেবা পেতে কোনো প্রকার বাড়তি ঘুষ বা মধ্যস্বত্বভোগী দালাল ধরতে হবে না। সম্পূর্ণ স্বচ্ছ প্রক্রিয়ায় নাগরিক সেবা পাবেন আপনার ঘরে বসেই।
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveService('birth')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeService === 'birth'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            জন্ম ও মৃত্যু নিবন্ধন গাইড
          </button>

          <button
            onClick={() => setActiveService('warishan')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeService === 'warishan'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Users2 className="w-4 h-4" />
            ওয়ারিশান ও চারিত্রিক সনদ
          </button>

          <button
            onClick={() => setActiveService('allowance')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeService === 'allowance'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            বয়স্ক, বিধবা ও প্রতিবন্ধী ভাতা
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          {activeService === 'birth' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    জন্ম ও মৃত্যু নিবন্ধন: কোনো ঘুষ বা অতিরিক্ত টাকা নেই
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    সরকারি নির্ধারিত ফি ছাড়া এক টাকাও বাড়তি নেওয়া হবে না
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  নির্ধারিত সরকারি ফি মাত্র
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    ১
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">অনলাইনে ফরম পূরণ</h4>
                  <p className="text-xs text-slate-600">
                    সরকারি bdris.gov.bd পোর্টাল বা আমাদের ইউপি ডিজিটাল সেন্টারে গিয়ে সরাসরি আবেদন করুন।
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    ২
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">কাগজপত্র যাচাই</h4>
                  <p className="text-xs text-slate-600">
                    টিকা কার্ড, পিতা-মাতার এনআইডি ও অন্যান্য নথি দাখিলের পর সাথে সাথে ভেরিফিকেশন হবে।
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                    ৩
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">সনদ ডেলিভারি</h4>
                  <p className="text-xs text-slate-600">
                    নির্দিষ্ট কার্যদিবসের মধ্যে মোবাইলে এসএমএস পাঠিয়ে সনদ হস্তান্তর নিশ্চিত করা হবে।
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 flex items-center justify-between text-xs text-blue-900">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>কোনো ধরনের অতিরিক্ত ফি চাইলে সরাসরি মাওলানা আব্দুল লতিফের ডিজিটাল সেলে জানান।</span>
                </span>
                <a
                  href="https://bdris.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline flex items-center gap-1 shrink-0"
                >
                  সরকারি পোর্টাল <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeService === 'warishan' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  উত্তরাধিকার ও চারিত্রিক সনদ ব্যবস্থাপনা
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  সম্পূর্ণ স্বচ্ছ যাচাইয়ের মাধ্যমে প্রকৃত ওয়ারিশদের অধিকার নিশ্চিতকরণ
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">নিরপেক্ষ ও দুর্নীতিমুক্ত ওয়ারিশান সার্টিফিকেট</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      কোনো ওয়ারিশকে বাদ দিয়ে ভুল সনদ জারি কঠোরভাবে বন্ধ থাকবে। স্থানীয় ওয়ার্ড মেম্বার ও গণ্যমান্য ব্যক্তিদের সমন্বয়ে প্রকাশ্য তদন্তের পর সনদ প্রদান করা হবে।
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">একদিনে চারিত্রিক ও নাগরিকত্ব সনদ প্রদান</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      চাকরিপ্রার্থী ও শিক্ষার্থীদের চারিত্রিক সনদ, ভূমিহীন প্রত্যয়ন ও অন্যান্য নাগরিক প্রত্যয়নপত্র বিনা হয়রানিতে একদিনেই হস্তান্তর করা হবে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === 'allowance' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  সামাজিক নিরাপত্তা ভাতা: স্বজনপ্রীতি ও দালালমুক্ত বণ্টন
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  বয়স্ক ভাতা, বিধবা ভাতা, প্রতিবন্ধী ভাতা ও ভিজিডি চাল বিতরণের উন্মুক্ত তালিকা
                </p>
              </div>

              <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>মাওলানা আব্দুল লতিফের ৪ দফা কঠোর নীতিমালা:</span>
                </div>
                <ul className="text-xs sm:text-sm text-emerald-950 space-y-2 list-disc list-inside">
                  <li>ভাতা কার্ড করে দেওয়ার নামে কোনো টাকা বা কমিশন নেওয়া যাবে না।</li>
                  <li>প্রতিটি ওয়ার্ডে উন্মুক্ত সভার মাধ্যমে প্রকৃত গরিব ও বয়োবৃদ্ধদের নাম তালিকাভুক্ত হবে।</li>
                  <li>সরকারি ভাতার তালিকা ইউনিয়নের নোটিশ বোর্ডে ও এই ওয়েবসাইটে উন্মুক্ত থাকবে।</li>
                  <li>ভাতার টাকা সরাসরি সুবিধাভোগীর মোবাইল ব্যাংকিং (বিকাশ/নগদ) অ্যাকাউন্টে নিশ্চিত করা হবে।</li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
